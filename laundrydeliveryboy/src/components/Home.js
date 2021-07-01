import React from 'react';
import {StyleSheet, Image, View, Text, ImageBackground, Pressable} from 'react-native';
import AnimatedScrollView from './AnimatedScrollView';
import {COLORS, SIZES, FONTS} from '../configs/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {delivery} from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { homeData } from '../services/auth-service';

const Home = ({navigation}) => {
  const [total_order, setBookings] = React.useState([]);
  

  React.useEffect(() => {
    AsyncStorage.getItem('userInfo').then((data) => {
       homeData(JSON.parse(data).id).then((res) => {
        setBookings(res.total_order[0].total_order);
      });
    })
    }, []);


  return (
    <AnimatedScrollView style={styles.container}>
      <View style={styles.imagecard}>
        <View style={styles.header}>
          <View style={{flex: 1}}>
            <Text style={[FONTS.h2, {color: COLORS.white}]}>Dashboard</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {/* <Entypo name="bell" size={20} color={COLORS.white} /> */}
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.imagebox}>
          <Image
            source={{
              uri:
                'https://img.dtnext.in/Articles/2020/May/202005121714341845_Delhi-pizza-delivery-boy-recovers-from-COVID19-discharged_SECVPF.gif',
            }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 5,
              borderColor: COLORS.primary,
              position: 'absolute',
              bottom: -50,
            }}
          />
        </View>

        <View style={styles.cards}>
          <View style={styles.col2}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="scale"
              source={delivery}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                overflow: 'hidden'
              }}>
              <Text style={[FONTS.h2, {color: COLORS.lightGray}]}>{total_order}</Text>
              <Text style={[FONTS.h3, {color: COLORS.lightGray}]}>
                Total Delivery
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.col2}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="scale"
              source={delivery}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius : 10,
                overflow  :'hidden'
              }}>
              <Text style={[FONTS.h2, {color: COLORS.lightGray}]}>4500</Text>
              <Text style={[FONTS.h3, {color: COLORS.lightGray}]}>
                Total Earning
              </Text>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.cards}>
          
          <View style={styles.cardContainer}>
            <Pressable style={[styles.card, {backgroundColor: '#ffde6b'}]} onPress={()=> navigation.navigate('Orders')}>
            <View>
              <Entypo name="new" size={40} color={COLORS.gray} />
            </View>
            </Pressable>
            <Text style={[FONTS.h3, {marginTop: 5, color: COLORS.gray}]}>
              New
            </Text>
          </View>

          <View style={styles.cardContainer}>
            <View style={[styles.card, {backgroundColor: '#c27d00'}]}>
              <Entypo name="archive" size={40} color={COLORS.lightGray} />
            </View>
            <Text style={[FONTS.h3, {marginTop: 5, color: COLORS.gray}]}>
              Active
            </Text>
          </View>

          <View style={styles.cardContainer}>
            <View style={[styles.card, {backgroundColor: COLORS.secondary}]}>
              <AntDesign
                name="checkcircle"
                size={40}
                color={COLORS.lightGray}
              />
            </View>
            <Text style={[FONTS.h3, {marginTop: 5, color: COLORS.gray}]}>
              Delivered
            </Text>
          </View>
        </View>
      </View>
    </AnimatedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
  },
  imagecard: {
    backgroundColor: COLORS.primary,
    height: (SIZES.height * 30) / 100,
  },
  imagebox: {
    alignItems: 'center',
    marginBottom: 70,
  },
  body: {},
  header: {
    padding: 20,
    flexDirection: 'row',
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: SIZES.width / 3.5,
    alignItems: 'center',
  },
  card: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  col2: {
    width: SIZES.width / 2.2,
    height: 150,
    backgroundColor: '#4fb9b461',
    marginBottom: 20,
    borderRadius : 10
  },
});

export default Home;
