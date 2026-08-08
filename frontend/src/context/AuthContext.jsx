import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  updateSettings,
  updateOnboarding,
  updateDisplayName,
} from "../endpoint/UserApi";

const UserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Sync Firebase user with backend database.
   */
  const syncUser = async (firebaseUser) => {
    try {
      console.log("syncUser(): syncing a user");
      const token = await firebaseUser.getIdToken();

      // / console.log(token)

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
    // console.log("createUser(): creating a user");
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
    // console.log("signIn(): signing in user");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  };

  /**
   * Sign out current user.
   */
  const logout = async () => {
    // console.log("logout(): signing out user");
    return signOut(auth);
  };

  /**
   * Delete the current firebase user
   */
  const deleteAccount = async () => {
    // console.log("AuthContext.jsx: deleteAccount()");

    if (!auth.currentUser) {
      throw new Error("No user is currently signed in.");
    }

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`${API_URL}/auth/me`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete account.");
    }

    await signOut(auth);
  };
  //   console.log("AuthContext.jsx: updateOnboarding()", onboardingChanges);

  //   if (!auth.currentUser) {
  //     throw new Error("No user is currently signed in.");
  //   }

  //   const token = await auth.currentUser.getIdToken();

  //   const mergedOnboarding = { ...profile?.onboarding, ...onboardingChanges };

  //   const response = await fetch(`${API_URL}/user/me/onboarding`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(mergedOnboarding),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to update onboarding.");
  //   }

  //   const data = await response.json();
  //   setProfile(data.updatedUser);
  //   return data.updatedUser;
  // };

  const handleUpdateSettings = async (changes) => {
    const mergedSettings = {
      ...profile?.settings,
      ...changes,
    };

    const data = await updateSettings(mergedSettings);

    setProfile(data.updatedUser);

    return data.updatedUser;
  };

  const handleUpdateOnboarding = async (changes) => {
    const mergedOnboarding = {
      ...profile?.onboarding,
      ...changes,
    };

    const data = await updateOnboarding(mergedOnboarding);

    setProfile(data.updatedUser);

    return data.updatedUser;
  };

  const handleUpdateDisplayName = async (changes) => {
    const data = await updateDisplayName(changes);

    setProfile(data.updatedUser);

    return data.updatedUser;
  };
  //   console.log("AuthContext.jsx: updateDisplayName()", nameChange);

  //   if (!auth.currentUser) {
  //     throw new Error("No user is currently signed in.");
  //   }

  //   const token = await auth.currentUser.getIdToken();

  //   const response = await fetch(`${API_URL}/user/me/name`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(nameChange),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to update name.");
  //   }

  //   const data = await response.json();
  //   setProfile(data.updatedUser);
  //   return data.updatedUser;
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        console.log("onAuthStateChanged()");
        setUser(currentUser);

        if (currentUser) {
          const result = await syncUser(currentUser);

          setProfile(result.profile);
        } else {
          setProfile(null);
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
      profile,
      loading,
      createUser,
      signIn,
      logout,
      deleteAccount,
      updateSettings: handleUpdateSettings,
      updateOnboarding: handleUpdateOnboarding,
      updateDisplayName: handleUpdateDisplayName,
    }),
    [user, profile, loading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
