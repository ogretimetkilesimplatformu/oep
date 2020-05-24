import React from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import type {Question} from '../../../Student/Test/components/QuestionItem';

type Props = {
  saveQuestion: Function,
  question: Question,
};

let answerLetters = ['A', 'B', 'C', 'D', 'E'];

const NewQuestionItem = (props: Props) => {
  const {saveQuestion, question: questionBase} = props;
  const [question, setQuestion] = React.useState('');
  const [answers, setAnswers] = React.useState([
    {
      answer: 'A şıkkı cevabı',
      letter: 'A',
    },
  ]);

  let addNewOption = () => {
    let count = answers.length;

    let letter = answerLetters[count];

    setAnswers([
      ...answers,
      {
        letter,
        answer: letter + ' şıkkı cevabı',
      },
    ]);
  };

  React.useEffect(() => {
    setQuestion(questionBase);
  }, [questionBase]);

  let updateAnswerQuestion = (text, index) => {
    let localAnswers = [...answers];

    localAnswers[index] = text;

    setAnswers(localAnswers);
  };
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          marginHorizontal: 10,
        }}>
        <TextInput
          mode={'outlined'}
          style={{
            width: '100%',
          }}
          onChangeText={(text) => setQuestion(text)}
          value={question.question}
        />
      </View>

      <View
        style={{
          margin: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        }}>
        {answers.map((answer, index) => (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInput
              mode={'flat'}
              style={{
                width: '100%',
              }}
              onChangeText={(text) => updateAnswerQuestion(text, index)}
              value={answer.answer}
            />
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button onPress={addNewOption}>Şık Ekle</Button>

        <Button onPress={() => saveQuestion(question, answers)}>Kaydet</Button>
      </View>
    </View>
  );
};

export default NewQuestionItem;
