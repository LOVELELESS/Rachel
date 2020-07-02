import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ReceptionistQrReaderPageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';
import {Text, Button, Icon, Overlay} from 'react-native-elements';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  QR_READER_SUCCESS_RESPONSE,
  QR_READER_FAILURE_RESPONSE,
} from '../../helpers/constants';

const ReceptionistQrReaderPage = ({
  route,
  navigation,
}: ReceptionistQrReaderPageProps) => {
  const workspaceName = route.params.workspaceName;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');

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
          setTimeout(() => navigation.navigate('ReceptionistWelcomePage'));
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
          {isLoading ? <LoadingIndicator /> : <Text h4>{response}</Text>}
        </Overlay>
      ) : (
        <QRCodeScanner
          onRead={onRead}
          topContent={
            <>
              <Icon name="qrcode" type="font-awesome" size={50} />
              <Text h3>Please scan the meeting QR code that was emailed</Text>
            </>
          }
          bottomContent={
            <Button
              title="No QR code?"
              onPress={() =>
                navigation.navigate('ReceptionistFormPage', {workspaceName})
              }
              icon={{name: 'error', color: 'white'}}
            />
          }
        />
      )}
    </>
  );
};

export default ReceptionistQrReaderPage;
