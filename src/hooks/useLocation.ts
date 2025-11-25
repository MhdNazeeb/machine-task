import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { LOCATION_ERRORS, LOG_MESSAGES } from "../constants/strings";

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

        if (status !== "granted") {
          if (isMounted) {
            setError(LOCATION_ERRORS.PERMISSION_NOT_GRANTED);
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
              .join(", ");
          }
        } catch (geocodeError) {
          console.log(LOG_MESSAGES.COULD_NOT_GET_ADDRESS, geocodeError);
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
        console.error(LOG_MESSAGES.ERROR_GETTING_LOCATION, err);
        if (isMounted) {
          setError(LOCATION_ERRORS.FAILED_TO_GET_LOCATION);
          setLoading(false);
        }
      }
    };

    getLocation();

    return () => {
      isMounted = false;
    };
  }, [refetchIndex]);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  return { location, loading, error, refetch };
};
