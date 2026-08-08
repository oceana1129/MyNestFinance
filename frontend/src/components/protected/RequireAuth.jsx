import React from "react";
import { Navigate } from "react-router";
import { UserAuth } from "../../context/AuthContext";

/**
 * Authorization for routes that only need a person
 * to be logged in
 * @param {*} param0
 * @returns
 */
const RequireAuth = ({ children }) => {
  const { user, profile, loading } = UserAuth();

  // TODO: create custom loader
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-purple-100 to-rose-100">
        Loading...
      </div>
    );
  }

  // if no auth user then go back to log in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if auth user and onboarding complete, go to dashboard
  if (user && profile?.onboarding?.onboardingComplete) {
    return <Navigate to="/plan" replace />;
  }

  return children;
};

export default RequireAuth;
