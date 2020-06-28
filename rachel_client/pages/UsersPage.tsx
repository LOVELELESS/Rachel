import React, {useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {UsersPageProps} from '../types/screenTypes';
import customAxios from '../helpers/customAxios';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';

const UsersPage = ({route, navigation}: UsersPageProps) => {
  const auth: AuthContextType = useContext(AuthContext);
  const [users, setUsers] = useState<Array<Object>>([]);
  useFocusEffect(
    React.useCallback(() => {
      customAxios
        .get(`workspaces/${auth.userSettings.workspaceName}/users`)
        .then((res) => {
          console.log(res.data);
          setUsers(res.data.users);
        });
    }, []),
  );
  const renderContent = () => {
    return users.map((user) => {
      return (
        <View>
          <Text>{'<<<<<'}</Text>
          <Text>
            {user.displayName}, {user.role}
          </Text>
          <Text>{'<<<<<'}</Text>
        </View>
      );
    });
  };

  return (
    <View>
      <Text>This is the users page</Text>
      {renderContent()}
    </View>
  );
};

export default UsersPage;
