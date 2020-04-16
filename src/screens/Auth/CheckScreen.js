import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {getUser} from '../../helpers/user';
import {sub} from 'react-native-reanimated';

export default function CheckScreen(props) {
  // Set an initializing state whilst Firebase connects

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      let user = auth().currentUser;
      getUser().then((userDetails) => {
        props.navigation.push(
          user ? 'Panel' : 'Login',
          user
            ? {
                screen: userDetails.type === 1 ? 'Student' : 'Teacher',
              }
            : null,
        );
      });
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
}
