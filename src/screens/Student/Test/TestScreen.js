import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {Button, Headline} from 'react-native-paper';
import {fetchForm, sendYourAnswers} from './fetch';
import type {Question} from './components/QuestionItem';
import QuestionItem from './components/QuestionItem';

export type Form = {
  title: string,
  questions: Array<Question>,
};

let renderItemCallback = (item, answers, answerQuestion, index) => {
  return (
    <QuestionItem
      index={index}
      question={item}
      answerQuestion={answerQuestion}
      givenAnswer={answers[index]}
    />
  );
};

const TestScreen = ({route, navigation}) => {
  let {
    params: {id, lesson},
  } = route;

  let [title, setTitle] = useState('');
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState({});
  let [loading, setLoading] = useState(false);

  let sendAnswers = async () => {
    setLoading(true);

    let yourAnswers = questions.map((question, index) => {
      return {
        question: question,
        answer: answers[index],
      };
    });
    try {
      await sendYourAnswers(lesson, yourAnswers);

      setLoading(false);

      navigation.goBack();
    } catch (error) {
      // do nothing
      console.log(error);

      setLoading(false);
    }
  };

  let answerQuestion = (index) => (answer) => {
    let selectedAnswer = answers[index];

    let giveAnswer = answer.letter;

    if (selectedAnswer && selectedAnswer === answer.letter) {
      giveAnswer = false;
    }

    setAnswers({
      ...answers,
      [index]: giveAnswer,
    });
  };

  useEffect(() => {
    fetchForm(id).then((data: Form | false) => {
      if (data) {
        setTitle(data.title);
        setQuestions(data.questions);
      }
    });
  }, []);

  let renderItem = useCallback(
    ({item, index}) =>
      renderItemCallback(item, answers, answerQuestion(index), index),
    [answers],
  );

  console.log(answers);

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        ListHeaderComponent={
          <View style={{padding: 15}}>
            <Headline>{title}</Headline>
          </View>
        }
        extraData={answers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        data={questions}
      />
      <Button
        loading={loading}
        disabled={loading}
        onPress={sendAnswers}
        mode={'contained'}
        style={{
          margin: 10,
        }}>
        Cevapları Gönder
      </Button>
    </View>
  );
};

export default TestScreen;
