import { useRef } from 'react';

const useThrottle = (callbackFunc: () => void, time: number) => {
  const lastRun = useRef(Date.now());

  return () => {
    if (Date.now() - lastRun.current >= time) {
      callbackFunc();
      lastRun.current = Date.now();
    }
  };
};

export default useThrottle;
