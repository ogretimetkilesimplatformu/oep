import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

const AnswerItem = ({letter, answer, isSelected}) => {
  return (
    <View
      style={{
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: isSelected ? '#e5e5e5' : 'white',
      }}>
      <View>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>{letter} ) </Text>
      </View>

      <Text style={{fontSize: 18}}>{answer}</Text>
    </View>
  );
};

export default AnswerItem;
