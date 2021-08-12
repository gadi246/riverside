import { forwardRef, useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Timestamp from './Timestamp';

const Container = styled.div`
  position: relative;
  width: 80%;
`;

const Track = styled.div`
  position: relative;
  height: 20px;
  background: rgba(61, 67, 73, 1);
  width: 100%;
  border-radius: 25px;
  overflow: auto;
  cursor: pointer;
`;
const Progress = styled.div`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  ${({ progress }) =>
    css`
      transform: translateX(${-100 + progress}%);
    `};
  background: rgb(71, 69, 206);
`;

const CurrentTime = styled(Timestamp)`
  position: absolute;
  bottom: -25px;
  margin: 0;
`;

const Duration = styled(CurrentTime)`
  right: 0;
`;

const ProgressBar = forwardRef((props, ref) => {
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const trackRef = useRef();

  useEffect(() => {
    const updateCb = () => {
      setTime(ref.current.currentTime);
    };
    const duraionCb = () => {
      setDuration(ref.current.duration);
    };

    ref.current?.addEventListener?.('timeupdate', updateCb);
    ref.current?.addEventListener?.('canplaythrough', duraionCb);

    return () => {
      ref.current?.removeEventListener?.('timeupdate', updateCb);
      ref.current?.removeEventListener?.('canplaythrough', duraionCb);
    };
  }, [ref]);

  const onTrackClick = e => {
    const clickPosition = e.clientX;
    const { left, width } = trackRef.current.getBoundingClientRect();
    const ratio = (clickPosition - left) / width;
    ref.current.currentTime = ratio * duration;
  };

  const progress = 100 * (time / duration);

  return (
    <Container>
      <Track onClick={onTrackClick} ref={trackRef}>
        <Progress progress={progress} />
      </Track>
      <CurrentTime seconds={time} />
      <Duration seconds={duration} />
    </Container>
  );
});
export default ProgressBar;
