import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ReceptionistQrReaderPageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';
import LoadingIndicator from '../../components/LoadingIndicator';
import {Text, Button, Icon, Overlay} from 'react-native-elements';
import {
  QR_READER_SUCCESS_RESPONSE,
  QR_READER_FAILURE_RESPONSE,
} from '../../helpers/constants';
import {StyleSheet} from 'react-native';

const ReceptionistQrReaderPage = ({
  route,
  navigation,
}: ReceptionistQrReaderPageProps) => {
  const workspaceName = route.params.workspaceName;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [response, setResponse] = useState<string>(QR_READER_SUCCESS_RESPONSE);

  const onRead = (e) => {
    setIsLoading(true);
    const data = e.data;
    customAxios
      .post(`workspaces/${workspaceName}/receptionist/verify_qrcode`, {
        qrCodeData: data,
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setShowOverlay(true);
        if (res.data.success) {
          setResponse(QR_READER_SUCCESS_RESPONSE);
          setTimeout(
            () => navigation.navigate('ReceptionistWelcomePage'),
            10000,
          );
        } else {
          setResponse(QR_READER_FAILURE_RESPONSE);
          setTimeout(() => setShowOverlay(false));
        }
      });
  };

  return (
    <>
      {showOverlay ? (
        <Overlay isVisible={showOverlay}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <Text style={styles.response}>{response}</Text>
          )}
        </Overlay>
      ) : (
        <>
          <Icon
            style={styles.qrIcon}
            name="qrcode"
            type="font-awesome"
            size={50}
          />
          <Text style={styles.title}>
            Please scan the meeting QR code that was emailed
          </Text>
          <QRCodeScanner onRead={onRead} />
          <Button
            title="No QR code?"
            onPress={() =>
              navigation.navigate('ReceptionistFormPage', {workspaceName})
            }
            icon={{name: 'error', color: 'white'}}
            style={styles.button}
          />
        </>
      )}
    </>
  );
};

export default ReceptionistQrReaderPage;

const styles = StyleSheet.create({
  qrIcon: {
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 10,
  },
  response: {
    padding: 10,
    fontSize: 20,
  },
});
