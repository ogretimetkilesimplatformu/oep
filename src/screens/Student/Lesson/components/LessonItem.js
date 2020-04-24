import React, {useState, useEffect, memo} from 'react';
import {View} from 'react-native';
import {Subheading, Text, Title} from 'react-native-paper';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple/index';

export type TimeType = {
  startDatetime: string,
  endDatetime: string,
};

export type LessonType = {
  name: string,
  times: Array<TimeType>,
};

type Props = {
  lesson: LessonType,
  active: boolean,
  goItem: Function,
};

function LessonItem(props: Props) {
  let {
    lesson: {name, lesson_code},
  } = props;
  return (
    <TouchableRipple
      onPress={props.active ? props.goItem : null}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        opacity: props.active ? 1 : 0.6,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Title>{name}</Title>
        {props.teacher ? <Title>{lesson_code}</Title> : null}
      </View>
    </TouchableRipple>
  );
}

export default memo(LessonItem);
