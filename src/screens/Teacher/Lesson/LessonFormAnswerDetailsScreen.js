import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {Button, Headline} from 'react-native-paper';
import QuestionItem from '../../Student/Test/components/QuestionItem';
import type {Question} from '../../Student/Test/components/QuestionItem';

export type Form = {
  title: string,
  questions: Array<Question>,
};

let renderItemCallback = (item, index) => {
  return (
    <QuestionItem
      index={index}
      question={item.question}
      givenAnswer={item.answer}
      answerQuestion={() => null}
    />
  );
};

const LessonFormAnswerDetailsScreen = ({route, navigation}) => {
  let {
    params: {item},
  } = route;

  let renderItem = useCallback(
    ({item, index}) => renderItemCallback(item, index),
    [item.answers],
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        ListHeaderComponent={
          <View style={{padding: 15}}>
            <Headline>{item.lesson.name}</Headline>
          </View>
        }
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        data={item.answers}
      />
    </View>
  );
};

export default LessonFormAnswerDetailsScreen;
