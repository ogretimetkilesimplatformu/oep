import React from 'react';
import type {InformatioType} from '../../../components/Information';
import firestore from '@react-native-firebase/firestore';
import {FlatList, View, KeyboardAvoidingView, Platform} from 'react-native';
import Comment from './components/Comment';
import {ActivityIndicator, Button, Chip, Headline} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import type {ForumType} from './components/ForumItem';
import ForumItem from './components/ForumItem';
import Alert from '../../../components/Alert';
import {getUser} from '../../../helpers/user';
import moment from 'moment';

type Props = {
  forum: ForumType,
};

export default function CommentsScreen(props: Props) {
  let {
    route: {
      params: {forum},
    },
  } = props;

  let [loading, setLoading] = React.useState(true);
  let [comments, setComments] = React.useState([]);

  let [comment, setComment] = React.useState({
    forum_id: forum.id,
    name: '',
    comment: '',
  });
  let [showAddCommentForm, setShowAddCommentForm] = React.useState(false);

  const addComment = async () => {
    let user = await getUser();
    setLoading(true);

    await firestore()
      .collection('comments')
      .add({
        ...comment,
        created_at: moment().format('YYYY-MM-DD hh:mm:ss'),

        user: user,
      });

    setShowAddCommentForm(false);
    setComment('');
    setLoading(false);

    await firestore()
      .collection('forum')
      .doc(comment.forum_id)
      .update({
        comment_count: forum.comment_count + 1,
      });
  };

  const renderComment = ({item}) => {
    console.log(item);

    return <Comment forum={forum} comment={item} />;
  };

  React.useEffect(() => {
    return firestore()
      .collection('comments')
      .where('forum_id', '==', forum.id)
      .onSnapshot((query) => {
        let comments = [];

        query.docs.forEach((item) => {
          if (item.exists) {
            comments.push({
              ...item.data(),
              id: item.id,
            });
          }
        });

        setComments(comments);
        setLoading(false);
      });
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        padding: 15,
      }}>
      <Headline>Gönderi</Headline>
      <ForumItem noComment forum={forum} />

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            ListHeaderComponent={
              <Headline
                style={{
                  marginTop: 10,
                }}>
                Yorumlar
              </Headline>
            }
            ListEmptyComponent={
              loading ? null : <Alert alert={'Yorum Buluanamadı'} />
            }
            keyExtractor={(item) => item.id}
            renderItem={renderComment}
            data={comments}
          />

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Chip
              onPress={() => setShowAddCommentForm(!showAddCommentForm)}
              icon={'comment-outline'}>
              {showAddCommentForm ? 'Formu Gizle' : 'Yorum Ekle'}
            </Chip>
          </View>

          {showAddCommentForm ? (
            <View
              style={{
                marginBottom: 25,
              }}>
              <TextInput
                label="Yorumunuz"
                value={comment.comment}
                onChangeText={(text) =>
                  setComment({
                    ...comment,
                    comment: text,
                  })
                }
              />

              <View
                style={{
                  marginTop: 10,
                }}>
                <Button
                  loading={loading}
                  onPress={addComment}
                  mode={'contained'}>
                  {' '}
                  Gönder
                </Button>
              </View>
            </View>
          ) : null}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
