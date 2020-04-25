import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {Button, Card, Chip, Divider, Headline, Title} from 'react-native-paper';
import {Image} from 'react-native-paper/src/components/Avatar/Avatar';
import {getUser, setUser as setBaseUser} from '../../../helpers/user';
import MaterialSelect from '../../../components/MaterialSelect';
import ProfileEditItem from './components/ProfileEditItem';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {fetchSelectData, filterCounties} from '../../../helpers/city_county';

const EditProfileScreen = ({navigation}) => {
  let [loading, setLoading] = useState(false);
  let [user, setUser] = useState({});
  let onChange = (key) => (value) => setUser({...user, [key]: value});
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

    let fetchUser = async () => {
      let userDetails = await getUser();

      setUser({
        ...userDetails,
      });
    };

    return navigation.addListener('focus', () => {
      fetchUser();
      fetchOther();
    });
  }, []);

  const onSave = async () => {
    setLoading(true);

    let authUser = auth().currentUser;

    let docs = await firestore()
      .collection('users')
      .where('id', '==', authUser.uid)
      .get();

    if (!docs.empty) {
      docs.docs.forEach((doc) => doc.ref.update(user));
      await setBaseUser(user);
    }

    setLoading(false);
    navigation.goBack();
  };

  console.log(selectData);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <Card>
        <Card.Content
          style={{
            alignItems: 'center',
          }}>
          <Image
            size={140}
            source={{
              uri:
                user.profile_image ||
                'https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Chip icon={'image'} mode={'outlined'}>
              Profil Resmini Güncelle
            </Chip>
          </View>
        </Card.Content>
      </Card>

      <Card
        style={{
          marginTop: 15,
        }}>
        <Card.Content
          style={{
            padding: 15,
          }}>
          <ProfileEditItem label={'İl'}>
            <MaterialSelect
              onChange={onChange('city')}
              value={user.city}
              items={selectData.cities}
            />
          </ProfileEditItem>

          <ProfileEditItem label={'İlçe'}>
            <MaterialSelect
              onChange={onChange('county')}
              value={user.county}
              items={
                user.city ? filterCounties(selectData.counties, user.city) : []
              }
            />
          </ProfileEditItem>

          <ProfileEditItem label={'Okul'}>
            <MaterialSelect
              onChange={onChange('school_name')}
              value={user.school_name}
              items={selectData.schoolNames}
            />
          </ProfileEditItem>
          <ProfileEditItem label={'Sınıf'}>
            <MaterialSelect
              onChange={onChange('grade')}
              value={user.grade}
              items={selectData.grades}
            />
          </ProfileEditItem>

          <Button
            loading={loading}
            disabled={loading}
            onPress={onSave}
            mode={'contained'}
            style={{
              marginTop: 15,
            }}>
            Kaydet
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default EditProfileScreen;
