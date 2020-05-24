import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Title, Text} from 'react-native-paper';

const LessonFormItem = ({user, lesson, item, seeAnswerDetails}) => {
  return (
    <TouchableOpacity
      onPress={seeAnswerDetails}
      style={{
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Title>{user.name}</Title>
        <Text>{item.created_at && item.created_at}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LessonFormItem;
