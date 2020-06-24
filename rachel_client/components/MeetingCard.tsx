import React, {useState} from 'react';
import {
  Card,
  CardItem,
  Body,
  Text,
  Right,
  Left,
  Icon,
  Button,
} from 'native-base';

const MeetingCard = () => {
  const data = [{title: '24 Jun 2020', content: 'meetingdescription'}];
  const [viewParticipants, setViewParticipants] = useState<boolean>(false);
  return (
    <Card>
      <CardItem>
        <Left>
          <CardItem header>
            <Text>meeting title</Text>
          </CardItem>
        </Left>
        <Right>
          <CardItem header>
            <Text>meeting date</Text>
          </CardItem>
        </Right>
      </CardItem>
      <CardItem>
        <Body>
          <Text>meeting description</Text>
        </Body>
      </CardItem>
      <CardItem button onPress={() => setViewParticipants(!viewParticipants)}>
        <Text>{'>>View participants<<<'}</Text>
      </CardItem>
      {viewParticipants && (
        <CardItem>
          <Body>
            <Text>participant name, email, phone</Text>
          </Body>
        </CardItem>
      )}
      <CardItem footer>
        <Body>
          <Text>meetingid</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </CardItem>
    </Card>
  );
};

export default MeetingCard;
