import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../../components';
import {Fire} from '../../config';
import {colors, fonts, getData} from '../../utils';

const Messages = ({navigation}) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messagesDB = rootDB.child(urlHistory);

    messagesDB.on('value', async snapShot => {
      console.log('data History', snapShot.val());
      if (snapShot.val()) {
        const oldData = snapShot.val();
        const data = [];

        const promises = await Object.keys(oldData).map(async key => {
          const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
          const detailDoctor = await rootDB.child(urlUidDoctor).once('value');
          console.log('detail doctor', detailDoctor.val());

          data.push({
            id: key,
            detailDoctor: detailDoctor.val(),
            ...oldData[key],
          });
        });

        await Promise.all(promises);

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
    <View style={styles.page}>
      <Text style={styles.title}>Messages</Text>
      {historyChat.map(chat => {
        const dataDoctor = {
          id: chat.detailDoctor.uid,
          data: chat.detailDoctor,
        };
        return (
          <List
            key={chat.id}
            profile={{uri: chat.detailDoctor.photo}}
            name={chat.detailDoctor.fullName}
            desc={chat.lastContentChat}
            onPress={() => navigation.navigate('Chatting', dataDoctor)}
          />
        );
      })}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  title: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.primary,
    marginLeft: 16,
    marginTop: 30,
  },
});
