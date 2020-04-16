import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

export async function getUser() {
  let user = await AsyncStorage.getItem('user');

  return user ? JSON.parse(user) : {};
}

export async function setUser(data) {
  await AsyncStorage.setItem('user', JSON.stringify(data));
}

export const logout = async () => {
  await AsyncStorage.removeItem('user');
  return auth().signOut();
};
