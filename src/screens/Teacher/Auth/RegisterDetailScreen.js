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
} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import MaterialSelect from '../../../components/MaterialSelect';
import ErrorAlert from '../../../components/ErrorAlert';
import {setUser} from '../../../helpers/user';
import {
  fetchSelectData,
  getCities,
  getCounties,
} from '../../../helpers/city_county';

let schoolName = [
  {
    value: 'Ondokuz Mayıs',
    label: 'Ondokuz Mayıs',
  },
];

let grades = [1, 2, 3, 4, 5, 6, 7, 8];

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

  let onChange = (key) => (value) => setFormData({...formData, [key]: value});

  let register = async () => {
    setLoading(true);

    try {
      const user = auth().currentUser;

      let data = {
        ...formData,
        id: user.uid,
        type: 2,
      };

      firestore().collection('users').add(data);
      await setUser(data);

      props.navigation.push('Panel', {
        screen: 'Teacher',
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
          <Headline style={{marginBottom: 30}}>Bilgilerinizi Giriniz</Headline>
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
          label={'Görev Yaptığınız İl'}
          items={selectData.cities}
          value={formData.city}
        />

        <MaterialSelect
          onChange={onChange('county')}
          label={'Görev Yaptığınız İlçe'}
          items={selectData.counties}
          value={formData.county}
        />

        <MaterialSelect
          onChange={onChange('school_name')}
          label={'Görev Yaptığınız Okul'}
          items={schoolName}
          value={formData.school_name}
        />

        <MaterialSelect
          onChange={onChange('grade')}
          label={'Sorumlu Olduğunuz Sınıf'}
          items={grades.map((item) => ({
            label: item.toString(),
            value: item.toString(),
          }))}
          value={formData.grade}
        />

        <Button
          onPress={register}
          icon={'account'}
          loading={loading}
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
