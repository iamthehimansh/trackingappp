import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Pressable,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import CommonHeader from '../../component/CommonHeader';
import {btnColor, windowHeight, windowWidth, WarnaAbu} from '../../utils';
import {btnbackground} from '../../assets/images';
import globalCss from '../../utils/global';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { BarIndicator } from 'react-native-indicators';
import { COLORS, FONTS } from '../../utils/theme';
import Gap from '../../component/Gap';

const BookingScreen = ({navigation, route}) => {
  const price = route.params.price;
  const quantity = route.params.quantity;
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [timeSlots, setTimeslot] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const [data, setData] = React.useState({
    time_slot: '',
    loading: false,
    service_date: '',
    amount : '',
    total_amount : '' ,
    delivery_charge : '',
    transaction_id:'',
    message:'',

  });

  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    
    axios
      .get('/website/Services/fetch_time')
      .then(res => {
        if (res.data.status == 1) {
          setTimeslot(res.data.time);
        }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          response.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );

    getDeliveryCharge();

    const unsubscribe = navigation.addListener('focus', () => {
     getuser();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const getuser = async () => {
    try {
      let udata = await AsyncStorage.getItem('userInfo');
      udata = JSON.parse(udata);
      setUser(udata);
    } catch (e) {
      // read error
    }
  };


  const getDeliveryCharge = () => {
    axios
      .get('/website/Services/get_delivery_charge')
      .then(res => {
        if (res.data.status == 1) {
          setTotalPrice(Number(price) + Number(res.data.delivery_charge.deliverycharge));
         setData({
           ...data,
           delivery_charge: res.data.delivery_charge.deliverycharge
         })
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
      
  }

  const addDays = (date, days) => {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy;
}


  const onChange = (event, selectedDate) => {
    const date = new Date();
    const check_date = addDays(date, 2).toISOString().split('T')[0];
    setShow(false);
    console.log(selectedDate.toISOString().split('T')[0].toString() , check_date.toString());
    console.log(selectedDate.toISOString().split('T')[0].toString() <= check_date.toString());
    if (selectedDate.toISOString().split('T')[0].toString() <= check_date.toString()) {
      setDate(selectedDate);
      let ser_date = selectedDate.toISOString();
      setData({
        ...data,
        service_date: ser_date.split('T')[0],
      });
    } else {
      ToastAndroid.showWithGravityAndOffset(
          'Only next two day booking is accepted.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
      )
    }
    
  };

  const razorPay = () => {
    if (data.service_date == '' || data.time_slot == '') {
      Alert.alert('', 'Please select booking date & time', ['ok']);
      return;
    } 

    if (user.address == '' || user.city == '' || user.pin == '') {
      Alert.alert('', 'Please complete your pickup & delivery address.', ['ok']);
      return;
    }


    let body =
      'amount=' +
      totalPrice * 100 +
      '&api_key=rzp_test_Ib9jmkUnvf6ZhZ' +
      '&key_secret=msS46A6fQNVltnKx3Hyooc2x' +
      '&receipt=' +
      'LD' +
      Math.floor(Math.random() * 90000) +
      10000 +
      '&currency=INR' +
      '&payment_capture=1';
    axios
      .post('/website/Services/razorPayCreateOrder', body)
      .then(response => {
        var options = {
          description: 'Payment for booking',
          image:
            'https://yourdemolink.online/FTL190125/laundry/assets/website/assets/img/logo.png',
          currency: 'INR',
          key: 'rzp_test_Ib9jmkUnvf6ZhZ',
          amount: '5000',
          name: 'Wedify',
          order_id: response.data.result.order_id, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
          prefill: {
            email: user.email,
            contact: user.mobile,
            name: user.name,
          },
          theme: {color: btnColor},
        };
        RazorpayCheckout.open(options)
          .then(success => {
            // handle success
            let formdata =
              'name=' +
              user.name +
              '&email=' +
              user.email +
              '&mobile=' +
              user.mobile +
              '&user_id=' +
              user.id +
              '&time_slot=' +
              data.time_slot +
              '&date=' +
              data.service_date +
              '&payment_mode=1' +
              '&message=test' +
              '&delivery_charge=' +
              data.delivery_charge  +
              '&shipping_address=' +
              user.address  +
              '&shipping_pin=' +
              user.pin_code  +
              '&shipping_city=' +
              user.city  +
              '&amount=' +
              totalPrice  +
              '&total_amount=' +
              totalPrice  +
              '&transaction_id=' +
              success.razorpay_payment_id;
            setData({
              ...data,
              loading: true,
            });
            console.log(formdata);
            axios
              .post('/website/Services/bookings', formdata)
              .then(response => {
                setData({
                  ...data,
                  loading: false,
                });

                ToastAndroid.showWithGravityAndOffset(
                  response.data.message,
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
                if (response.data.status == 1) {
                  navigation.replace('MainApp');
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          })
          .catch(error => {
            ToastAndroid.showWithGravityAndOffset(
                'Payment Cancelled.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            )
          });

        ToastAndroid.showWithGravityAndOffset(
          'Opening RazorPay...',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Book Service" navigation={navigation} />
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
          <View style={styles.card}>
            <View style={{flexDirection : 'row'}}>
              <View  style={{flex : 2}}><Text style={FONTS.h4}>Total Items:</Text></View>
              <View style={{flex:1, alignItems : 'flex-end'}}><Text style={FONTS.h4}>{quantity}</Text></View>
            </View>
            <View style={{flexDirection : 'row'}}>
              <View style={{flex : 2}}><Text style={FONTS.h4}>Delivery Charge:</Text></View>
              <View style={{flex:1, alignItems : 'flex-end'}}><Text style={FONTS.h4}>Rs. {data.delivery_charge}</Text></View>
            </View>
            <View style={{flexDirection : 'row'}}>
              <View style={{flex : 2}}><Text style={FONTS.h4}>Payable Amount:</Text></View>
              <View style={{flex:1, alignItems : 'flex-end'}}><Text style={FONTS.h4}>Rs. { Number(price) + Number(data.delivery_charge) }</Text></View>
            </View>
          </View>

          <Gap height={20}/>

          <View style={styles.card}>
            <View style={{flexDirection : 'row'}}>
              <View style={{flex : 2}}>
                <Text style={FONTS.h3}>Pickup & Delivery Address</Text>
              </View>
              <View style={{flex : 1, alignItems :'flex-end'}}>
                <Pressable onPress={()=> navigation.navigate('Myaddress')}>
                  <Feather size={16} name={'edit'}/>
                </Pressable>
              </View>
            </View>
            <Text>{user.address}, {user.city}, {user.pin_code}</Text>
            
          </View>


          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Service Date
          </Text>
          <View style={styles.action}>
            <Pressable onPress={() => setShow(true)}>
              <Feather name="calendar" color="#05375a" size={20} />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  display="calendar"
                  onChange={onChange}
                />
              )}
            </Pressable>
            <TextInput
              placeholder="Booking Date"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.service_date}
              // editable={false}
              onTouchEnd={() => setShow(true)}
              // onChangeText={val =>
              //     setData({
              //         ...data,
              //         email: val,
              //     })
              // }
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Select Time Slot
          </Text>
          <View style={styles.action}>
            <Feather name="clock" color="#05375a" size={20} />
            <Picker
              selectedValue={data.gender}
              itemStyle={{fontWeight: 'bold', color: '#ff0000'}}
              style={styles.textInput}
              onValueChange={(itemValue, itemIndex) =>
                setData({
                  ...data,
                  time_slot: itemValue,
                })
              }>
              {timeSlots && timeSlots.length > 0
                ? timeSlots.map((item, i) => (
                    <Picker.Item
                      key={i}
                      label={item.time_from}
                      value={item.time_from}
                    />
                  ))
                : null}
            </Picker>
          </View>

          {data.loading ? <BarIndicator color="black" /> : null}

          <View style={styles.button}>
            <TouchableOpacity
              style={globalCss.btncontainer}
              onPress={() => razorPay()}>
              <ImageBackground
                source={btnbackground}
                style={globalCss.btnbackground}>
                <Text style={globalCss.btntext}>Continue To Book</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: btnColor,
  },
  footer: {
    flex: 4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  shadow: {
    shadowColor: '#00f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom : 30
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#4ca9c8',
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  card:{
    padding : 10,
    backgroundColor : COLORS.lightGray,
    borderRadius : 10
  }
});
