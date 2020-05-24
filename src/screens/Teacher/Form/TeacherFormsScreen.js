import React from 'react';
import {View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button, Subheading} from 'react-native-paper';
import LessonFormItem from '../Lesson/components/LessonFormItem';
import FormItem from './components/FormItem';
import WarningAlert from '../../../components/WarningAlert';

const TeacherFormsScreen = (props) => {
  let [forms, setForms] = React.useState([]);
  let [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let fetchData = async () => {
      await firestore()
        .collection('forms')
        .onSnapshot((querySnapshot) => {
          let items = [];
          if (!querySnapshot.empty) {
            querySnapshot.docs.forEach((item) => {
              let data = {...item.data(), id: item.id};
              items.push(data);
            });
          }

          setForms(items);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  let renderItem = ({item}) => {
    return <FormItem form={item} goItem={() => null} />;
  };

  return (
    <View style={{flex: 1, margin: 10}}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        ListHeaderComponent={
          <View>
            <Subheading>Form Başlığı</Subheading>
          </View>
        }
        ListEmptyComponent={
          loading === false && (
            <View style={{margin: 10}}>
              <WarningAlert warning={'İçerik bulunamadı'} />
            </View>
          )
        }
        data={forms}
        renderItem={renderItem}
      />
      <Button
        style={{
          margin: 10,
        }}
        onPress={() => props.navigation.push('CreateLessonForm')}>
        Form Oluştur
      </Button>
    </View>
  );
};

export default TeacherFormsScreen;
