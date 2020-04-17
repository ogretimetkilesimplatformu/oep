import React, {memo} from 'react';
import {View} from 'react-native';
import {Title} from 'react-native-paper';
import type {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  value: string,
  label: string,
  style?: ViewStyle,
};

const ProfileItem = (props: Props) => {
  let {value, label, style} = props;
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 5,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        },
        style,
      ]}>
      <Title>{label}</Title>
      <Title>{value}</Title>
    </View>
  );
};

export default memo(ProfileItem);
