import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import AnimatedScrollView from './AnimatedScrollView';
import {COLORS, SIZES, FONTS} from '../configs/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { orderList } from '../services/auth-service';

const ActiveOrderScreen = ({navigation}) => {

  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
      // Subscribe for the focus Listener
      const unsubscribe = navigation.addListener('focus', () => {
        AsyncStorage.getItem('userInfo').then((data) => {
          console.log(JSON.parse(data));
          let body = "user_id=" + JSON.parse(data).id;
          console.log(body);
          let newOrder = [];
          orderList(body).then((res) => {
            res.result.forEach(element => {
                  if(element.status == '2' || element.status == '3'){
                    newOrder.push(element);
                  }
            });
            setBookings(newOrder);
          });
        })
      });

      return () => {
        // Unsubscribe for the focus Listener
        unsubscribe;
      };
    }, [navigation]);


  return (
    <AnimatedScrollView style={styles.container}>
      {bookings.length > 0 ? 
       bookings.map((item, i) => 
          <Pressable key={i} onPress={() => navigation.navigate('OrderDetails', {item : JSON.stringify(item)})}>
            <View style={[styles.card]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={FONTS.h3}>#{item.unique_code}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={[
                      FONTS.h4,
                      {
                        color: COLORS.gray,
                        alignSelf: 'flex-end',
                      },
                    ]}>
                    {item.date}
                  </Text>
                </View>
              </View>

              <View style={{height: SIZES.base}}></View>

              <Text style={FONTS.h4}>{item.name}</Text>
              <Text>
                {' '}
                <Entypo name="location" /> {item.shipping_address}, {item.shipping_city} - {item.shipping_pin}
              </Text>
            </View>
          </Pressable>
       )
      : null}
    </AnimatedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    width: SIZES.width - 20,
    padding: 10,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default ActiveOrderScreen;
