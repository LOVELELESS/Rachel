import React from 'react';
import {View} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import {Text} from 'react-native-elements';

const NotificationCard = ({notification}: any) => {
  /*
  if (notification.status === 'PENDING') {
    return (
      <View>
        <Text>{'<<<<<<'}</Text>
        <Text>{notification.id}</Text>
        <Text>{notification.content}</Text>
        <Text>{notification.status}</Text>
        <Button title="ACCEPT" onPress={() => onPressResponse(i, 'ACCEPT')} />
        <Button title="REJECT" onPress={() => onPressResponse(i, 'REJECT')} />
        <Text>{'<<<<<<'}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>{'<<<<<<'}</Text>
        <Text>{notification.id}</Text>
        <Text>{notification.content}</Text>
        <Text>{notification.status}</Text>
        <Text>{notification.response}</Text>
        <Text>{'<<<<<<'}</Text>
      </View>
    );
  }
  */

  return (
    <Card>
      <CardItem>
        <Body>
          <Text>{notification.id}</Text>
          <Text>{notification.content}</Text>
          <Text>{notification.status}</Text>
          <Text>{notification.response}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default NotificationCard;
