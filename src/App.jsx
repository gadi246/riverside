import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import ThreadMessage from './components/ThreadMessage';
import useFetchTranscript from './hooks/useFetchTranscript';

import { getPersistedTimestamp } from './utils';

const audioUrl =
  'https://riversidefm.s3.amazonaws.com/public/assignments/gadi/meeting-42-composer-2021-8-10__10-19-35.wav';

const Container = styled.div`
  background: rgb(27, 33, 39);
  padding: 50px 600px 100px 300px;
  min-width: 1400px;
`;

function App() {
  const [checked, setChecked] = useState([]);
  const audioRef = useRef();
  const [time, setTime] = useState(() => getPersistedTimestamp() || 0);
  const [status, setStatus] = useState('idle');
  const {transcript, error} = useFetchTranscript();

  useEffect(() => {
    let timerId;
    const initTiming = () => {
      timerId = setInterval(() => {
        const currTime = audioRef.current?.currentTime ?? 0;
        setTime(currTime);
      }, 50);
    };

    audioRef.current?.addEventListener?.('pause', () => {
      clearInterval(timerId);
      setStatus('pause');
    });

    audioRef.current?.addEventListener?.('play', () => {
      initTiming();
      setStatus('play');
    });

    const start = getPersistedTimestamp();
    if (start) {
      audioRef.current.currentTime = start;
    }

    return () => clearInterval(timerId);
  }, [setStatus]);

  return error ? (
      <h4>Oops something went wrong...</h4>
  ) : (
    <Container>
      {transcript.map(({ speaker, data, start, end }) => {
        const timeRange = time < start || time > end;
        return (
          <ThreadMessage
            key={`${start}${end}`}
            data={data}
            speaker={speaker}
            time={timeRange ? 0 : time}
            start={start}
            checked={checked}
            setChecked={setChecked}
            status={status}
          />
        );
      })}
      <div style={{ position: 'fixed', bottom: 0, left: 100 }}>
        <audio src={audioUrl} controls ref={audioRef} />
      </div>
    </Container>
  );
}

export default App;
