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

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Saldo } from '../../component';
import { COLORS } from '../../utils/theme';

const WalletHistory = ({ navigation }) => {

    const [bookings, setBookings] = React.useState([]);
    const [balance, setBalance] = React.useState(0);

    
    React.useEffect(() => {
    AsyncStorage.getItem('vendorInfo').then((data) => {
    axios
      .get('/vendor/VendorsApi/request_money_history/'+ JSON.parse(data).vendor_id)
      .then(res => {
        if (res.data.status == 1) {
          setBookings(res.data.all_request);
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


    const PrintStatus = ({status}) => {
    return(
        <Text style={{alignSelf : 'flex-start'}}>{status}</Text>
    )
    }


    const checkStatus = (status) => {
    console.log(status);
    switch(status){
            case '1': return <PrintStatus status={'Accepted'}/>;
            case '2': return <PrintStatus status={'Pending'}/>;
        }
    }


    return (
        <ScrollView style={styles.container}>

            {/* <Saldo balance={balance} navigation={navigation} /> */}


            {bookings.length > 0 ? 
            bookings.map((item, i) => 
                    <View key={i} style={[styles.cardContainer, styles.shadow]}>
                    <View style={{flexDirection : 'row'}}>
                        <View style={{flex : 4}}>
                            <Text style={{fontWeight : 'bold'}}>Amount : {item.request_amount}</Text>
                        </View>
                    </View>
                    
                    {/* SEPARATOR */}
                    <View style={{borderTopWidth : .5, marginVertical : 10, borderTopColor : 'gray'}}></View>

                    <View style={{flexDirection : 'row'}}>
                        <View style={{flex : 1}}>
                                {checkStatus(item.status)}
                        </View>
                        <View style={{flex : 1}}>
                            <Text style={{alignSelf : 'flex-end'}}>{item.date}</Text>
                        </View>
                    </View>
        </View>
       )
      : null}
          
        </ScrollView>
    );
};

export default WalletHistory;

const styles = StyleSheet.create({
    container: {
        backgroundColor: WarnaAbu,
        flex: 1,
        paddingVertical : 10,
        paddingHorizontal : 10,
        backgroundColor : COLORS.white
    },
    shadow: {
        shadowColor: "#00f",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation : 5
    },
    cardContainer : {
        backgroundColor : WarnaAbu,
        flex : 1,
        borderRadius : 20,
        paddingVertical : 10,
        paddingHorizontal : 10,
        marginBottom : 20
    }
});
