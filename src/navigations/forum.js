import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ForumScreen from '../screens/General/Forum/ForumScreen';
import CommentsScreen from '../screens/General/Forum/CommentsScreen';

let Stack = createStackNavigator();
export default function ForumNavigation() {
  return (
    <Stack.Navigator initialRouteName={'Forum'}>
      <Stack.Screen name={'Forum'} component={ForumScreen} />
      <Stack.Screen
        name={'Comments'}
        options={{
          title: 'Yorumlar',
        }}
        component={CommentsScreen}
      />
    </Stack.Navigator>
  );
}
