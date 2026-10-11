import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type GeoContextType = {
  isMexico: boolean;
  isLoading: boolean;
  isVisitorNonMx: boolean; // explicitly non-mx
};

const GeoContext = createContext<GeoContextType>({
  isMexico: true, // Default to true so we don't break things initially
  isLoading: true,
  isVisitorNonMx: false,
});

export function GeoProvider({ children }: { children: ReactNode }) {
  const [isMexico, setIsMexico] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisitorNonMx, setIsVisitorNonMx] = useState(false);

  useEffect(() => {
    // Basic caching to avoid repeated API calls
    const cachedGeo = sessionStorage.getItem('geo_mx');
    if (cachedGeo) {
      const isMx = cachedGeo === 'true';
      setIsMexico(isMx);
      setIsVisitorNonMx(!isMx);
      setIsLoading(false);
      return;
    }

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const isMx = data.country_code === 'MX';
        setIsMexico(isMx);
        setIsVisitorNonMx(!isMx);
        sessionStorage.setItem('geo_mx', isMx ? 'true' : 'false');
      })
      .catch(() => {
        // Silenced error fetching geo. Usually blocked by AdBlockers or CORS.
        // Fallback to true if network fails, assuming they are MX to not block access.
        setIsMexico(true);
        setIsVisitorNonMx(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GeoContext.Provider value={{ isMexico, isLoading, isVisitorNonMx }}>
      {children}
    </GeoContext.Provider>
  );
}

export const useGeo = () => useContext(GeoContext);
