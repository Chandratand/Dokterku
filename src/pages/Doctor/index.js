import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts} from '../../utils';
import {JSONCategoryDoctor} from '../../assets';

const Doctor = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <View style={styles.wrapperSection}>
          <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
          <Text style={styles.welcome}>
            Mau konsultasi dengan siapa hari ini?
          </Text>
        </View>
        <View style={styles.wrapperScroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.category}>
              <Gap width={32} />
              {JSONCategoryDoctor.data.map(item => {
                return (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor')}
                  />
                );
              })}
              <Gap width={22} />
            </View>
          </ScrollView>
        </View>
        <View style={styles.wrapperSection}>
          <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
          <RatedDoctor />
          <RatedDoctor />
          <RatedDoctor />
          <Text style={styles.sectionLabel}>Good News</Text>
        </View>
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </View>
    </ScrollView>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    paddingVertical: 30,
    backgroundColor: colors.white,
    flex: 1,
  },
  welcome: {
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    fontSize: 20,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    marginTop: 30,
    marginBottom: 16,
  },
});