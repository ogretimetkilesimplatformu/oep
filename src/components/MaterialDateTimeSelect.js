import React from 'react';

import DatePicker from 'react-native-datepicker';
import {View, Platform, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {Paragraph, Text, TextInput} from 'react-native-paper';
import RNDatetimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  value: string,
  mode: string,
  placeholder: string,
  label?: string,
  minDate?: moment.Moment,
  maxDate?: moment.Moment,
  onChange: Function,
};

export let formats = {
  datetime: 'YYYY-MM-DD hh:mm',
  date: 'YYYY-MM-DD',
  time: 'hh:mm',
};

export default function MaterialDateTimeSelect(props: Props) {
  let format = formats[props.mode];
  const [mode, setMode] = React.useState('date');
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  let onChange = (value) => {
    if (mode === 'time') {
      hideDatePicker();
    }
    setMode(mode === 'date' ? 'time' : 'date');

    props.onChange(value);
  };

  let minDate = props.minDate || moment().subtract(10, 'years');
  let maxDate = props.maxDate || moment().add(10, 'years');

  console.log(mode);

  return (
    <View>
      {props.label ? (
        <Paragraph
          style={{
            textAlign: 'center',
            marginBottom: 2,
            fontSize: 12,
          }}>
          {props.label}
        </Paragraph>
      ) : null}
      {Platform.OS === 'android' ? (
        <View>
          <TouchableOpacity onPress={showDatePicker}>
            <Text
              style={{
                fontSize: 12,
                color: '#565656',
              }}>
              {props.value
                ? moment(props.value).format(formats.datetime)
                : props.placeholder || props.label}
            </Text>

            {isDatePickerVisible ? (
              <RNDateTimePicker
                mode={mode}
                value={props.value || new Date()}
                placeholder={' '}
                is24Hour
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                minimumDate={minDate.toDate()}
                maximumDate={maxDate.toDate()}
                onChange={(_, date) => onChange(date)}
              />
            ) : null}
          </TouchableOpacity>
        </View>
      ) : (
        <DatePicker
          date={props.value}
          mode="datetime"
          placeholder="Ders başlangıç saati"
          format={format}
          is24Hour
          minDate={minDate.format(format)}
          maxDate={maxDate.format(format)}
          confirmBtnText="Tamam"
          cancelBtnText="İptal"
          showIcon={false}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              backgroundColor: '#efefef',
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              placeholderColor: '#000',
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={props.onChange}
        />
      )}
    </View>
  );
}
