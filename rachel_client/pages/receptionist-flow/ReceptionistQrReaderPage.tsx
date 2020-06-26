import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ReceptionistQrReaderPageProps} from '../../types/screenTypes';
import customAxios from '../../helpers/customAxios';
import {Text} from 'react-native-elements';

const ReceptionistQrReaderPage = ({
  route,
  navigation,
}: ReceptionistQrReaderPageProps) => {
  const onRead = (e) => {
    const data = e.data;
    customAxios
      .post(
        `workspaces/${route.params.workspaceName}/receptionist/verify_qrcode`,
        {
          qrCodeData: data,
        },
      )
      .then((res) => console.log(res));
  };

  return (
    <QRCodeScanner
      onRead={onRead}
      topContent={<Text>Please scan the meeting QR code that was emailed</Text>}
    />
  );
};

export default ReceptionistQrReaderPage;
