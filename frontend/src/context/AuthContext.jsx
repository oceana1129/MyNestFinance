import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Sync Firebase user with backend database.
   */
  const syncUser = async (firebaseUser) => {
    try {
      console.log("syncUser(): syncing a user");
      const token = await firebaseUser.getIdToken();

      const response = await fetch(`${API_URL}/auth/sync`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to sync user.");
      }

      return await response.json();
    } catch (error) {
      console.error("User sync failed:", error);
      throw error;
    }
  };

  /**
   * Register a new Firebase user.
   */
  const createUser = async (email, password) => {
    console.log("createUser(): creating a user");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  };

  /**
   * Sign in an existing Firebase user.
   */
  const signIn = async (email, password) => {
    console.log("signIn(): signing in user");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const token = await userCredential.user.getIdToken();

    await fetch(`${import.meta.env.VITE_API_URL}/auth/sync`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return userCredential;
  };

  /**
   * Sign out current user.
   */
  const logout = async () => {
    console.log("logout(): signing out user");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        console.log("onAuthStateChanged()");
        setUser(currentUser);

        if (currentUser) {
          await syncUser(currentUser);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      createUser,
      signIn,
      logout,
    }),
    [user, loading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
