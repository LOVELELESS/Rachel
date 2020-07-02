import React, {useState} from 'react';
import {ReceptionistWelcomePageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';
import LoadingIndicator from '../../components/LoadingIndicator';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPressVerifyWorkspace = () => {
    setIsLoading(true);
    customAxios
      .post(`workspaces/${workspaceName}/receptionist/verify`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setIsWorkspaceVerified(true);
          setIsLoading(false);
        }
      });
  };

  const onPressCheckToken = () => {
    setIsLoading(true);
    customAxios
      .post(`workspaces/${workspaceName}/receptionist/check_otp_token`, {
        token,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setIsVerified(true);
          setIsLoading(false);
        }
      });
  };

  const renderOverlayContent = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }

    return isWorkspaceVerified ? (
      <View>
        <Text h4 style={styles.overlayTitle}>
          Verified Workspace!
        </Text>
        <Text style={styles.overlaySubtitle}>
          Please enter the OTP that was just emailed to the Admins of{' '}
          {workspaceName}:
        </Text>
        <Input
          placeholder={`${workspaceName} OTP`}
          value={token}
          onChangeText={(e) => setToken(e)}
          leftIcon={{name: 'lock', type: 'font-awesome-5'}}
        />
        <Button
          title="Submit"
          style={styles.overlayButton}
          onPress={onPressCheckToken}
        />
        <Button
          title="Cancel"
          style={styles.overlayButton}
          onPress={() => navigation.popToTop()}
        />
      </View>
    ) : (
      <View>
        <Text>Note: Only Admins can launch the E-Receptionist</Text>
        <Text h4>Please enter the name of your workspace:</Text>
        <Input
          placeholder="ABC-Company"
          value={workspaceName}
          leftIcon={{name: 'business'}}
          onChangeText={(e) => setWorkspaceName(e)}
        />
        <Button
          title="Submit"
          style={styles.overlayButton}
          onPress={onPressVerifyWorkspace}
        />
        <Button
          title="Cancel"
          style={styles.overlayButton}
          onPress={() => navigation.popToTop()}
        />
      </View>
    );
  };

  return (
    <>
      {!isVerified ? (
        <Overlay isVisible={!isVerified}>
          <View>{renderOverlayContent()}</View>
        </Overlay>
      ) : (
        <View style={styles.container}>
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
      )}
    </>
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
  overlayTitle: {
    textAlign: 'center',
  },
  overlaySubtitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 24,
  },
  overlayButton: {
    padding: 10,
  },
});
