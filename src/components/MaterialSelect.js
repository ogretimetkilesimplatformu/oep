import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

type Item = {
  label: string | number,
  value: number | string,
};

type Props = {
  value?: string | number,
  onChange: Function,
  items: Array<Item>,
  placeholder?: string,
  label?: string,
};

export default function MaterialSelect(props: Props) {
  let {value, onChange, items, placeholder, label} = props;

  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      {label ? (
        <Text
          style={{
            marginBottom: 2,
            fontSize: 12,
          }}>
          {label}
        </Text>
      ) : null}
      <RNPickerSelect
        value={value}
        placeholder={placeholder || 'Bir veri seçiniz'}
        onValueChange={onChange}
        items={items}
        style={pickerSelectStyles}
        doneText={'Tamam'}
        {...props}
      />
    </View>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'purple',
    borderRadius: 5,
    backgroundColor: '#efefef',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: 'purple',
    borderRadius: 5,
    backgroundColor: '#efefef',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
