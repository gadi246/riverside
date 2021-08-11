import { memo } from 'react';
import styled from 'styled-components';
import Word from './Word';
import { mmss } from './utils';

const Speaker = styled.p`
  font-weight: 500;
  font-size: 18px;
  text-transform: capitalize;
`;

const Timestamp = styled.p`
  font-size: 14px;
  color: #bababa;
`;

const AvatarContainer = styled.div`
  width: 200px;
  flex-shrink: 0;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 85%;
`;

const Avatar = ({ speaker, start }) => {
  return (
    <AvatarContainer>
      <Text>
        <Speaker>{speaker}</Speaker> <Timestamp>{mmss(start)}</Timestamp>
      </Text>
    </AvatarContainer>
  );
};

const Container = styled.div`
  display: flex;
  align-items: baseline;
`;

const Transcript = styled.div`
  transition: background-color 100ms linear;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  line-height: 27px;
  letter-spacing: 0.2px;
`;

const ThreadMessage = memo(
  ({ speaker, data, time, start, checked, setChecked, status }) => {
    const [checkedStart, checkedEnd] = checked;
    return (
      <Container>
        <Avatar speaker={speaker} start={start} />
        <Transcript style={time ? { background: 'rgba(55,61,66,1)' } : {}}>
          {data.map(([word, start, end]) => {
            const isActive =
              status === 'idle' || status === 'play'
                ? time >= start && time <= end
                : time >= start - 0.3 && time <= end + 0.3;
            const isChecked =
              checkedStart && checkedStart === start && checkedEnd === end;
            return (
              <Word
                key={`${start}${end}`}
                isActive={isActive}
                start={start}
                end={end}
                isChecked={isChecked}
                setChecked={setChecked}
                status={status}
              >
                {word}
              </Word>
            );
          })}
        </Transcript>
      </Container>
    );
  }
);

export default ThreadMessage;
