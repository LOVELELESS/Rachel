import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ReceptionistQrReaderPageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';
import {Text, Button, Icon} from 'react-native-elements';

const ReceptionistQrReaderPage = ({
  route,
  navigation,
}: ReceptionistQrReaderPageProps) => {
  const workspaceName = route.params.workspaceName;
  const onRead = (e) => {
    const data = e.data;
    customAxios
      .post(`workspaces/${workspaceName}/receptionist/verify_qrcode`, {
        qrCodeData: data,
      })
      .then((res) => console.log(res));
  };

  return (
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
  );
};

export default ReceptionistQrReaderPage;
