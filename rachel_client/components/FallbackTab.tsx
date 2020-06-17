import React, {useEffect} from 'react';
import io from 'socket.io-client';
import {Text} from 'react-native';

const socket = io('http://localhost:3000/', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});
socket.on('news', (data: any) => {
  console.log(data);
  socket.emit('test', {my: 'data'});
});

const FallbackTab = () => {
  return <Text>This is the fallback tab component!</Text>;
};

export default FallbackTab;
