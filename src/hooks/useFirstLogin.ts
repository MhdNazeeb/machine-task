import { useCallback, useEffect, useState } from "react";
import { requestFirstLoginPermissions } from "../utils/permissions";
import { isFirstLogin, setFirstLoginComplete } from "../utils/storage";

export const useFirstLogin = (userEmail: string | null) => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasRequestedPermissions, setHasRequestedPermissions] = useState(false);

  const checkAndRequestPermissions = useCallback(async () => {
    if (!userEmail || hasRequestedPermissions) {
      setIsChecking(false);
      return;
    }

    try {
      const isFirst = await isFirstLogin(userEmail);

      if (isFirst) {
        // Request permissions
        await requestFirstLoginPermissions();
        await setFirstLoginComplete(userEmail);
        setHasRequestedPermissions(true);
      }
    } catch (error) {
      console.error("Error checking first login:", error);
    } finally {
      setIsChecking(false);
    }
  }, [userEmail, hasRequestedPermissions]);

  useEffect(() => {
    checkAndRequestPermissions();
  }, [checkAndRequestPermissions]);

  return {
    isChecking,
    hasRequestedPermissions,
  };
};
