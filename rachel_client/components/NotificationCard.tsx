import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import {Text, Button, Input} from 'react-native-elements';

const NotificationCard = ({notification, onPressResponse}) => {
  const [response, setResponse] = useState<string>('');

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
          <Text style={styles.notificationContent}>
            Visitor's name: {notification.name}
          </Text>
          <Text style={styles.notificationContent}>
            Visitor's email: {notification.email}
          </Text>
          <Text style={styles.notificationContent}>
            Visitor's contact number: {notification.phoneNumber}
          </Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          <Text style={styles.notificationContent}>Purpose for meeting:</Text>
          <Text style={styles.notificationContent}>
            {notification.description}
          </Text>
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
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          {notification.status === 'PENDING' ? (
            <>
              <Input
                label="Custom Response"
                placeholder="I accept/reject your unscheduled meeting request"
                onChangeText={(e) => setResponse(e)}
                value={response}
              />
              <View style={styles.responseButtonContainer}>
                <Button
                  title="Accept"
                  icon={{name: 'check-circle', color: 'white'}}
                  onPress={() =>
                    onPressResponse(notification.id, 'ACCEPT', response)
                  }
                />
                <Button
                  title="Reject"
                  buttonStyle={styles.rejectButton}
                  icon={{name: 'close', color: 'white'}}
                  onPress={() =>
                    onPressResponse(notification.id, 'REJECT', response)
                  }
                />
              </View>
            </>
          ) : (
            <Text style={styles.responseText}>
              Sent Response: {notification.response}
            </Text>
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
  responseButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  rejectButton: {
    backgroundColor: '#d9534f',
  },
  id: {
    fontWeight: '300',
  },
});
