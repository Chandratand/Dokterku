import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap} from '../..';
import {colors, fonts} from '../../../utils';

const Header = ({title, onPress, type}) => {
  return (
    <View style={styles.container(type)}>
      <Button
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: type => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  text: type => ({
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.primary.normal,
    fontSize: 20,
    color: type === 'dark' ? colors.white : colors.text.primary,
  }),
});
