import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {DashboardScreenProps} from '../types/screenTypes';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import customAxios from '../helpers/customAxios';
import {SafeAreaView} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {Footer, FooterTab, Header, Content, Container} from 'native-base';
import MeetingCard from '../components/MeetingCard';

const Dashboard = ({route, navigation}: DashboardScreenProps) => {
  const [meetings, setMeetings] = useState<Array<Object>>([]);
  const auth: AuthContextType = useContext(AuthContext);

  useEffect(() => {
    customAxios
      .get(
        `workspaces/${auth.userSettings.workspaceName}/users/${auth.user.uid}/meetings/`,
      )
      .then((res) => {
        setMeetings(res.data.meetings);
      });
  });

  const renderMeetingCards = () => {
    if (meetings.length < 1) {
      return <Text h1>NO PENDING MEETINGS</Text>;
    } else {
      return meetings.map((meeting) => (
        <MeetingCard
          data={{
            meetingTitle: meeting.title,
            meetingDate: meeting.date,
            meetingDescription: meeting.description,
            meetingId: meeting.meetingid,
          }}
        />
      ));
    }
  };

  return (
    <Container>
      <Header>
        <Text h1>This is the Dashboard page</Text>
      </Header>
      <Content>{renderMeetingCards()}</Content>
      <Footer>
        <Button
          title="add meetings"
          onPress={() => navigation.navigate('AddMeetingsPage')}
        />
      </Footer>
    </Container>
  );
};

export default Dashboard;
