import React, {useState, useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {Text, Input, Button} from 'react-native-elements';
import customAxios from '../helpers/customAxios';
import ParticipantInput from '../components/ParticipantInput';

const AddMeetingsPage = () => {
  const auth: AuthContextType = useContext(AuthContext);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [numParticipants, setNumParticipants] = useState<number>(1);

  const testOnPress = () => {
    customAxios
      .post(
        `workspaces/${auth.userSettings.workspaceName}/users/${auth.user.uid}/meetings/`,
        {
          workspaceName: auth.userSettings.workspaceName,
          userid: auth.user.uid,
          meetingid: 'meetingid1',
          description: 'test description',
          participants: [],
          date: Date.now(),
        },
      )
      .then((res) => console.log(res));
  };

  const renderParticipantsInput = () => {
    let res = [];

    for (let i = 0; i < numParticipants; i++) {
      res.push(<ParticipantInput key={i} />);
    }

    return res;
  };

  return (
    <>
      <Input placeholder="title of meeting" />
      <Input placeholder="description of meeting" />
      {renderParticipantsInput()}
      <Button
        title="add 1 more participant"
        onPress={(e) => setNumParticipants(numParticipants + 1)}
      />
      <Button title="test" onPress={testOnPress} />
    </>
  );
};

export default AddMeetingsPage;
