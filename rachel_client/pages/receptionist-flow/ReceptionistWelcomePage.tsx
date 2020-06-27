import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Overlay, Input, Button} from 'react-native-elements';
import {ReceptionistWelcomePageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';

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
    <View>
      <Overlay isVisible={!isVerified}>
        <View>{renderOverlayContent()}</View>
      </Overlay>
      <Text>This is the receptionist wwlcome page</Text>
      <Button
        title="I have a scheduled meeting"
        onPress={() =>
          navigation.navigate('ReceptionistQrReaderPage', {workspaceName})
        }
      />
      <Button
        title="This is an unscheduled meeting"
        onPress={() =>
          navigation.navigate('ReceptionistFormPage', {workspaceName})
        }
      />
    </View>
  );
};

export default ReceptionistWelcomePage;
