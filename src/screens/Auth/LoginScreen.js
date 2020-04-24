import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
import {
  ActivityIndicator,
  Button,
  Headline,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import prepareEmailByType from '../../helpers/email';
import Alert from '../../components/Alert';
import ErrorAlert from '../../components/ErrorAlert';
import {logout, setUser} from '../../helpers/user';

export default function LoginScreen(props) {
  let [loading, setLoading] = useState(false);
  let [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  let [type, setType] = useState(1);

  let [error, setError] = useState(null);

  let login = async () => {
    setLoading(true);
    try {
      let email = formData.email;

      let user = await auth().signInWithEmailAndPassword(
        prepareEmailByType(email, type),
        formData.password,
      );

      if (!user) {
        setError('Giriş Başarısız, bilgilerinizi kontrol ediniz');
        return;
      }

      let userFetch = await firestore()
        .collection('users')
        .where('id', '==', user.user.uid)
        .get();

      if (!userFetch.empty) {
        let userDetails = userFetch.docs[0].data();

        await setUser({...userDetails});

        console.log(type);

        props.navigation.push('Panel', {
          screen: type === 1 ? 'Student' : 'Teacher',
        });
      } else {
        props.navigation.push(
          type === 1 ? 'StudentRegisterDetail' : 'TeacherRegisterDetail',
        );
      }
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Geçersiz e-posta adresi');
      } else if (error.code === 'auth/user-not-found') {
        setError('Kullanıcı Bulunamadı');
      } else {
        setError(error.message);
      }
    }

    setLoading(false);
  };

  let onChange = (key) => (value) => setFormData({...formData, [key]: value});

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
        colors={['#aa00ff', '#e040fb']}
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
            {type === 1 ? 'Öğrenci Girişi' : 'Öğretmen Girişi'}
          </Headline>
        </View>

        {error ? <ErrorAlert error={error} /> : null}

        <View
          style={{
            width: '100%',
          }}>
          <TextInput
            onChangeText={onChange('email')}
            label={'Email'}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoCompleteType={'email'}
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
            autoCompleteType={'password'}
            autoCorrect={false}
            label={'Şifre'}
            placeholder={'Şifrenizi giriniz'}
          />
        </View>

        <Button
          loading={loading}
          disabled={loading}
          onPress={login}
          icon={'account'}
          style={styles.button}
          mode={'contained'}>
          Giriş Yap
        </Button>

        <Button
          disabled={loading}
          onPress={() => props.navigation.push('Register')}
          style={styles.button}>
          Kayıt Ol
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
          {type === 1 ? 'Öğretmen Girişi Yap' : 'Öğrenci Girişi Yap'}
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
