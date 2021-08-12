import styled from 'styled-components';
import { mmss } from '../utils';

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

export default Avatar;
