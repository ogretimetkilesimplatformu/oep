import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {getUser, logout} from '../../../helpers/user';
import auth from '@react-native-firebase/auth';
import {Image} from 'react-native-paper/src/components/Avatar/Avatar';
import {Button, Card, Chip, Divider, Headline, Title} from 'react-native-paper';
import ProfileItem from './components/ProfileItem';

let items = [
  {
    key: 'city',
    label: 'İl',
  },
  {
    key: 'county',
    label: 'İlçe',
  },
  {
    key: 'school_name',
    label: 'Okul Adı',
  },
  {
    key: 'grade',
    label: 'Sınıf',
  },
];

export default function ProfileScreen({navigation}) {
  let [user, setUser] = useState({});

  useEffect(() => {
    let fetchUser = async () => {
      let userDetails = await getUser();
      let currentUser = auth().currentUser;

      setUser({
        ...userDetails,
        ...currentUser,
      });
    };

    return navigation.addListener('focus', () => {
      fetchUser();
    });
  }, []);
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

          <Headline
            style={{
              textAlign: 'center',
            }}>
            {user.name}
          </Headline>
          <Divider />
        </Card.Content>
      </Card>

      <Card
        style={{
          marginTop: 15,
        }}>
        <Card.Content>
          {items.map((item, index) => (
            <ProfileItem
              style={index === items.length - 1 ? {borderBottomWidth: 0} : null}
              label={item.label}
              value={user[item.key]}
            />
          ))}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Chip
              onPress={() => navigation.push('EditProfile')}
              icon={'pencil'}
              mode={'outlined'}>
              Düzenle
            </Chip>
          </View>
        </Card.Content>
      </Card>

      <View
        style={{
          margin: 15,
        }}>
        <Button
          onPress={async () => {
            await logout();

            navigation.push('Login');
          }}
          mode={'contained'}
          style={{
            marginTop: 15,
          }}>
          Çıkış Yap
        </Button>
      </View>
    </ScrollView>
  );
}
