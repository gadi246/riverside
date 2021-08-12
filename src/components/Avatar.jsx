import styled from 'styled-components';
import Timestamp from './Timestamp';

const mockImages = {
  gadi_tzkhori:
    'https://media-exp1.licdn.com/dms/image/C4E03AQE33qRsu9P05w/profile-displayphoto-shrink_200_200/0/1517247558594?e=1634169600&v=beta&t=NPcGJv3yJdIQtCfY49c1Epjgeaxb6vZAROF_kuHcxog',
  gideon:
    'https://media-exp1.licdn.com/dms/image/C4D03AQHzf62MkuXPOQ/profile-displayphoto-shrink_200_200/0/1602511430133?e=1634169600&v=beta&t=GA7ajyyBWgAzsPtHkNbcU_fzoG1bkJzZT9tHV3EUXBQ',
};

const Speaker = styled.p`
  font-weight: 500;
  font-size: 18px;
  text-transform: capitalize;
  max-width: 120px;
`;

const AvatarContainer = styled.div`
  width: 250px;
  flex-shrink: 0;
  display: flex;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 85%;
  align-self: baseline;
`;

const Photo = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  border: 2px solid rgba(55, 61, 66, 1);
`;

const Avatar = ({ speaker, start }) => {
  return (
    <AvatarContainer>
      <Photo src={mockImages[speaker]} alt={speaker} />
      <Text>
        <Speaker>{speaker}</Speaker> <Timestamp seconds={start} />
      </Text>
    </AvatarContainer>
  );
};

export default Avatar;
