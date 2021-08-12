import { useState, forwardRef } from 'react';
import styled, { css } from 'styled-components';

import ProgressBar from './ProgressBar';
import { ReactComponent as PlayIcon } from '../assets/play_icon.svg';
import { ReactComponent as PauseIcon } from '../assets/pause_icon.svg';
import { ReactComponent as BackwardIcon } from '../assets/backward.svg';
import { ReactComponent as ForwardIcon } from '../assets/forward.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  background: none;
  svg {
    fill: rgb(246, 246, 246);
  }
  color: rgb(246, 246, 246);
  cursor: pointer;
  padding: 0;
`;

const RoundButton = styled(Button)`
  background: rgb(71, 69, 206);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  svg {
    width: 20px;
    height: 20px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SkipButton = styled(Button)`
  position: relative;
  svg {
    width: 33px;
    height: 33px;
    transform: ${({ back }) =>
      back ? css`rotate(45deg)` : css`rotate(-45deg)`};
  }
`;

const SkipText = styled.span`
  position: absolute;
  top: 30%;
  right: 30%;
  font-size: 10px;
`;

const Controls = forwardRef(({ play, pause, stepSkip }, ref) => {
  const [isPlay, setIsPlay] = useState(true);

  const togglePlay = () => {
    if (isPlay) {
      play();
      setIsPlay(false);
    } else {
      pause();
      setIsPlay(true);
    }
  };

  return (
    <Container>
      <SkipButton back onClick={() => stepSkip(-30)}>
        <BackwardIcon />
        <SkipText>30</SkipText>
      </SkipButton>
      {isPlay ? (
        <RoundButton onClick={togglePlay}>
          <PlayIcon />
        </RoundButton>
      ) : (
        <RoundButton onClick={togglePlay}>
          <PauseIcon />
        </RoundButton>
      )}
      <SkipButton onClick={() => stepSkip(30)}>
        <ForwardIcon />
        <SkipText>30</SkipText>
      </SkipButton>
      <ProgressBar ref={ref} />
    </Container>
  );
});

export default Controls;
