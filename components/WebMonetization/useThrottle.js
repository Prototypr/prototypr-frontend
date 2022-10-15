// https://hooks-guide.netlify.app/community/useThrottle
import { useEffect, useState, useRef } from 'react'

const useThrottle = (value, limit) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());
  
    useEffect(() => {
      const handler = setTimeout(function() {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      }, limit - (Date.now() - lastRan.current));
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, limit]);
  
    return throttledValue;
  };

  export default useThrottle
  