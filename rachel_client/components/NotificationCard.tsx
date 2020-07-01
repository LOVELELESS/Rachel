import React from 'react';
import {View, StyleSheet} from 'react-native';
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

  const getStatusColor = () => {
    switch (notification.status) {
      case 'ACCEPT':
        return '#3d9970';
      case 'REJECT':
        return '#ff4136';
      case 'PENDING':
        return '#ff851b';
    }
  };

  return (
    <Card>
      <CardItem>
        <Body>
          <Text style={styles.notificationContent}>{notification.content}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          <Text
            style={{
              ...styles.statusText,
              backgroundColor: getStatusColor(),
              color: 'white',
            }}>
            {notification.status}
          </Text>
          {notification.status !== 'PENDING' && (
            <Text style={styles.responseText}>{notification.response}</Text>
          )}
        </Body>
      </CardItem>
      <CardItem footer>
        <Text style={styles.id}>#{notification.id}</Text>
      </CardItem>
    </Card>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  notificationContent: {
    fontSize: 18,
  },
  statusText: {
    padding: 5,
  },
  responseText: {
    fontWeight: 'bold',
  },
  id: {
    fontWeight: '300',
  },
});
