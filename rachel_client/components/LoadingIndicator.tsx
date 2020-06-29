import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const LoadingIndicator = () => {
  return (
    <Button
      containerStyle={styles.container}
      loading
      loadingProps={{size: 'large'}}
      type="clear"
    />
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
