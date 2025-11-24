import { useState, useEffect, useMemo, useCallback } from 'react';
import * as Location from 'expo-location';

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  
  useEffect(() => {
    let isMounted = true;
    
    const getLocation = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { status } = await Location.getForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          if (isMounted) {
            setError('Location permission not granted');
            setLoading(false);
          }
          return;
        }
        
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        // Try to get address
        let address: string | undefined;
        try {
          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
          
          if (reverseGeocode.length > 0) {
            const place = reverseGeocode[0];
            address = [place.city, place.region, place.country]
              .filter(Boolean)
              .join(', ');
          }
        } catch (geocodeError) {
          console.log('Could not get address:', geocodeError);
        }
        
        if (isMounted) {
          setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            address,
          });
          setLoading(false);
        }
      } catch (err) {
        console.error('Error getting location:', err);
        if (isMounted) {
          setError('Failed to get location');
          setLoading(false);
        }
      }
    };
    
    getLocation();
    
    return () => {
      isMounted = false;
    };
  }, [refetchIndex]);
  
  const refresh = useCallback(() => {
    setRefetchIndex(prev => prev + 1);
  }, []);
  
  // Memoize the return value to avoid unnecessary re-renders
  return useMemo(
    () => ({ location, loading, error, refetch: refresh }),
    [location, loading, error, refresh]
  );
};
