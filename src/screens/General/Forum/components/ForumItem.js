import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph, Chip} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import {navigate} from '../../../../navigations/RootNavigation';
import firestore from '@react-native-firebase/firestore';

export type ForumType = {
  user: Object,
  message: string,
  comment_count: number,
  id: string,
  like_count: number,
};

type Props = {
  forum: ForumType,
  noComment?: boolean,
};

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

export default function ForumItem(props: Props) {
  let {
    noComment,
    forum: {id, image, user, message, comment_count, created_at},
  } = props;

  return (
    <Card
      style={{
        marginTop: 15,
      }}>
      <Card.Title
        left={LeftContent}
        title={user.name}
        subtitle={created_at.toString()}
      />
      {image ? <Card.Cover source={{uri: image}} /> : null}
      <Card.Content>
        <Paragraph>{message}</Paragraph>
      </Card.Content>
      <Card.Actions>
        {noComment ? null : (
          <Chip
            onPress={() =>
              navigate('Comments', {
                forum: props.forum,
              })
            }
            icon={'comment'}>
            Yorum {comment_count}
          </Chip>
        )}
      </Card.Actions>
    </Card>
  );
}
