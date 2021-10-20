import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DummyUser, IconRemovePhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Profile = ({name, desc}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={DummyUser} style={styles.avatar} />
        <IconRemovePhoto style={styles.removePhoto} />
      </View>
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{desc} </Text>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderRadius: 130 / 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
  },
  profession: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2,
  },
  removePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});
