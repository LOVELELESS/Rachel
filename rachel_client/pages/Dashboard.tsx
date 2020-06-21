import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {DashboardScreenProps} from 'types/screenTypes';
import customAxios from '../helpers/customAxios';

const Dashboard = ({route, navigation}: DashboardScreenProps) => {
  const auth: AuthContextType = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    customAxios
      .post('auth/login', {
        userid: auth.user?.uid,
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <SafeAreaView>
      {isLoading ? (
        <Text>LOADING NOW</Text>
      ) : (
        <>
          <Text h1>This is the Dashboard page</Text>
          <Text>{auth.user ? auth.user.displayName : 'NULL USER'}</Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default Dashboard;
