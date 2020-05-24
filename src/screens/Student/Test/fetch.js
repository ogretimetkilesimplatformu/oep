import firestore from '@react-native-firebase/firestore';
import {getUser} from '../../../helpers/user';
import moment from 'moment';

export const fetchForm = async (id: string) => {
  let data = await firestore().collection('forms').doc(id).get();

  if (data.exists) {
    return {
      ...data.data(),
      id: data.id,
    };
  }

  return false;
};

export const sendYourAnswers = async (lesson, answers) => {
  let user = await getUser();
  await firestore().collection('form_answers').add({
    lesson: lesson,
    answers: answers,
    created_at: moment().format(),
    lesson_id: lesson.id,
    user,
  });
};
