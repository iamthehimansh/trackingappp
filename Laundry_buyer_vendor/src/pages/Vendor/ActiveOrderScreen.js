import React from 'react';
import {View, StyleSheet, Text, ScrollView, ToastAndroid, Pressable} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../utils/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActiveOrderScreen = ({navigation}) => {

  const [bookings, setBookings] = React.useState([]);

    
    React.useEffect(() => {
    AsyncStorage.getItem('vendorInfo').then((data) => {
    axios
      .get('/vendor/VendorsApi/get_all_bookings/'+ JSON.parse(data).vendor_id +'/0')
      .then(res => {
        if (res.data.status == 1) {
          setBookings(res.data.result);
        }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          'Something went wrong please try again',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );
    })
    }, []);


  return (
    <ScrollView style={styles.container}>
       {bookings.length > 0 ? 
       bookings.map((item, i) => 
          <Pressable key={i} onPress={() => navigation.navigate('Orderdetails', {item : JSON.stringify(item)})}>
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

              {/* <Text style={FONTS.h4}>{item.name}</Text>
              <Text>
                {' '}
                <Entypo name="location" /> {item.shipping_address}, {item.shipping_city} - {item.shipping_pin}
              </Text> */}
            </View>
          </Pressable>
       )
      : null}
    </ScrollView>
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
