import React, {useState, useEffect} from 'react';
import moment from 'moment';

import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {getUser} from '../../../../helpers/user';

export default function AddPostForm(props) {
  let [loading, setLoading] = useState(false);
  let [post, setPost] = useState({
    message: '',
  });

  let sendPost = async () => {
    setLoading(true);
    let user = await getUser();

    firestore()
      .collection('forum')
      .add({
        message: post.message,
        user: user,
        user_id: user.id,
        comment_count: 0,
        created_at: moment().format('YYYY-MM-DD hh:mm:ss'),
      });

    setLoading(false);
    props.hideForm();
  };

  return (
    <View
      style={{
        margin: 15,
      }}>
      <TextInput
        label="Yorumunuz"
        value={post.message}
        onChangeText={(text) =>
          setPost({
            ...post,
            message: text,
          })
        }
      />

      <View
        style={{
          marginTop: 10,
        }}>
        <Button loading={loading} onPress={sendPost} mode={'contained'}>
          Gönder
        </Button>
      </View>
    </View>
  );
}
