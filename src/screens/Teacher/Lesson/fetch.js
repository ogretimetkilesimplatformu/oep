import firestore from '@react-native-firebase/firestore';
import {buildDataFromFirestore} from '../../../helpers/city_county';

export const fetchLessonAnswers = async (lesson_id: string) => {
  let answers = await firestore()
    .collection('form_answers')
    .where('lesson_id', '==', lesson_id)
    .get();

  return buildDataFromFirestore(answers);
};
