import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {getUser} from '../../../helpers/user';
import {ActivityIndicator, Chip, Headline} from 'react-native-paper';
import LessonItem from './components/LessonItem';
import {getActiveLessons} from '../../../helpers/lesson';
import {navigate} from '../../../navigations/RootNavigation';
import WarningAlert from '../../../components/WarningAlert';

export default function LessonsScreen(props) {
  let [loading, setLoading] = useState(true);
  let [lessons, setLessons] = useState({actives: [], passives: []});

  let goItem = (lesson) => () => {};

  useEffect(() => {
    let fetchItems = async () => {
      let user = await getUser();

      return firestore()
        .collection('lesson_participations')
        .where('user_id', '==', user.id)
        .onSnapshot((querySnapshot) => {
          let items = [];

          querySnapshot.docs.forEach((item) => {
            let data = {...item.data()};
            items.push(data.lesson);
          });

          let [actives, passives] = getActiveLessons(items);
          setLessons({
            actives,
            passives,
          });
          setLoading(false);
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
          Aktif Dersler
        </Headline>
        {lessons.actives.length ? (
          lessons.actives.map((lesson, index) => (
            <LessonItem
              goItem={goItem(lesson)}
              active
              lesson={lesson}
              key={index}
            />
          ))
        ) : (
          <WarningAlert warning={'Açık Dersiniz Bulunmamaktadır'} />
        )}

        <View
          style={{
            marginTop: 10,
          }}>
          <Headline
            style={{
              marginBottom: 15,
            }}>
            Kapalı Dersler
          </Headline>

          {lessons.passives.length ? (
            lessons.passives.map((lesson, index) => (
              <LessonItem active={false} lesson={lesson} key={index} />
            ))
          ) : (
            <WarningAlert warning={'Kapalı Dersiniz Bulunmamaktadır'} />
          )}
        </View>
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
