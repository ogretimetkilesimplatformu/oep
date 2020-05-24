import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AddLessonScreen from '../../screens/Teacher/Lesson/AddLessonScreen';
import LessonsScreen from '../../screens/Teacher/Lesson/LessonsScreen';
import EditLessonScreen from '../../screens/Teacher/Lesson/EditLessonScreen';
import LessonFormAnswersScreen from '../../screens/Teacher/Lesson/LessonFormAnswersScreen';
import LessonFormAnswerDetailsScreen from '../../screens/Teacher/Lesson/LessonFormAnswerDetailsScreen';

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
          title: 'Ders Düzenle',
        }}
        name={'EditLesson'}
        component={EditLessonScreen}
      />
      <Stack.Screen
        options={{
          title: 'Derslerim',
        }}
        name="Lessons"
        component={LessonsScreen}
      />

      <Stack.Screen
        options={{
          title: 'Form Cevapları',
        }}
        name={'LessonFormAnswers'}
        component={LessonFormAnswersScreen}
      />
      <Stack.Screen
        options={{
          title: 'Cevaplar',
        }}
        name={'LessonFormAnswerDetails'}
        component={LessonFormAnswerDetailsScreen}
      />
    </Stack.Navigator>
  );
}
