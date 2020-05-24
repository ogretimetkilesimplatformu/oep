import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {fetchLessonAnswers} from './fetch';
import CenteredLoading from '../../../components/CenteredLoading';
import LessonFormItem from './components/LessonFormItem';
import {Subheading} from 'react-native-paper';

const LessonFormAnswersScreen = (props) => {
  let {
    route: {
      params: {lesson},
    },
  } = props;

  let [answers, setAnswers] = useState([]);

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessonAnswers(lesson.id).then((response) => {
      setLoading(false);

      setAnswers(response);
    });
  }, []);

  let goItem = (item) => () => {
    props.navigation.push('LessonFormAnswerDetails', {item});
  };

  let renderItem = ({item}) => (
    <LessonFormItem
      user={item.user}
      seeAnswerDetails={goItem(item)}
      item={item}
      lesson={item.lesson}
    />
  );

  if (loading) {
    return <CenteredLoading />;
  }

  return (
    <View style={{flex: 1, padding: 15}}>
      <FlatList
        data={answers}
        renderItem={renderItem}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Subheading>Öğrenci Adı</Subheading>
            <Subheading>Oluşturulma Tarihi</Subheading>
          </View>
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default LessonFormAnswersScreen;
