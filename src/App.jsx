import { useState, useRef } from 'react';
import styled from 'styled-components';

import ThreadMessage from './components/ThreadMessage';
import Audio from './components/Audio';
import useFetchTranscript from './hooks/useFetchTranscript';

import { getPersistedTimestamp } from './utils';

const audioUrl =
    'https://riversidefm.s3.amazonaws.com/public/assignments/gadi/meeting-42-composer-2021-8-10__10-19-35.wav';

const Container = styled.div`
  background: rgb(27, 33, 39);
  padding: 50px 600px 200px 300px;
  min-width: 1400px;
  position: relative;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  padding: 20px 30px;
  background: rgb(43,48,52);
  border-radius: 5px;
`;

const AudioWrapper = styled.div`
  margin-left: 270px;
`

function App() {
  const [checked, setChecked] = useState([]);
  const audioRef = useRef();
  const [time, setTime] = useState(() => getPersistedTimestamp() || 0);
  const [status, setStatus] = useState('idle');
  const {transcript, error} = useFetchTranscript();

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
      <Footer>
        <AudioWrapper>
          <Audio ref={audioRef} setStatus={setStatus} setTime={setTime} src={audioUrl} />
        </AudioWrapper>
      </Footer>
    </Container>
  );
}

export default App;
