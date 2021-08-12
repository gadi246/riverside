import { forwardRef, useEffect } from 'react';
import { getPersistedTimestamp } from '../utils';

const Audio = forwardRef(({ updateStatus, setTime, src }, ref) => {
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
      updateStatus.pause();
    });

    ref.current?.addEventListener?.('play', () => {
      initTiming();
      updateStatus.play();
    });

    const start = getPersistedTimestamp();
    if (start) {
      ref.current.currentTime = start;
    }

    return () => clearInterval(timerId);
  }, [updateStatus, setTime, ref]);

  return <audio src={src} controls ref={ref} />;
});

export default Audio;
