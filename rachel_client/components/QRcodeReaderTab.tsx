import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const QRcodeReaderTab = () => {
  // onRead => e.data = 'workspaceName-meetingid'
  //<QRCodeScanner onRead={(e) => console.log(e)} />
  return (
    <>
      <Text style={{marginBottom: 10}}>This is the QRCode reader tba!</Text>
    </>
  );
};

export default QRcodeReaderTab;
