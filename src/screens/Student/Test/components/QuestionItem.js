import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Title} from 'react-native-paper';
import AnswerItem from './AnswerItem';

type Answer = {
  answer: string,
  type: 'multiple',
  letter: string,
};

export type Question = {
  question: string,
  answers: Array<Answer>,
};

type Props = {
  question: Question,
  answerQuestion: Function,
  givenAnswer?: string,
  index: number,
};

const QuestionItem = (props: Props) => {
  let {
    question: {answers, question},
    answerQuestion,
    givenAnswer,
    index,
  } = props;

  return (
    <View
      style={{
        paddingVertical: 30,
        paddingHorizontal: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Title>Soru {index + 1} )</Title>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
          }}>
          {question}
        </Text>
      </View>

      {answers.map(({answer, letter}) => (
        <TouchableOpacity
          key={letter}
          onPress={() => answerQuestion({answer, letter})}>
          <AnswerItem
            answer={answer}
            letter={letter}
            isSelected={letter === givenAnswer}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuestionItem;
