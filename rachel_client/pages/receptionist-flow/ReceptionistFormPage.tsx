import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ReceptionistQrReaderPageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';

const ReceptionistFormPage = ({
  route,
  navigation,
}: ReceptionistQrReaderPageProps) => {
  const workspaceName: string = route.params.workspaceName;
  const [content, setContent] = useState<string>('');

  const onSubmit = () => {
    customAxios
      .post(`workspaces/${workspaceName}/notifications`, {
        content,
      })
      .then((res) => console.log(res));
  };

  return (
    <View>
      <Text>This is receptionist form page</Text>
      <Input
        placeholder="content"
        onChangeText={(e) => setContent(e)}
        value={content}
      />
      <Button title="submit" onPress={onSubmit} />
    </View>
  );
};

export default ReceptionistFormPage;
