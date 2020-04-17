import React, {memo} from 'react';
import {View} from 'react-native';
import {Title} from 'react-native-paper';
import type {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheet';
import MaterialSelect from '../../../../components/MaterialSelect';

type Props = {
  children: React.ReactNode,
  label: string,
  style?: ViewStyle,
};

const ProfileItem = (props: Props) => {
  let {children, label, style} = props;
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
      <View>{children}</View>
    </View>
  );
};

export default memo(ProfileItem);
