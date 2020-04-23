import firestore from '@react-native-firebase/firestore';
import {exp} from 'react-native-reanimated';

let buildDataFromFirestore = (snapshot) => {
  let data = [];

  if (snapshot.empty) {
    return [];
  }

  snapshot.docs.forEach((item) => data.push({...item.data()}));

  return data;
};

export async function getCities() {
  let snapshot = await firestore().collection('cities').get();

  return buildDataFromFirestore(snapshot);
}

export async function getCounties() {
  let snapshot = await firestore().collection('counties').get();

  return buildDataFromFirestore(snapshot);
}

export async function getSchoolNames() {
  let snapshot = await firestore().collection('school_names').get();

  return buildDataFromFirestore(snapshot);
}

export async function getGrades() {
  let snapshot = await firestore().collection('grades').get();

  return buildDataFromFirestore(snapshot);
}

export async function fetchSelectData() {
  return {
    schoolNames: await getSchoolNames(),
    grades: await getGrades(),
    cities: await getCities(),
    counties: await getCounties(),
  };
}
