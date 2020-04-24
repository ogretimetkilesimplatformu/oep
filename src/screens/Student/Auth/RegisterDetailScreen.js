import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Button,
  Headline,
  TextInput,
  Title,
} from 'react-native-paper';
import MaterialSelect from '../../../components/MaterialSelect';
import ErrorAlert from '../../../components/ErrorAlert';
import {setUser} from '../../../helpers/user';
import {fetchSelectData, filterCounties} from '../../../helpers/city_county';

export default function RegisterDetailScreen(props) {
  let [loading, setLoading] = useState(false);
  let [formData, setFormData] = useState({});
  let [error, setError] = useState(null);
  let [selectData, setSelectData] = useState({
    cities: [],
    counties: [],
    schoolNames: [],
    grades: [],
  });
  let onChange = (key) => (value) => {
    console.log(key, value);
    setFormData({...formData, [key]: value});
  };

  useEffect(() => {
    let fetchOther = async () => {
      let other = await fetchSelectData();

      setSelectData({
        ...selectData,
        ...other,
      });
    };

    fetchOther();
  }, []);
  let register = async () => {
    setLoading(true);

    try {
      const user = auth().currentUser;

      let data = {
        ...formData,
        id: user.uid,
        type: 1,
      };
      await firestore().collection('users').add(data);

      await setUser(data);

      props.navigation.push('Panel', {
        screen: 'Student',
      });
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
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
          <Title style={{marginBottom: 30}}>
            Öğrenci Bilgilerinizi Giriniz
          </Title>
        </View>
        {error ? <ErrorAlert error={error} /> : null}

        <View
          style={{
            marginVertical: 10,
          }}>
          <TextInput
            onChangeText={onChange('name')}
            placeholder={'Lütfen  adınızı giriniz'}
            label={'Adınız'}
            mode={'outlined'}
            value={formData.firstname}
          />
        </View>

        <MaterialSelect
          onChange={onChange('city')}
          placeholder={'Lütfen il seçiniz'}
          label={'İl'}
          value={formData.city}
          items={selectData.cities}
        />

        <MaterialSelect
          onChange={onChange('county')}
          placeholder={'Lütfen ilçe seçiniz'}
          label={'İlçe'}
          items={
            formData.city
              ? filterCounties(selectData.counties, formData.city)
              : []
          }
          value={formData.county}
        />

        <MaterialSelect
          onChange={onChange('school_name')}
          placeholder={'Lütfen okul seçiniz'}
          label={'Okul adı'}
          items={selectData.schoolNames}
          value={formData.school_name}
        />

        <MaterialSelect
          onChange={onChange('grade')}
          placeholder={'Lütfen sınıfınızı seçiniz'}
          label={'Sınıfınız'}
          items={selectData.grades}
          value={formData.grade}
        />
        {loading ? (
          <View
            style={{
              margin: 10,
            }}>
            <ActivityIndicator />
          </View>
        ) : null}

        <Button
          onPress={register}
          icon={'account'}
          style={styles.button}
          mode={'contained'}>
          Kaydı Tamamla
        </Button>
      </View>
    </KeyboardAvoidingView>
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
