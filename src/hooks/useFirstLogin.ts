import { useEffect, useState, useCallback } from 'react';
import { isFirstLogin, setFirstLoginComplete } from '../utils/storage';
import { requestFirstLoginPermissions } from '../utils/permissions';

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
        
        // Mark first login as complete
        await setFirstLoginComplete(userEmail);
        setHasRequestedPermissions(true);
      }
    } catch (error) {
      console.error('Error checking first login:', error);
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
