import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Button,
  Headline,
  TextInput,
} from 'react-native-paper';
import ErrorAlert from '../../components/ErrorAlert';
import prepareEmailByType from '../../helpers/email';

let errors = {
  'auth/email-already-in-use': 'E-posta adresi kullanımda',
  'auth/invalid-email': 'Geçersiz e-posta adresi',
  'auth/weak-password': 'Şifreniz çok zayıf!',
};

export default function RegisterScreen(props) {
  let [loading, setLoading] = useState(false);

  let [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  let [type, setType] = useState(1);
  let [error, setError] = useState(null);

  useEffect(() => {
    return auth().onAuthStateChanged((user) =>
      user
        ? props.navigation.push(
            type === 1 ? 'StudentRegisterDetail' : 'TeacherRegisterDetail',
          )
        : null,
    );
  }, []);

  let onChange = (key) => (value) => setFormData({...formData, [key]: value});

  let register = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(
        prepareEmailByType(formData.email, type),
        formData.password,
      );
    } catch (error) {
      setError(errors[error.code] || error.message);
    }

    setLoading(false);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <LinearGradient
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        colors={['#e75b82', '#ef7441']}
      />

      <View
        style={{
          borderRadius: 10,
          backgroundColor: '#fff',
          paddingVertical: 40,
          paddingHorizontal: 20,
          elevation: 10,
          alignSelf: 'center',
          width: '95%',
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Headline style={{marginBottom: 30}}>
            {type === 1 ? 'Öğrenci' : 'Öğretmen'} Kaydı Ol
          </Headline>
        </View>
        {error ? <ErrorAlert error={error} /> : null}

        <View
          style={{
            width: '100%',
            marginTop: 10,
          }}>
          <TextInput
            onChangeText={onChange('email')}
            label={'Email'}
            value={formData.email}
            autoCapitalize={'none'}
            placeholder={'E-posta adresinizi giriniz'}
          />
        </View>

        <View
          style={{
            width: '100%',
          }}>
          <TextInput
            onChangeText={onChange('password')}
            secureTextEntry
            label={'Şifre'}
            value={formData.password}
            placeholder={'Şifrenizi giriniz'}
          />
        </View>

        <Button
          disabled={loading}
          onPress={register}
          icon={'account'}
          style={styles.button}
          mode={'contained'}>
          Kayıt Ol
        </Button>

        {loading ? (
          <View
            style={{
              margin: 10,
            }}>
            <ActivityIndicator />
          </View>
        ) : null}

        <Button
          disabled={loading}
          onPress={() => props.navigation.push('Login')}
          style={styles.button}>
          Giriş Yap
        </Button>
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          ...styles.button,
        }}>
        <Button
          disabled={loading}
          icon={'account-box-multiple'}
          onPress={() => setType(type === 1 ? 2 : 1)}
          mode={'contained'}
          color={'#fff'}>
          {type === 1 ? 'Öğretmen Kaydı Yap' : 'Öğrenci Kaydı Yap'}
        </Button>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: 20,
  },
};
