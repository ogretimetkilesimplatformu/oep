import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/General/ProfileScreen/Profile';

let Stack = createStackNavigator();
export default function ProfileNavigation() {
  return (
    <Stack.Navigator initialRouteName={'Profile'}>
      <Stack.Screen
        name={'Profile'}
        options={{
          title: 'Profil',
        }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}
