import React from 'react';
import Alert from './Alert';

type Props = {
  error: string,
};

function ErrorAlert(props: Props) {
  return (
    <Alert
      alert={props.error}
      style={styles.alert}
      iconStyle={styles.icon}
      textStyle={styles.text}
    />
  );
}

const styles = {
  alert: {
    backgroundColor: '#f85959',
  },

  icon: {
    color: '#fff',
  },

  text: {
    color: '#fff',
  },
};

export default React.memo(ErrorAlert);
