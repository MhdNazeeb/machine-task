import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";

export default function IndexScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // User is logged in, go to home
        router.replace("/home");
      } else {
        // User is not logged in, go to login
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  return <LoadingSpinner />;
}
