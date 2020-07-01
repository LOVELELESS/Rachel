import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-elements';

const UserCard = ({user, onPress}) => {
  return (
    <View>
      <Text>{'<<<<<'}</Text>
      <Text>
        {user.displayName}, {user.role}
      </Text>
      <Button title="configure" onPress={onPress} />
      <Text>{'<<<<<'}</Text>
    </View>
  );
};

export default UserCard;
