import React from 'react';
import {View, FlatList} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import NewQuestionItem from '../Lesson/components/NewQuestionItem';
import firestore from '@react-native-firebase/firestore';

const CreateLessonFormScreen = (props) => {
  let [title, setTitle] = React.useState('');
  let [loading, setLoading] = React.useState(false);
  let [questions, setQuestions] = React.useState([
    {
      question: 'Yeni Soru',
    },
  ]);

  let saveQuestion = (index) => (question, answers) => {
    let localQuestions = [...questions];

    localQuestions[index] = {question, answers};

    setQuestions(localQuestions);
  };

  let saveQuestions = async () => {
    setLoading(true);
    await firestore().collection('forms').add({
      title: title,
      questions: questions,
    });
    props.navigation.goBack();
    setLoading(false);
  };

  let renderItem = ({item, index}) => {
    return (
      <NewQuestionItem saveQuestion={saveQuestion(index)} question={item} />
    );
  };
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
            }}>
            <TextInput
              mode={'outlined'}
              label={'Form Başlığı'}
              onChangeText={(text) => setTitle(text)}
              style={{
                width: '100%',
              }}
            />
          </View>
        }
        keyExtractor={(_, index) => index}
        data={questions}
        renderItem={renderItem}
      />

      <View
        style={{
          margin: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button
          mode={'contained'}
          onPress={() =>
            setQuestions([
              ...questions,
              {
                question: 'Yeni soru',
              },
            ])
          }>
          Yeni Soru Ekle
        </Button>

        <Button
          disabled={loading}
          loading={loading}
          mode={'contained'}
          onPress={saveQuestions}>
          Kaydet
        </Button>
      </View>
    </View>
  );
};

export default CreateLessonFormScreen;
