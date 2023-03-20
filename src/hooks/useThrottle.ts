import { useRef } from 'react';

/**
 * 쓰로틀 훅
 *
 * - 콜백함수를 일정 시간 간격을 두고 호출한다.
 *
 * @param callbackFunc 콜백함수
 * @param time 호출 간격
 * @returns 쓰로틀 함수
 */
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
