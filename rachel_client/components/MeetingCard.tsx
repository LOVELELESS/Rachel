import React, {useState} from 'react';
import {View} from 'react-native';
import {Card, CardItem, Body, Text, Right, Left} from 'native-base';
import {Icon} from 'react-native-elements';

const MeetingCard = ({data}) => {
  const [viewParticipants, setViewParticipants] = useState<boolean>(false);
  console.log(data.participants);

  return (
    <Card>
      <CardItem>
        <Left>
          <CardItem header>
            <Text>{data.meetingTitle}</Text>
          </CardItem>
        </Left>
        <Right>
          <CardItem header>
            <Text>{data.meetingDate}</Text>
          </CardItem>
        </Right>
      </CardItem>
      <CardItem>
        <Body>
          <Text>{data.meetingDescription}</Text>
        </Body>
      </CardItem>
      <CardItem button onPress={() => setViewParticipants(!viewParticipants)}>
        <Text>{'>>View participants<<<'}</Text>
      </CardItem>
      {viewParticipants && (
        <CardItem>
          <Body>
            {data.participants.map((participant, i) => {
              if (participant.phoneNumber) {
                return (
                  <View key={i}>
                    <Text>Name: {participant.name}</Text>
                    <Text>Email: {participant.email}</Text>
                    <Text>Phone Num: {participant.phoneNumber}</Text>
                  </View>
                );
              } else {
                return (
                  <View key={i}>
                    <Text>Name: {participant.name}</Text>
                    <Text>Email: {participant.email}</Text>
                  </View>
                );
              }
            })}
          </Body>
        </CardItem>
      )}
      <CardItem footer>
        <Body>
          <Text>{data.meetingId}</Text>
        </Body>
        <Icon name="delete" />
        <Icon name="edit" />
      </CardItem>
    </Card>
  );
};

export default MeetingCard;
