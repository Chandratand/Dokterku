import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {Fire} from '../../config';
import {colors, getData, showError, storeData} from '../../utils';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      console.log('res', res);
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const update = () => {
    console.log('profile: ', profile);
    updateProfileData();
    navigation.replace('MainApp');

    console.log('new Password : ', password);

    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password Kurang dari 6 Karakter');
      } else {
        //update Password
        updatePassword();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  const updatePassword = () => {
    Fire.auth().onAuthStateChanged(user => {
      if (user) {
        //update password
        user.updatePassword(password).catch(err => {
          showError(err.message);
        });
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;

    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        console.log('success : ', data);
        storeData('user', data);
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true},
      response => {
        console.log('response : ', response);
        if (response.didCancel || response.error) {
          showError('Ooppss anda tidak memilih fotonya');
        } else {
          console.log('response getImage: ', response);

          const source = {uri: response.assets[0].uri};
          setPhotoForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
          setPhoto(source);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile photo={photo} isRemove onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {padding: 40, paddingTop: 0},
});
