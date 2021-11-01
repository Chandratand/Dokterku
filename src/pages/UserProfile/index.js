import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {Gap, Header, List, Profile} from '../../components';
import {Fire} from '../../config';
import {colors, getData, showError} from '../../utils';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });
  useEffect(() => {
    getData('user').then(res => {
      console.log('user profile: ', res);
      const data = res;
      data.photo = {uri: res.photo};

      setProfile(data);
    });
  }, []);

  const signOut = () => {
    Fire.auth()
      .signOut()
      .then(() => {
        console.log('success signOut');
        navigation.replace('GetStarted');
      })
      .catch(err => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          photo={profile.photo}
          name={profile.fullName}
          desc={profile.profession}
        />
      )}

      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Upadate Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Last Upadate Yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        desc="Last Upadate Yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Sign Out"
        desc="Last Upadate Yesterday"
        type="next"
        icon="help"
        onPress={signOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
});
