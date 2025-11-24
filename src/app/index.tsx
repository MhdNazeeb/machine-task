import { Redirect } from "expo-router";
import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";

export default function IndexScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const href = isAuthenticated ? "/(protected)/home" : "/onBoarding/login";

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <Redirect href={href} />;
}
