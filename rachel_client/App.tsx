import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

const App = () => {
  return (
    <>
      <SafeAreaView>
        <Text h1 style={styles.title}>
          Hello World!
        </Text>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
