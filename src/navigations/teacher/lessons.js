import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AddLessonScreen from '../../screens/Teacher/Lesson/AddLessonScreen';
import LessonsScreen from '../../screens/Teacher/Lesson/LessonsScreen';

let Stack = createStackNavigator();
export default function TeacherLessonsNavigation() {
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
        options={{
          title: 'Derslerim',
        }}
        name="Lessons"
        component={LessonsScreen}
      />
    </Stack.Navigator>
  );
}
