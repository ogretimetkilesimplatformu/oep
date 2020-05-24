import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TeacherLessonsNavigation from './lessons';
import ForumNavigation from '../forum';
import ProfileNavigation from '../profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TeacherFormNavigation from './forms';

let Tab = createBottomTabNavigator();

export default function TeacherRootNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Forum') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Lessons') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          } else if (route.name === 'Forms') {
            iconName = focused ? 'ios-bookmark' : 'ios-bookmark';
          } else {
            iconName = 'ios-person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Forum" component={ForumNavigation} />
      <Tab.Screen
        name="Forms"
        options={{
          title: 'Anketler',
        }}
        component={TeacherFormNavigation}
      />
      <Tab.Screen
        name="Lessons"
        options={{
          title: 'Derslerim',
        }}
        component={TeacherLessonsNavigation}
      />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
}
