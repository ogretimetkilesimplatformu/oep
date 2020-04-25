import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {
  Button,
  Text,
  TextInput,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import MaterialSelect from '../../../components/MaterialSelect';
import MaterialDateTimeSelect, {
  formats,
} from '../../../components/MaterialDateTimeSelect';
import firestore from '@react-native-firebase/firestore';
import {getUser} from '../../../helpers/user';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getGrades} from '../../../helpers/city_county';
import moment from 'moment';

const removeItem = (items, i) =>
  items.slice(0, i - 1).concat(items.slice(i, items.length));

let createDefault = () => ({
  startDatetime: undefined,
  endDatetime: undefined,
});

export default function EditLessonScreen(props) {
  let {
    route: {
      params: {lesson},
    },
  } = props;

  let [grades, setGrades] = useState([]);

  let [loading, setLoading] = useState(false);
  let [formData, setFormData] = useState({
    ...lesson,
  });

  let [lessons, setLessons] = useState([
    ...lesson.times.map((lesson) => ({
      ...lesson,
      startDatetime: moment(lesson.startDatetime).toDate(),
      endDatetime: moment(lesson.endDatetime).toDate(),
    })),
  ]);

  useEffect(() => {
    getGrades().then((gradesFetched) => setGrades(gradesFetched));
  }, []);

  console.log(grades);

  let removeLine = (index) => {
    setLessons(removeLine([...lessons], index));
  };
  let onChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  let onSave = async () => {
    setLoading(true);
    let user = await getUser();

    await firestore()
      .collection('lessons')
      .doc(lesson.id)
      .update({
        ...formData,
        teacher_id: user.id,
        times: lessons.map((lesson) => ({
          ...lesson,
          startDatetime: moment(lesson.startDatetime).format(formats.datetime),
          endDatetime: moment(lesson.endDatetime).format(formats.datetime),
        })),
      });

    props.navigation.push('Lessons');

    setLoading(false);
  };

  let onLessonChange = (index, key, value) => {
    let lessonsLocal = [...lessons];

    lessonsLocal[index] = {
      ...lessonsLocal[index],
      [key]: value,
    };

    setLessons(lessonsLocal);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            backgroundColor: '#fff',
            padding: 30,
          }}>
          <View
            styles={{
              flexDirection: 'row',
            }}>
            <TextInput
              label={'Ders Adı'}
              onChangeText={(value) => onChange('name', value)}
              value={formData.name}
            />
            <View>
              <MaterialSelect
                onChange={(value) => onChange('grade', value)}
                items={grades}
                placeholder={'Sınıf Seçiniz'}
                value={formData.grade}
                label={'Sınıf Seçiniz'}
              />
            </View>
          </View>

          <View>
            <Title>Ders Saatleri</Title>
            {lessons
              .filter((lesson) => !!lesson)
              .map((lesson, index) => {
                return (
                  <View key={index} style={styles.lessonContainer}>
                    <MaterialDateTimeSelect
                      value={lesson.startDatetime}
                      label={'Başlangıç Tarihi'}
                      mode={'datetime'}
                      placeholder={'Başlagıç Tarihi'}
                      onChange={(value) =>
                        onLessonChange(index, 'startDatetime', value)
                      }
                    />
                    <MaterialDateTimeSelect
                      value={lesson.endDatetime}
                      label={'Bitiş Tarihi'}
                      mode={'datetime'}
                      placeholder={'Başlagıç Tarihi'}
                      onChange={(value) =>
                        onLessonChange(index, 'endDatetime', value)
                      }
                    />

                    <TouchableOpacity
                      onPress={() => removeLine(index)}
                      style={{
                        marginTop: 25,
                        marginLeft: 5,
                      }}>
                      <MaterialCommunityIcons
                        name={'minus-circle-outline'}
                        style={{
                          fontSize: 25,
                          color: '#f00',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>

          <View>
            <Button
              style={{
                marginTop: 20,
              }}
              onPress={() =>
                setLessons([
                  ...lessons,
                  {
                    ...createDefault(),
                  },
                ])
              }>
              Ders Saati Ekle
            </Button>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Button
            loading={loading}
            disabled={loading}
            onPress={onSave}
            style={{
              marginTop: 20,
              width: '95%',
            }}
            mode={'contained'}>
            Kaydet
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

let styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  lessonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
  },
};
