import React from 'react';

import DatePicker from 'react-native-datepicker';
import {View} from 'react-native';
import moment from 'moment';
import {Paragraph} from 'react-native-paper';

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

  let minDate = props.minDate || moment().subtract(10, 'years');
  let maxDate = props.maxDate || moment().add(10, 'years');

  return (
    <View>
      {props.label ? (
        <Paragraph
          style={{
            marginBottom: 2,
            fontSize: 12,
          }}>
          {props.label}
        </Paragraph>
      ) : null}
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
    </View>
  );
}
