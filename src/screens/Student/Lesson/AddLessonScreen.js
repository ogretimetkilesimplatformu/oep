import React, {useState} from 'react';
import {ScrollView, View, KeyboardAvoidingView} from 'react-native';
import {exp} from 'react-native-reanimated';
import {
  ActivityIndicator,
  Button,
  Headline,
  Paragraph,
  TextInput,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {getUser} from '../../../helpers/user';
import ErrorAlert from '../../../components/ErrorAlert';

let lessons = firestore().collection('lessons');
let lessonParticipations = firestore().collection('lesson_participations');

export default function AddLessonScreen(props) {
  let [loading, setLoading] = useState(false);

  let [lessonCode, setLessonCode] = useState('');
  let [error, setError] = useState(null);

  let onSave = async () => {
    setLoading(true);
    let user = await getUser();
    let doc = await lessons.where('lesson_code', '==', lessonCode).get();

    if (!doc.empty) {
      let findLesson = doc.docs[0];
      if (findLesson.exists) {
        lessonParticipations.add({
          lesson_id: findLesson.id,
          lesson: findLesson.data(),
          user_id: user.id,
          user: user,
        });
        setLoading(false);
        props.navigation.push('Lessons');

        return;
      }
    }

    setLoading(false);
    setError('Ders bulunamadı!');
  };

  return (
    <KeyboardAvoidingView
      method={'padding'}
      enabled
      style={{
        flex: 1,
      }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            backgroundColor: '#fff',
            padding: 30,
          }}>
          {loading ? (
            <View
              style={{
                alingItems: 'center',
              }}>
              <ActivityIndicator />
            </View>
          ) : null}
          {error ? <ErrorAlert error={error} /> : null}
          <View
            style={{
              marginVertical: 20,
            }}>
            <Headline>Ders Ekleme Formu</Headline>
            <Paragraph>
              Öğretmeniniz tarafından sizinle paylaşılan ders kodunu buraya
              giriniz
            </Paragraph>
          </View>

          <TextInput
            value={lessonCode}
            onChangeText={(value) => setLessonCode(value)}
            label={'Ders Kodu'}
          />

          <Button
            onPress={onSave}
            style={{
              marginTop: 20,
            }}>
            Derse Kayıt Ol
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
