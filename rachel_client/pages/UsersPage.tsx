import React, {useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {UsersPageProps} from '../types/screenTypes';
import customAxios from '../helpers/customAxios';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';

const UsersPage = ({route, navigation}: UsersPageProps) => {
  const auth: AuthContextType = useContext(AuthContext);
  const [users, setUsers] = useState<Array<Object>>([]);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [currUser, setCurrUser] = useState<Object>();

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
    return users.map((user, i) => {
      return (
        <View key={i}>
          <Text>{'<<<<<'}</Text>
          <Text>
            {user.displayName}, {user.role}
          </Text>
          <Button
            title="configure"
            onPress={() => {
              setCurrUser(user);
              setShowOverlay(true);
            }}
          />
          <Text>{'<<<<<'}</Text>
        </View>
      );
    });
  };

  const changeRole = (newRole: string) => {
    customAxios
      .put(
        `workspaces/${auth.userSettings.workspaceName}/users/${currUser.userid}/roles`,
        {
          role: newRole,
        },
      )
      .then((res) => console.log(res));
  };

  const renderOverlayContent = () => {
    if (showOverlay) {
      return (
        <>
          <Text>This is overlay</Text>
          <Text>{currUser.displayName}</Text>
          <Text>{currUser.email}</Text>
          {currUser.role === 'EMPLOYEE' && (
            <Button title="make admin" onPress={() => changeRole('ADMIN')} />
          )}
          {currUser.role === 'ADMIN' && (
            <Button
              title="make employee"
              onPress={() => changeRole('EMPLOYEE')}
            />
          )}
          <Button title="ok" onPress={() => setShowOverlay(false)} />
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <View>
      <Overlay isVisible={showOverlay}>{renderOverlayContent()}</Overlay>
      <Text>This is the users page</Text>
      {renderContent()}
    </View>
  );
};

export default UsersPage;
