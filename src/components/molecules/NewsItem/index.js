import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DummyNews1} from '../../../assets';
import {colors, fonts} from '../../../utils';

const NewsItem = ({title, date, image}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image source={{uri: image}} style={styles.image} />
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  titleWrapper: {flex: 1},
  title: {
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    fontSize: 16,
    maxWidth: '90%',
  },
  date: {
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    fontSize: 12,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
  },
});
