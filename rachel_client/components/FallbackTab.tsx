import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {Text, Button} from 'react-native';

const socket = io('http://localhost:3000/', {
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
  useEffect(() => {
    socket.on('manual_form_submission', (data: any) => {
      setRequireReply(true);
      console.log(data);
    });

    socket.on('manual_form_get_reply', (data: any) => {
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
    </>
  );
};

export default FallbackTab;
