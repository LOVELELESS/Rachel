import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {Text, Input, Button, Divider} from 'react-native-elements';
import customAxios from '../helpers/customAxios';
import {v4 as uuidv4} from 'uuid';
import {deepCopy} from '../helpers/arrayUtils';

const AddMeetingsPage = () => {
  const auth: AuthContextType = useContext(AuthContext);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [participants, setParticipants] = useState<Array<Object>>([{}]);

  const onPressSubmit = () => {
    const meetingid = uuidv4();
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
      .then((res) => console.log(res));
  };

  const renderParticipantsInput = () => {
    return participants.map((participant, i) => {
      return (
        <View key={i}>
          <Divider />
          <Input
            placeholder="participant name"
            value={participant.name ? participant.name : ''}
            onChangeText={(e) => {
              let newParticipants = deepCopy(participants);
              newParticipants[i].name = e;
              setParticipants(newParticipants);
            }}
          />
          <Input
            placeholder="email"
            value={participant.email ? participant.email : ''}
            onChangeText={(e) => {
              let newParticipants = deepCopy(participants);
              newParticipants[i].email = e;
              setParticipants(newParticipants);
            }}
          />
          <Input
            placeholder="phone number (optional)"
            value={participant.phoneNum ? participant.phoneNum : ''}
            onChangeText={(e) => {
              let newParticipants = deepCopy(participants);
              newParticipants[i].phoneNum = e;
              setParticipants(newParticipants);
            }}
          />
        </View>
      );
    });
  };

  return (
    <>
      <Input
        placeholder="title of meeting"
        onChangeText={(e) => setTitle(e)}
        value={title}
      />
      <Input
        placeholder="description of meeting"
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
    </>
  );
};

export default AddMeetingsPage;
