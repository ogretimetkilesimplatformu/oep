import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph, Chip} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import {navigate} from '../../../../navigations/RootNavigation';
import firestore from '@react-native-firebase/firestore';
import type {ForumType} from './ForumItem';

export type CommentType = {
  user: Object,
  message: string,
  id: string,
};

type Props = {
  forum: ForumType,
  comment: CommentType,
};

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

export default function Comment(props: Props) {
  let {
    comment: {user, comment, created_at},
  } = props;

  return (
    <Card>
      <Card.Title
        subtitle={created_at.toString()}
        left={LeftContent}
        title={user && user.name}
      />
      <Card.Content>
        <Paragraph>{comment}</Paragraph>
      </Card.Content>
    </Card>
  );
}
