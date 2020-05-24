import React from 'react';
import {View} from 'react-native';
import ActivityIndicator from 'react-native-paper/src/components/ActivityIndicator';

const CenteredLoading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CenteredLoading;
