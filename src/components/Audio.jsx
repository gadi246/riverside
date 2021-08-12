import { useEffect, useRef, useState } from 'react';
import { getPersistedTimestamp } from '../utils';
import Controls from './Controls';

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

    const pauseCb = e => {
      clearInterval(timerId);
      onPause(e);
    };

    const playCb = e => {
      initTiming();
      onPlay(e);
    };

    ref.current?.addEventListener?.('pause', pauseCb);
    ref.current?.addEventListener?.('play', playCb);

    const start = getPersistedTimestamp();
    if (start) {
      ref.current.currentTime = start;
    }

    return () => {
      timerId && clearInterval(timerId);
      ref.current?.removeEventListener?.('pause', pauseCb);
      ref.current?.removeEventListener?.('play', playCb);
    };
  }, [onPlay, onPause, onTimeUpdate, updateFrequency]);

  const stepSkip = step => {
    const currTime = ref.current?.currentTime ?? 0;
      ref.current.currentTime =
        step > 0
          ? Math.min(currTime + step, ref.current.duration)
          : Math.max(currTime + step, 0);
  };

  return (
    <>
      <audio src={src} ref={ref} />
      <Controls
        pause={() => ref.current?.pause()}
        play={() => ref.current?.play()}
        stepSkip={stepSkip}
        ref={ref}
      />
    </>
  );
};

export default Audio;
