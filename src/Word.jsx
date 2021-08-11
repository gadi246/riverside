import { useCallback, useEffect, useState } from 'react';
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

  const onWordClick = useCallback(() => {
    window.localStorage.setItem('ts', JSON.stringify([start, end]));
    setChecked([start, end]);
  }, [setChecked, end, start]);

  useEffect(() => {
    if (isActive) {
      setDelay((prev) => (prev ? prev : true));
      setTimeout(() => {
        setDelay(() => false);
      }, 1000);
    }
  }, [isActive]);

  return (
    <Text
      animate={delay && status === 'play'}
      style={isActive || isChecked ? { color: 'rgba(142, 142, 241)' } : {}}
      onDoubleClick={onWordClick}
    >
      {children}{' '}
    </Text>
  );
};

export default Word;
