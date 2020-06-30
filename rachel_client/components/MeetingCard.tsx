import React, {useState, useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {View, StyleSheet} from 'react-native';
import {Text, Divider} from 'react-native-elements';
import {Card, CardItem, Body, Right, Left} from 'native-base';
import {Icon} from 'react-native-elements';
import customAxios from '../helpers/customAxios';

const MeetingCard = ({navigation, data, onDelete}: any) => {
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
          <Text h4 numberOfLines={1}>
            {data.meetingTitle}
          </Text>
        </Left>
        <Right>
          <Text style={styles.date} numberOfLines={2}>
            {data.meetingDate}
          </Text>
        </Right>
      </CardItem>
      <CardItem>
        <Body>
          <Text numberOfLines={4}>{data.meetingDescription}</Text>
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
        <Left>
          <Text numberOfLines={1}>ID: {data.meetingId}</Text>
        </Left>
        <Right style={styles.footerRight}>
          <Icon
            name="delete"
            color="#d9534f"
            onPress={onPressDelete}
            style={styles.icon}
          />
          <Icon name="edit" color="green" onPress={onPressEdit} />
        </Right>
      </CardItem>
    </Card>
  );
};

export default MeetingCard;

const styles = StyleSheet.create({
  date: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginRight: 5,
  },
});
