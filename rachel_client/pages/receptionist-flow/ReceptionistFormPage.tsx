import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Input, Button, Overlay} from 'react-native-elements';
import {ReceptionistQrReaderPageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';
import messaging from '@react-native-firebase/messaging';

const ReceptionistFormPage = ({
  route,
  navigation,
}: ReceptionistQrReaderPageProps) => {
  const workspaceName: string = route.params.workspaceName;
  const [content, setContent] = useState<string>('');
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [response, setResponse] = useState<Object>({
    received: false,
    response: null,
  });

  useEffect(() => {
    messaging()
      .subscribeToTopic(`${workspaceName}-receptionist`)
      .then(() => console.log('subscribed to receptionist topic'));

    messaging().onMessage((msg) => {
      console.log('response msg received', msg.data);
      setResponse({received: true, response: msg.data.content});
      setTimeout(() => {
        navigation.popToTop();
      }, 10000);
    });
  }, []);

  const [timer, setTimer] = useState<number>(30);

  const onSubmit = () => {
    customAxios
      .post(`workspaces/${workspaceName}/notifications`, {
        content,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setShowOverlay(true);
        }
      });
  };

  return (
    <View>
      <Overlay isVisible={showOverlay}>
        <View>
          {response.received ? (
            <>
              <Text>{response.response}</Text>
              <Text>Returning to home page in {timer}s..</Text>
            </>
          ) : (
            <Text>Waiting for response...</Text>
          )}
        </View>
      </Overlay>
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
