/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import LoginScreen from './src/screens/Auth/LoginScreen';
import PanelNavigation from './src/navigations/panel';
import CheckScreen from './src/screens/Auth/CheckScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RegisterDetailScreen from './src/screens/Student/Auth/RegisterDetailScreen';
import TeacherRegisterDetailScreen from './src/screens/Teacher/Auth/RegisterDetailScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont();
MaterialCommunityIcons.loadFont();
let Stack = createStackNavigator();
import {navigationRef} from './src/navigations/RootNavigation';

const App: () => React$Node = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'Check'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={'StudentRegisterDetail'}
          screenOptions={{
            headerShown: false,
          }}
          component={RegisterDetailScreen}
        />
        <Stack.Screen
          name={'TeacherRegisterDetail'}
          screenOptions={{
            headerShown: false,
          }}
          component={TeacherRegisterDetailScreen}
        />
        <Stack.Screen name={'Check'} component={CheckScreen} />
        <Stack.Screen name={'Login'} component={LoginScreen} />
        <Stack.Screen name={'Register'} component={RegisterScreen} />

        <Stack.Screen name={'Panel'} component={PanelNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
