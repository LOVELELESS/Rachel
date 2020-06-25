import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ReceptionistQrReaderPageProps} from '../../types/screenTypes';

const ReceptionistQrReaderPage = ({
  route,
  navigation,
}: ReceptionistQrReaderPageProps) => {
  return (
    <QRCodeScanner
      onRead={(e) => console.log(e)}
      topContent="Please scan the meeting QR code that was emailed"
    />
  );
};

export default ReceptionistQrReaderPage;
