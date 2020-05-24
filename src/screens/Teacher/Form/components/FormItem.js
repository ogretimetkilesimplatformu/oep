import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Title} from 'react-native-paper';

const FormItem = ({form, goItem}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        elevation: 7,
        shadowColor: '#ccc',
      }}
      onPress={goItem}>
      <Title>{form.title}</Title>
    </TouchableOpacity>
  );
};

export default FormItem;
