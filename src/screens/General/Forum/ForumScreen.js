import React from 'react';
import {View, FlatList, KeyboardAvoidingView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ForumItem from './components/ForumItem';
import {ActivityIndicator, Button, Chip, TextInput} from 'react-native-paper';
import AddPostForm from './components/AddPostForm';
import {getUser, logout} from '../../../helpers/user';

let forumItems = firestore().collection('forum');

export default function ForumScreen(props) {
  let [loading, setLoading] = React.useState(true);
  let [items, setItems] = React.useState([]);
  let [showAddCommentForm, setShowAddCommentForm] = React.useState(false);

  let renderForumItem = ({item}) => <ForumItem forum={item} />;

  React.useEffect(() => {
    //logout();
    return firestore()
      .collection('forum')
      .onSnapshot((querySnapshot) => {
        let list = [];

        querySnapshot.forEach((item) => {
          list.push({
            ...item.data(),
            id: item.id,
          });
        });

        setItems(list);

        setLoading(false);
      });
  }, []);

  return (
    <KeyboardAvoidingView
      enabled
      keyboardVerticalOffset={75}
      behavior={'padding'}
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          padding: 15,
          paddingBottom: 30,
        }}>
        {loading ? (
          <ActivityIndicator
            style={{
              marginTop: 20,
              alignItems: 'center',
            }}
          />
        ) : null}
        <FlatList
          keyExtractor={(item) => item.id}
          data={items}
          renderItem={renderForumItem}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Chip
            onPress={() => setShowAddCommentForm(!showAddCommentForm)}
            mode={'outlined'}
            icon={'pen'}>
            {showAddCommentForm ? 'Formu Gizle' : 'Gönderi Oluştur'}
          </Chip>
        </View>

        {showAddCommentForm ? (
          <AddPostForm hideForm={() => setShowAddCommentForm(false)} />
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}
