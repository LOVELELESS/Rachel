import React, {useState, useContext} from 'react';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';
import customAxios from '../helpers/customAxios';
import {StyleSheet} from 'react-native';
import {Text, Button, Overlay} from 'react-native-elements';
import {Card, CardItem} from 'native-base';

const UserCard = ({user, getAllUsers}) => {
  const auth: AuthContextType = useContext(AuthContext);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  let roleBackgroundColor;
  switch (user.role) {
    case 'ADMIN':
      roleBackgroundColor = '#f012be';
      break;
    case 'FALLBACK':
      roleBackgroundColor = '#f0ad4e';
      break;
    case 'EMPLOYEE':
      roleBackgroundColor = '#3d9970';
      break;
  }

  const renderOverlayContent = () => {
    return (
      <>
        <Text style={styles.insideOverlayConfigureText}>
          Configuring Role for:{' '}
        </Text>
        <Text style={styles.userText} numberOfLines={2}>
          {user.displayName} ({user.email})
        </Text>
        {user.role !== 'ADMIN' && (
          <>
            <Button
              style={styles.insideOverlayButton}
              title="Set as Admin"
              onPress={() => changeRole('ADMIN')}
            />
          </>
        )}
        {user.role !== 'FALLBACK' && (
          <>
            <Button
              style={styles.insideOverlayButton}
              title="Set as Fallback"
              onPress={() => changeRole('FALLBACK')}
            />
          </>
        )}
        {user.role !== 'EMPLOYEE' && (
          <>
            <Button
              style={styles.insideOverlayButton}
              title="Set as Employee"
              onPress={() => changeRole('EMPLOYEE')}
            />
          </>
        )}
        <Button
          style={styles.insideOverlayButton}
          title="cancel"
          type="clear"
          titleStyle={{color: 'red'}}
          icon={{name: 'close', color: 'red'}}
          onPress={() => setShowOverlay(false)}
        />
      </>
    );
  };

  const changeRole = (newRole: string) => {
    customAxios
      .put(
        `workspaces/${auth.userSettings.workspaceName}/users/${user.userid}/roles`,
        {
          role: newRole,
        },
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          getAllUsers().then(() => setShowOverlay(false));
        }
      });
  };

  return (
    <>
      {showOverlay && (
        <Overlay
          isVisible={showOverlay}
          onBackdropPress={() => setShowOverlay(false)}>
          {renderOverlayContent()}
        </Overlay>
      )}
      <Card>
        <CardItem>
          <Text numberOfLines={2}>
            User:{' '}
            <Text style={styles.userText}>
              {user.displayName} ({user.email})
            </Text>
          </Text>
        </CardItem>
        <CardItem>
          <Text>Current Role: </Text>
          <Text
            style={{
              ...styles.roleText,
              backgroundColor: roleBackgroundColor,
            }}>
            {user.role}
          </Text>
        </CardItem>
        <CardItem>
          <Button
            icon={{name: 'user-cog', type: 'font-awesome-5', color: 'white'}}
            title="Configure Role"
            onPress={() => setShowOverlay(true)}
          />
        </CardItem>
      </Card>
    </>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  userText: {
    fontWeight: '500',
    fontSize: 16,
  },
  roleText: {
    color: 'white',
    padding: 5,
  },
  insideOverlayConfigureText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    paddingBottom: 5,
  },
  insideOverlayButton: {
    padding: 5,
  },
});
