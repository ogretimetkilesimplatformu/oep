import React from 'react';
import {View} from 'react-native';
import {Paragraph} from 'react-native-paper';
import type {
  TextStyle,
  ViewStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  alert: string,
  style?: ViewStyle,
  textStyle?: TextStyle,
  iconStyle?: TextStyle,
};

function Alert(props: Props) {
  return (
    <View style={[styles.alert, props.style]}>
      <MaterialCommunityIcons
        name={'alert'}
        style={[styles.icon, props.iconStyle]}
      />
      <Paragraph style={[styles.text, props.textStyle]}>
        {props.alert}
      </Paragraph>
    </View>
  );
}

const styles = {
  text: {
    fontSize: 15,
  },
  alert: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    marginVertical: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  icon: {
    marginRight: 10,
    fontSize: 24,
    color: '#000',
  },
};

export default React.memo(Alert);
