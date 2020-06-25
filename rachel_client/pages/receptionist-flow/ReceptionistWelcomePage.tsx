import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Overlay, Input, Button} from 'react-native-elements';
import {ReceptionistWelcomePageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';

const ReceptionistWelcomePage = ({
  route,
  navigation,
}: ReceptionistWelcomePageProps) => {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const onPressVerifyWorkspace = () => {
    customAxios
      .post(`workspaces/${workspaceName}/receptionist/verify`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setIsVerified(true);
        }
      });
  };

  const onPressCheckToken = () => {
    customAxios
      .post(`workspaces/${workspaceName}/receptionist/check_otp_token`, {
        token,
      })
      .then((res) => console.log(res));
  };

  const renderOverlayContent = () => {
    return isVerified ? (
      <View>
        <Text>Verified</Text>
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
      </View>
    );
  };

  return (
    <View>
      <Overlay isVisible={overlayVisible}>
        <View>{renderOverlayContent()}</View>
      </Overlay>
      <Text>This is the receptionist wwlcome page</Text>
    </View>
  );
};

export default ReceptionistWelcomePage;
