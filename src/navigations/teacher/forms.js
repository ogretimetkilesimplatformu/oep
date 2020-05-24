import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import CreateLessonFormScreen from '../../screens/Teacher/Form/CreateLessonFormScreen';
import TeacherFormsScreen from '../../screens/Teacher/Form/TeacherFormsScreen';

let Stack = createStackNavigator();

export default function TeacherFormNavigation() {
  return (
    <Stack.Navigator initialRouteName={'Forms'}>
      <Stack.Screen
        options={{
          title: 'Form Ekle',
        }}
        name={'CreateLessonForm'}
        component={CreateLessonFormScreen}
      />
      <Stack.Screen
        options={{title: 'Formlar'}}
        name={'Forms'}
        component={TeacherFormsScreen}
      />
    </Stack.Navigator>
  );
}
