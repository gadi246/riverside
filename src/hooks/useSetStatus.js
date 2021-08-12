import { useState, useMemo } from 'react';

const useSetStatus = () => {
  const [status, setStatus] = useState('idle');
  const updateStatus = useMemo(() => {
    return {
      idle() {
        setStatus('idle');
      },
      pause() {
        setStatus('pause');
      },
      play() {
        setStatus('play');
      },
    };
  }, [setStatus]);
  return [status, updateStatus];
};

export default useSetStatus;
