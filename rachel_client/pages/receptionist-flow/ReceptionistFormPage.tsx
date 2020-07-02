import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Overlay, Text} from 'react-native-elements';
import {Textarea} from 'native-base';
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
        navigation.navigate('ReceptionistWelcomePage');
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

  const renderOverlayContent = () => {
    return (
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
    );
  };

  return (
    <View>
      <Overlay isVisible={showOverlay}>{renderOverlayContent()}</Overlay>
      <Input label="Your Name" />
      <Input label="Your E-Mail Address" />
      <Input label="Your Contact Number (Optional)" />
      <Text style={styles.descriptionTitle}>
        Describe the purpose of your visit:
      </Text>
      <Textarea
        rowSpan={10}
        bordered
        underline
        placeholder="Urgent meeting regarding product A with Mr John Doe..."
        style={styles.textArea}
        onChangeText={(e) => setContent(e)}
        value={content}
      />
      <Button
        title="Submit"
        icon={{name: 'check-circle', color: 'white'}}
        onPress={onSubmit}
        style={styles.submitButton}
      />
    </View>
  );
};

export default ReceptionistFormPage;

const styles = StyleSheet.create({
  descriptionTitle: {
    fontSize: 20,
    padding: 10,
  },
  textArea: {
    margin: 10,
  },
  submitButton: {
    padding: 10,
  },
});
