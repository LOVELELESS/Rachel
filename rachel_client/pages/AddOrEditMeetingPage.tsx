import React, {useState, useContext} from 'react';
import {ScrollView, View, Platform, StyleSheet} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {Text, Input, Button, Divider} from 'react-native-elements';
import customAxios from '../helpers/customAxios';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {deepCopy} from '../helpers/arrayUtils';
import {AddOrEditMeetingPageProps} from '../types/screenTypes';

const AddOrEditMeetingPage = ({
  route,
  navigation,
}: AddOrEditMeetingPageProps) => {
  const auth: AuthContextType = useContext(AuthContext);

  let initalTitle = '';
  let initialDescription = '';
  let initialParticipants = [{}];
  if (route.params) {
    initalTitle = route.params.meetingData.title;
    initialDescription = route.params.meetingData.description;
    initialParticipants = route.params.meetingData.participants;
  }

  const [title, setTitle] = useState<string>(initalTitle);
  const [description, setDescription] = useState<string>(initialDescription);
  const [participants, setParticipants] = useState<Array<Object>>(
    initialParticipants,
  );

  const onPressSubmit = () => {
    let meetingid;
    if (route.params) {
      // editing existing meeting
      meetingid = route.params.meetingData.meetingid;
      customAxios
        .put(
          `workspaces/${auth.userSettings.workspaceName}/users/${auth.user.uid}/meetings/${meetingid}`,
          {
            workspaceName: auth.userSettings.workspaceName,
            userid: auth.user.uid,
            meetingid,
            title,
            description,
            participants,
            date: Date.now(),
          },
        )
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            navigation.goBack();
          }
        });
    } else {
      // creating new meeting
      meetingid = uuidv4();
      customAxios
        .post(
          `workspaces/${auth.userSettings.workspaceName}/users/${auth.user.uid}/meetings/`,
          {
            workspaceName: auth.userSettings.workspaceName,
            userid: auth.user.uid,
            meetingid,
            title,
            description,
            participants,
            date: Date.now(),
          },
        )
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            customAxios
              .post(
                `workspaces/${auth.userSettings.workspaceName}/users/${auth.user.uid}/meetings/${meetingid}/send_email`,
              )
              .then((res) => {
                console.log(res);
                if (res.data.success) {
                  navigation.goBack();
                }
              });
          }
        });
    }
  };

  const renderParticipantsInput = () => {
    return participants.map((participant, i) => {
      return (
        <View key={i}>
          <Divider />
          <Input
            label={`Participant ${i + 1} Name`}
            placeholder="John Doe"
            leftIcon={{name: 'user', type: 'font-awesome'}}
            value={participant.name ? participant.name : ''}
            onChangeText={(e) => {
              let newParticipants = deepCopy(participants);
              newParticipants[i].name = e;
              setParticipants(newParticipants);
            }}
          />
          <Input
            label={`Participant ${i + 1} Email`}
            placeholder="john.doe@abc.com"
            leftIcon={{name: 'mail'}}
            value={participant.email ? participant.email : ''}
            onChangeText={(e) => {
              let newParticipants = deepCopy(participants);
              newParticipants[i].email = e;
              setParticipants(newParticipants);
            }}
          />
          <Input
            label={`Participant ${i + 1} Phone Numer (Optional)`}
            placeholder="912345678"
            leftIcon={{name: 'phone'}}
            value={participant.phoneNumber ? participant.phoneNumber : ''}
            onChangeText={(e) => {
              let newParticipants = deepCopy(participants);
              newParticipants[i].phoneNumber = e;
              setParticipants(newParticipants);
            }}
          />
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        label="The Meeting subject / title"
        placeholder="Client meeting with ABC company"
        leftIcon={{name: 'title'}}
        onChangeText={(e) => setTitle(e)}
        value={title}
      />
      <Input
        label="Brief description of the meeting"
        placeholder="Go over 4th quarter financial report"
        leftIcon={{name: 'description'}}
        onChangeText={(e) => setDescription(e)}
        value={description}
      />
      {renderParticipantsInput()}
      <Button
        title="add 1 more participant"
        onPress={(e) => {
          let newParticipants = deepCopy(participants);
          newParticipants.push({});
          setParticipants(newParticipants);
        }}
      />
      <Button title="submit" onPress={onPressSubmit} />
    </ScrollView>
  );
};

export default AddOrEditMeetingPage;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
