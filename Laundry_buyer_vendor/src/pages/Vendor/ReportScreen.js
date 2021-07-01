import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    ToastAndroid
} from 'react-native';
import {
    WarnaAbu,
} from '../../utils';
import Entypo from 'react-native-vector-icons/Entypo';
import { FONTS, COLORS, SIZES } from '../../utils/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Saldo } from '../../component';

const ReportScreen = ({ navigation }) => {

    const [bookings, setBookings] = React.useState([]);
    const [balance, setBalance] = React.useState(0);

    
    React.useEffect(() => {
    AsyncStorage.getItem('vendorInfo').then((data) => {
    axios
      .get('/vendor/VendorsApi/get_commission_history/'+ JSON.parse(data).vendor_id)
      .then(res => {
        if (res.data.status == 1) {
          setBookings(res.data.commission_history);
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


      axios
      .get('/vendor/VendorsApi/vendor_wallet/'+ JSON.parse(data).vendor_id)
      .then(res => {
        if (res.data.status == 1) {
          setBalance(res.data.vendor_wallet[0].balance);
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

            <Saldo balance={balance} navigation={navigation} />


            {bookings.length > 0 ? 
       bookings.map((item, i) => 
            <View key={i} style={[styles.card]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={FONTS.h3}>#{item.booking_code}</Text>
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
                    {item.added_date}
                  </Text>
                </View>
              </View>

              <View style={{height: SIZES.base}}></View>

              <Text style={FONTS.h4}>Total Order Amount : {item.booking_amount}</Text>
              <Text style={FONTS.h4}>Admin Commission : {item.admin_amount}</Text>
              
            </View>
       )
      : null}
          
        </ScrollView>
    );
};

export default ReportScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: WarnaAbu,
        flex: 1,
    },
    card: {
    width: SIZES.width - 20,
    padding: 10,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
    },
    col: width => ({
        width: width,
        padding: 10,
    }),
});
