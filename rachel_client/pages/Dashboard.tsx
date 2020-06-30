import React, {useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {DashboardScreenProps} from '../types/screenTypes';
import customAxios from '../helpers/customAxios';
import {deepCopy} from '../helpers/arrayUtils';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';
import MeetingCard from '../components/MeetingCard';
import LoadingIndicator from '../components/LoadingIndicator';

const Dashboard = ({route, navigation}: DashboardScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meetings, setMeetings] = useState<Array<Object>>([]);
  const auth: AuthContextType = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      customAxios
        .get(
          `workspaces/${auth.userSettings.workspaceName}/users/${auth.user.uid}/meetings/`,
        )
        .then((res) => {
          if (res.data.success) {
            setMeetings(res.data.meetings);
            setIsLoading(false);
          }
        });
    }, []),
  );

  const renderMeetingCards = () => {
    if (meetings.length < 1) {
      return (
        <View>
          <Text h4 style={styles.noMeetingsText}>
            You have no meetings scheduled! :>
          </Text>
        </View>
      );
    } else {
      return meetings.map((meeting, i) => (
        <MeetingCard
          key={i}
          navigation={navigation}
          data={{
            meetingTitle: meeting.title,
            meetingDate: meeting.date,
            meetingDescription: meeting.description,
            meetingId: meeting.meetingid,
            participants: meeting.participants,
            date: meeting.date,
          }}
          onDelete={() => {
            let newMeetings = deepCopy(meetings);
            newMeetings.splice(i, 1);
            setMeetings(newMeetings);
          }}
        />
      ));
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        justifyContent: isLoading ? 'center' : 'flex-start',
        backgroundColor: isLoading ? 'lightgrey' : 'white',
      }}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Text h4 style={styles.header}>
            Welcome, {auth.user?.displayName}!{' '}
            {meetings.length > 0 ? 'Here are your scheduled meetings.' : ''}
          </Text>
          <ScrollView>{renderMeetingCards()}</ScrollView>
          <Button
            style={styles.addMeeting}
            buttonStyle={styles.addMeetingButton}
            titleStyle={styles.addMeetingTitle}
            title="Add Meeting"
            onPress={() => navigation.navigate('AddOrEditMeetingPage')}
            icon={{name: 'group-add', size: 30, color: 'white'}}
          />
        </>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  noMeetingsText: {
    padding: 20,
  },
  addMeeting: {
    padding: 30,
  },
  addMeetingButton: {
    backgroundColor: '#0074d9',
  },
  addMeetingTitle: {
    fontWeight: 'bold',
    padding: 5,
  },
});
