import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {Text, Button} from 'react-native';

const socket = io('http://192.168.1.96:3000/', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  query: {
    workspaceName: 'testWorkspaceName', // GET FROM CONTEXT
  },
});

const FallbackTab = () => {
  const [requireReply, setRequireReply] = useState<Boolean>(false);
  const [data, setData] = useState<String>('');

  useEffect(() => {
    socket.on('manual_form_submission', (data: any) => {
      setRequireReply(true);
      console.log(data);
    });

    socket.on('manual_form_get_reply', (data: any) => {
      setData(data.msg);
      console.log(data);
    });
  }, []);

  return (
    <>
      <Text>This is the fallback tab component!</Text>
      {requireReply && (
        <Button
          title="Require Reply"
          onPress={() => socket.emit('manual_form_reply', {msg: 'helo'})} // REPLACE WITH THE RELEVANT TEXT FIELDS
        />
      )}
      {data.length > 0 && <Text>{data}</Text>}
    </>
  );
};

export default FallbackTab;
