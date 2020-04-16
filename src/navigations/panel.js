import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import StudentRootNavigation from './student/root';
import TeacherRootNavigation from './teacher/root';

let Stack = createStackNavigator();

export default function PanelNavigation() {
  return (
    <Stack.Navigator initialRouterName={'Forum'}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={'Student'}
        component={StudentRootNavigation}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={'Teacher'}
        component={TeacherRootNavigation}
      />
    </Stack.Navigator>
  );
}
