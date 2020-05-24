import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {getUser} from '../../../helpers/user';
import {ActivityIndicator, Chip, Headline} from 'react-native-paper';
import {navigate} from '../../../navigations/RootNavigation';
import LessonItem from '../../Student/Lesson/components/LessonItem';
import WarningAlert from '../../../components/WarningAlert';

export default function LessonsScreen(props) {
  let [loading, setLoading] = useState(true);
  let [lessons, setLessons] = useState([]);

  let goItem = (lesson) => () => {
    console.log(props);

    props.navigation.push('LessonFormAnswers', {
      lesson,
    });
  };

  useEffect(() => {
    let fetchItems = async () => {
      let user = await getUser();

      return firestore()
        .collection('lessons')
        .where('teacher_id', '==', user.id)
        .onSnapshot((querySnapshot) => {
          let items = [];

          if (querySnapshot) {
            querySnapshot.docs.forEach((item) => {
              let data = {...item.data(), id: item.id};
              items.push(data);
            });

            setLessons(items);
            setLoading(false);
          }
        });
    };

    fetchItems();
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          flex: 1,
          padding: 15,
        }}>
        {loading ? <ActivityIndicator /> : null}

        <Headline
          style={{
            marginBottom: 15,
          }}>
          Derslerim
        </Headline>
        <LessonItem
          active
          teacher
          lesson={{
            name: 'Ders Adı',
            lesson_code: 'Ders Kodu',
          }}
        />
        <View
          style={{
            margin: 5,
          }}></View>
        {lessons.length ? (
          lessons.map((lesson, index) => (
            <LessonItem
              goItem={goItem(lesson)}
              active
              teacher
              lesson={lesson}
              key={index}
            />
          ))
        ) : (
          <WarningAlert warning={'Dersiniz Bulunmamaktadır'} />
        )}
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: 25,
        }}>
        <Chip
          mode={'outlined'}
          icon={'plus'}
          onPress={() => navigate('AddLesson')}>
          Ders Ekle
        </Chip>
      </View>
    </View>
  );
}
