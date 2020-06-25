import React, {useState, useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {View} from 'react-native';
import {Card, CardItem, Body, Text, Right, Left} from 'native-base';
import {Icon} from 'react-native-elements';
import customAxios from '../helpers/customAxios';

const MeetingCard = ({navigation, data, onDelete}) => {
  const [viewParticipants, setViewParticipants] = useState<boolean>(false);
  const auth: AuthContextType = useContext(AuthContext);

  const onPressDelete = () => {
    customAxios
      .delete(
        `workspaces/${auth.userSettings.workspaceName}/users/${auth.user.uid}/meetings/${data.meetingId}`,
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          onDelete();
        }
      });
  };

  const onPressEdit = () => {
    navigation.navigate('AddOrEditMeetingPage', {
      meetingData: {
        title: data.meetingTitle,
        description: data.meetingDescription,
        meetingid: data.meetingId,
        participants: data.participants,
      },
    });
  };

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
                    <Text>Phone Number: {participant.phoneNumber}</Text>
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
        <Icon name="delete" onPress={onPressDelete} />
        <Icon name="edit" onPress={onPressEdit} />
      </CardItem>
    </Card>
  );
};

export default MeetingCard;
