import { useEffect, useRef } from 'react';
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
    const audioEl = ref.current;
    let timerId;
    const initTiming = () => {
      timerId = setInterval(() => {
        const currTime = audioEl?.currentTime ?? 0;
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

    audioEl?.addEventListener?.('pause', pauseCb);
    audioEl?.addEventListener?.('play', playCb);

    const start = getPersistedTimestamp();
    if (start) {
      audioEl.currentTime = start;
    }

    return () => {
      timerId && clearInterval(timerId);
      audioEl?.removeEventListener?.('pause', pauseCb);
      audioEl?.removeEventListener?.('play', playCb);
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
