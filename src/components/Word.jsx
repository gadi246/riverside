import { useCallback, useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeOut = keyframes`
  0% {
    color: rgba(142, 142, 241);
  }
  50%{
    color: rgba(142, 142, 241);
  }
  100% {
    color: rgb(246, 246, 246);
  }
`;

const Text = styled.span`
  ${({ animate }) =>
    animate &&
    css`
      animation: 1s ${fadeOut} ease-out forwards;
    `}
  color: ${({ highlight }) => highlight && css`rgba(142, 142, 241)`}
`;

const Word = ({
  children,
  isActive,
  start,
  end,
  isChecked,
  setChecked,
  status,
}) => {
  const [delay, setDelay] = useState(false);
  const timerRef = useRef();

  const onWordClick = useCallback(() => {
    setChecked([start, end]);
    window.localStorage.setItem('ts', JSON.stringify([start, end]));
  }, [setChecked, end, start]);

  useEffect(() => {
    if (isActive) {
      setDelay(prev => (prev ? prev : true));
      timerRef.current = setTimeout(() => {
        setDelay(() => false);
      }, 1000);
    }
  }, [isActive]);

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  return (
    <Text
      animate={delay && status === 'play'}
      highlight={isActive || isChecked}
      onDoubleClick={onWordClick}
    >
      {children}{' '}
    </Text>
  );
};

export default Word;
