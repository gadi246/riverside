import { forwardRef, useEffect } from 'react';
import { getPersistedTimestamp } from '../utils';

const Audio = forwardRef(({ setStatus, setTime, src }, ref) => {
  useEffect(() => {
    let timerId;
    const initTiming = () => {
      timerId = setInterval(() => {
        const currTime = ref.current?.currentTime ?? 0;
        setTime(currTime);
      }, 50);
    };

    ref.current?.addEventListener?.('pause', () => {
      clearInterval(timerId);
      setStatus('pause');
    });

    ref.current?.addEventListener?.('play', () => {
      initTiming();
      setStatus('play');
    });

    const start = getPersistedTimestamp();
    if (start) {
      ref.current.currentTime = start;
    }

    return () => clearInterval(timerId);
  }, [setStatus, setTime, ref]);

  return <audio src={src} controls ref={ref} />;
});

export default Audio;
