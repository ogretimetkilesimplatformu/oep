import AddLessonScreen from '../../screens/Student/Lesson/AddLessonScreen';
import React from 'react';
import LessonsScreen from '../../screens/Student/Lesson/LessonsScreen';

import {createStackNavigator} from '@react-navigation/stack';
import TestScreen from '../../screens/Student/Test/TestScreen';

let Stack = createStackNavigator();
export default function StudentLessonsNavigation() {
  return (
    <Stack.Navigator initialRouteName={'Lessons'}>
      <Stack.Screen
        options={{
          title: 'Ders Ekle',
        }}
        name={'AddLesson'}
        component={AddLessonScreen}
      />

      <Stack.Screen
        name={'Test'}
        component={TestScreen}
        options={{
          title: 'Formu Çözün',
        }}
      />

      <Stack.Screen
        options={{
          title: 'Derslerim',
        }}
        name="Lessons"
        component={LessonsScreen}
      />
    </Stack.Navigator>
  );
}
