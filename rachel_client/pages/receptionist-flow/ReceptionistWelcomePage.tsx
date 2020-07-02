import React, {useState} from 'react';
import {ReceptionistWelcomePageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';
import {View, StyleSheet} from 'react-native';
import {Text, Overlay, Input, Button} from 'react-native-elements';

const ReceptionistWelcomePage = ({
  route,
  navigation,
}: ReceptionistWelcomePageProps) => {
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [isWorkspaceVerified, setIsWorkspaceVerified] = useState<boolean>(
    false,
  );
  const [token, setToken] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const onPressVerifyWorkspace = () => {
    customAxios
      .post(`workspaces/${workspaceName}/receptionist/verify`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setIsWorkspaceVerified(true);
        }
      });
  };

  const onPressCheckToken = () => {
    customAxios
      .post(`workspaces/${workspaceName}/receptionist/check_otp_token`, {
        token,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setIsVerified(true);
        }
      });
  };

  const renderOverlayContent = () => {
    return isWorkspaceVerified ? (
      <View>
        <Text>Verified Workspace</Text>
        <Text>
          Please enter the {workspaceName} OTP that was just emailed to by the{' '}
          {workspaceName} admin
        </Text>
        <Input
          placeholder={`${workspaceName} workspace OTP`}
          value={token}
          onChangeText={(e) => setToken(e)}
        />
        <Button title="submit" onPress={onPressCheckToken} />
        <Button title="cancel" onPress={() => navigation.popToTop()} />
      </View>
    ) : (
      <View>
        <Text>Please enter your workspace name</Text>
        <Input
          placeholder="workspace name"
          value={workspaceName}
          onChangeText={(e) => setWorkspaceName(e)}
        />
        <Button title="submit" onPress={onPressVerifyWorkspace} />
        <Button title="cancel" onPress={() => navigation.popToTop()} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Overlay isVisible={!isVerified}>
        <View>{renderOverlayContent()}</View>
      </Overlay>
      <View>
        <Text h3 style={styles.title}>
          Welcome to {workspaceName}'s office!
        </Text>
        <Text h4 style={styles.subTitle}>
          How can I help you?
        </Text>
      </View>

      <View>
        <Text h4 style={styles.subTitle}>
          Please choose from one of the options below:
        </Text>
      </View>
      <View>
        <Button
          title="I have a scheduled meeting"
          onPress={() =>
            navigation.navigate('ReceptionistQrReaderPage', {workspaceName})
          }
          style={styles.button}
          titleStyle={styles.buttonText}
          icon={{
            name: 'event-available',
            color: 'white',
          }}
        />
        <Button
          title="This is an unscheduled meeting"
          onPress={() =>
            navigation.navigate('ReceptionistFormPage', {workspaceName})
          }
          style={styles.button}
          titleStyle={styles.buttonText}
          icon={{
            name: 'event-busy',
            color: 'white',
          }}
        />
      </View>
    </View>
  );
};

export default ReceptionistWelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    padding: 5,
  },
  subTitle: {
    textAlign: 'center',
    padding: 5,
  },
  button: {
    padding: 20,
  },
  buttonText: {
    fontSize: 24,
  },
});
