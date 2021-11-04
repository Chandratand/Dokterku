import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {Fire} from '../../config';
import {colors, fonts, showError} from '../../utils';

const Doctor = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctor();
    getNews();
  }, []);

  const getTopRatedDoctor = () => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then(res => {
        console.log('top rated doctors: ', res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          console.log('data hasil parse', data);
          setDoctors(data);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getCategoryDoctor = () => {
    Fire.database()
      .ref('category_doctor/')
      .once('value')
      .then(res => {
        console.log('category doctor: ', res.val());
        if (res.val()) {
          setCategoryDoctor(res.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };
  const getNews = () => {
    Fire.database()
      .ref('news/')
      .once('value')
      .then(res => {
        console.log('data', res.val());
        if (res.val()) {
          setNews(res.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

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
              {categoryDoctor.map(item => {
                return (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor', item)}
                  />
                );
              })}
              <Gap width={22} />
            </View>
          </ScrollView>
        </View>
        <View style={styles.wrapperSection}>
          <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
          {doctors.map(doctor => {
            return (
              <RatedDoctor
                key={doctor.id}
                name={doctor.data.fullName}
                desc={doctor.data.profession}
                avatar={{uri: doctor.data.photo}}
                onPress={() => navigation.navigate('DoctorProfile', doctor)}
              />
            );
          })}

          <Text style={styles.sectionLabel}>Good News</Text>
        </View>
        {news.map(item => {
          return (
            <NewsItem
              title={item.title}
              date={item.date}
              image={item.image}
              key={item.id}
            />
          );
        })}
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
