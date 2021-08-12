import styled from 'styled-components';
import { mmss } from '../utils';

const Text = styled.p`
  font-size: 14px;
  color: #bababa;
  margin-right: 20px;
`;

const Timestamp = ({ seconds, ...props }) => {
  return <Text {...props}>{mmss(seconds)}</Text>;
};

export default Timestamp;
