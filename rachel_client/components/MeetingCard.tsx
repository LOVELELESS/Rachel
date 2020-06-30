import React, {useState, useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {View, StyleSheet} from 'react-native';
import {Text, Overlay, ListItem, Icon, Button} from 'react-native-elements';
import {Card, CardItem, Body, Right, Left} from 'native-base';
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

  const renderParticipantsList = () => {
    return data.participants.map((participant, i) => (
      <ListItem
        key={i}
        title={participant.name}
        subtitle={
          participant.phoneNumber
            ? `${participant.email}, ${participant.phoneNumber}`
            : participant.email
        }
        leftIcon={{name: 'user', type: 'font-awesome'}}
      />
    ));
  };

  return (
    <View>
      <Overlay
        isVisible={viewParticipants}
        onBackdropPress={() => setViewParticipants(false)}
        overlayStyle={styles.overlay}>
        <View>
          {renderParticipantsList()}
          <Button
            title="cancel"
            type="outline"
            buttonStyle={styles.cancelButton}
            titleStyle={styles.cancelTitle}
            icon={{name: 'close', color: 'red'}}
            onPress={() => setViewParticipants(false)}
          />
        </View>
      </Overlay>
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
        <CardItem>
          <Left>
            <CardItem
              button
              style={styles.viewParticipantsContainer}
              onPress={() => setViewParticipants(true)}>
              <Text style={styles.viewParticipantsText}>View participants</Text>
            </CardItem>
          </Left>
        </CardItem>
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
    </View>
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
  overlay: {
    width: '80%',
  },
  viewParticipantsContainer: {
    backgroundColor: '#0074d9',
  },
  viewParticipantsText: {
    color: 'white',
  },
  cancelTitle: {
    color: 'red',
  },
  cancelButton: {
    borderColor: 'red',
  },
});
