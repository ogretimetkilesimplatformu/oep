import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';

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

  console.log(items);
  return (
    <View
      style={{
        marginVertical: 10,
        borderBottomWidth: Platform.OS === 'android' ? 1 : 0,
        borderBottomColor: '#ccc',
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
      {Platform.OS === 'ios' ? (
        <RNPickerSelect
          value={value}
          placeholder={placeholder || 'Bir veri seçiniz'}
          onValueChange={onChange}
          label={label}
          items={items.map((item) => ({
            label: item.label || '',
            value: item.value || item.label || '',
          }))}
          style={pickerSelectStyles}
          doneText={'Tamam'}
          {...props}
        />
      ) : (
        <Picker
          prompt={label}
          selectedValue={value}
          style={{
            height: 50,
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          onValueChange={onChange}>
          {items.map((item) => (
            <Picker.Item label={item.label} value={item.value} />
          ))}
        </Picker>
      )}
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
