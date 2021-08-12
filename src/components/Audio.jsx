import { useEffect, useRef } from 'react';
import { getPersistedTimestamp } from '../utils';

const Audio = ({
  onPause,
  onPlay,
  onTimeUpdate,
  src,
  updateFrequency = 50,
}) => {
  const ref = useRef();
  useEffect(() => {
    let timerId;
    const initTiming = () => {
      timerId = setInterval(() => {
        const currTime = ref.current?.currentTime ?? 0;
        onTimeUpdate(currTime);
      }, updateFrequency);
    };

    ref.current?.addEventListener?.('pause', e => {
      clearInterval(timerId);
      onPause(e);
    });

    ref.current?.addEventListener?.('play', e => {
      initTiming();
      onPlay(e);
    });

    const start = getPersistedTimestamp();
    if (start) {
      ref.current.currentTime = start;
    }

    return () => clearInterval(timerId);
  }, [onPlay, onPause, onTimeUpdate, updateFrequency]);

  return <audio src={src} controls ref={ref} />;
};

export default Audio;
