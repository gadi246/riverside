import { memo } from 'react';
import styled, { css } from 'styled-components';
import Word from './Word';
import Avatar from './Avatar';

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
  background: ${({ highlight }) => highlight && css`rgba(55,61,66,1)`};
`;

const ThreadMessage = memo(
  ({ speaker, data, time, start, checked, setChecked, status }) => {
    const [checkedStart, checkedEnd] = checked;
    return (
      <Container>
        <Avatar speaker={speaker} start={start} />
        <Transcript highlight={time}>
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
