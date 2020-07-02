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
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [response, setResponse] = useState<Object>({
    received: false,
    response: null,
  });

  useEffect(() => {
    messaging()
      .subscribeToTopic(`${workspaceName}-receptionist`)
      .then(() => console.log('subscribed to receptionist topic'));

    messaging()
      .unsubscribeFromTopic(`${workspaceName}-fallback`)
      .then(() => console.log('unsubscribed from fallback topic!'));

    // msg.data = {
    //  response: string,
    //  status: string
    //}
    messaging().onMessage((msg) => {
      console.log('response msg received', msg.data);
      setResponse({received: true, response: msg.data.content});
      setTimeout(() => {
        navigation.navigate('ReceptionistWelcomePage');
      }, 10000);
    });

    return () => {
      messaging()
        .unsubscribeFromTopic(`${workspaceName}-receptionist`)
        .then(() => console.log('unsubscribed from receptionist topic!'));
    };
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
    <View style={styles.container}>
      <Overlay isVisible={showOverlay}>{renderOverlayContent()}</Overlay>
      <View>
        <Input
          label="Your Name"
          leftIcon={{name: 'face'}}
          placeholder="John Tan"
          onChangeText={(e) => setName(e)}
          value={name}
        />
        <Input
          label="Your E-Mail Address"
          leftIcon={{name: 'mail'}}
          placeholder="john.tan@gmail.com"
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
        <Input
          label="Your Contact Number (Optional)"
          leftIcon={{name: 'phone'}}
          placeholder="91234567"
          onChangeText={(e) => setPhoneNumber(e)}
          value={phoneNumber}
        />
        <Text style={styles.descriptionTitle}>
          Describe the purpose of your visit:
        </Text>
        <Textarea
          rowSpan={10}
          bordered
          underline
          placeholder="Urgent meeting regarding product A with Mr John Doe..."
          style={styles.textArea}
          onChangeText={(e) => setDescription(e)}
          value={description}
        />
      </View>
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
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  descriptionTitle: {
    fontSize: 20,
    padding: 10,
  },
  textArea: {
    margin: 10,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});
