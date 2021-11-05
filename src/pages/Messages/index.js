import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DummyDoctor4, DummyDoctor5, DummyDoctor6} from '../../assets';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {Fire} from '../../config';

const Messages = ({navigation}) => {
  const [doctors] = useState([
    {
      id: 1,
      profile: DummyDoctor4,
      name: 'Alexander Jannie',
      desc: 'Baik ibu, terima kasih banyak atas wakt...',
    },
    {
      id: 2,
      profile: DummyDoctor5,
      name: 'Nairobi Putri Hayza',
      desc: 'Oh tentu saja tidak karena jeruk it...',
    },
    {
      id: 3,
      profile: DummyDoctor6,
      name: 'John McParker Steve',
      desc: 'Oke menurut pak dokter bagaimana unt...',
    },
  ]);
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const urlHistory = `messages/${user.uid}/`;
    Fire.database()
      .ref(urlHistory)
      .on('value', snapShot => {
        console.log('data History', snapShot.val());
        if (snapShot.val()) {
          const oldData = snapShot.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              ...oldData[key],
            });
          });
          console.log('new Data History : ', data);
          setHistoryChat(data);
        }
      });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };
  return (
    <View>
      <Text style={styles.title}>Messages</Text>
      {historyChat.map(chat => {
        return (
          <List
            key={chat.id}
            profile={chat.uidPartner}
            name={chat.uidPartner}
            desc={chat.lastContentChat}
            onPress={() => navigation.navigate('Chatting')}
          />
        );
      })}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.primary,
    marginLeft: 16,
    marginTop: 30,
  },
});
