import React, {useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';
import {UsersPageProps} from '../types/screenTypes';
import customAxios from '../helpers/customAxios';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import UserCard from '../components/UserCard';
import LoadingIndicator from '../components/LoadingIndicator';

const UsersPage = ({route, navigation}: UsersPageProps) => {
  const auth: AuthContextType = useContext(AuthContext);
  const [users, setUsers] = useState<Array<Object>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllUsers = async () => {
    setIsLoading(true);
    return customAxios
      .get(`workspaces/${auth.userSettings.workspaceName}/users`)
      .then((res) => {
        console.log(res.data);
        setUsers(
          res.data.users.filter((user) => user.userid !== auth.user?.uid),
        );
      })
      .then(() => setIsLoading(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllUsers();
    }, []),
  );

  const renderContent = () => {
    return users.map((user, i) => {
      return <UserCard user={user} key={i} getAllUsers={getAllUsers} />;
    });
  };

  const backgroundColor = isLoading ? 'lightgrey' : 'white';
  const justifyContent = isLoading ? 'center' : 'flex-start';

  return (
    <View style={{...styles.container, backgroundColor, justifyContent}}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView style={styles.contentContainer}>
          {renderContent()}
        </ScrollView>
      )}
    </View>
  );
};

export default UsersPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '95%',
    alignSelf: 'center',
  },
});
