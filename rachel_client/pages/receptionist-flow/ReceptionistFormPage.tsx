import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Overlay, Text} from 'react-native-elements';
import {Textarea} from 'native-base';
import {ReceptionistQrReaderPageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';
import messaging from '@react-native-firebase/messaging';
import {ScrollView} from 'react-native-gesture-handler';

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
    status: null,
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
      setResponse({
        received: true,
        status: msg.data.status,
        response: msg.data.response,
      });
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

  const onSubmit = () => {
    customAxios
      .post(`workspaces/${workspaceName}/notifications`, {
        name,
        email,
        phoneNumber,
        description,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setShowOverlay(true);
        }
      });
  };

  const getStatusColor = () => {
    switch (response.status) {
      case 'ACCEPT':
        return '#3d9970';
      case 'REJECT':
        return '#ff4136';
    }
  };

  const renderOverlayContent = () => {
    return (
      <View>
        {response.received ? (
          <>
            <Text
              style={{
                ...styles.overlayStatusText,
                backgroundColor: getStatusColor(),
              }}>
              {response.status}
            </Text>
            <Text>Response: {response.response}</Text>
            <Text>Returning to Welcome Page in 10s...</Text>
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
      <ScrollView>
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
      </ScrollView>
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
  overlayStatusText: {
    color: 'white',
    padding: 5,
  },
});
