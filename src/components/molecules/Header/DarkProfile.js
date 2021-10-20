import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Button} from '../..';
import {DummyDoctor9} from '../../../assets';
import {colors, fonts} from '../../../utils';

const DarkProfile = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>Nairobi Putri Hayza</Text>
        <Text style={styles.desc}>Doctor Anak</Text>
      </View>
      <Image source={DummyDoctor9} style={styles.avatar} />
    </View>
  );
};

export default DarkProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontFamily: fonts.primary.normal,
    fontSize: 14,
    color: colors.text.subTitle,
    textAlign: 'center',
    marginTop: 6,
  },
});
