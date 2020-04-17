import React from 'react';
import Alert from './Alert';

type Props = {
  warning: string,
};

function ErrorAlert(props: Props) {
  return (
    <Alert
      alert={props.warning}
      style={styles.alert}
      iconStyle={styles.icon}
      textStyle={styles.text}
    />
  );
}

const styles = {
  alert: {
    backgroundColor: '#f69b2c',
  },

  icon: {
    color: '#fff',
  },

  text: {
    color: '#fff',
  },
};

export default React.memo(ErrorAlert);
