import React, {useContext} from 'react';
import {DashboardScreenProps} from '../types/screenTypes';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import MeetingCard from '../components/MeetingCard';

const Dashboard = ({route, navigation}: DashboardScreenProps) => {
  const auth: AuthContextType = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text h1>This is the Dashboard page</Text>
      <MeetingCard
        data={{
          meetingTitle: 'title',
          meetingDate: Date.now(),
          meetingDescription: 'description',
          meetingId: '12345',
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
