import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {btnColor, WarnaSekunder, windowWidth} from '../../utils';
import {check_mark} from '../../assets';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

const Subscription = ({plans}) => {

  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getuser();
  }, []);

  const getuser = async () => {
    try {
      let udata = await AsyncStorage.getItem('userInfo');
      udata = JSON.parse(udata);
      setUser(udata);
    } catch (e) {
      // read error
    }
  };


  const razorPay = (item) => {
    ToastAndroid.showWithGravityAndOffset(
          'Opening RazorPay...',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
    let body =
      'amount=' +
       item.price * 100 +
      '&api_key=rzp_test_Ib9jmkUnvf6ZhZ' +
      '&key_secret=msS46A6fQNVltnKx3Hyooc2x' +
      '&receipt=' +
      'LD' +
      Math.floor(Math.random() * 90000) +
      10000 +
      '&currency=INR' +
      '&payment_capture=1' + 
      '&user_id=' + user.id;
    axios
      .post('/website/Services/razorPayCheckOrder', body)
      .then(response => {
        if (response.data.status == '1') {
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
            item.transaction_id = success.razorpay_payment_id;
            subscribe(item);
            
          })
          .catch(error => {
          //   // handle failure
            ToastAndroid.showWithGravityAndOffset(
            'Payment Failed',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
            // alert(`Error: ${error.code} | ${error.description}`);
          });
        } else {
          ToastAndroid.showWithGravityAndOffset(
            response.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
        
        
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  

  const subscribe = (item) => {
      let body =
        'transaction_id=' +
        item.transaction_id +
        '&subscription_id=' +
        item.id +
        '&user_id=' +
        user.id;
      axios
        .post('/website/Services/save_subscription', body)
        .then(response => {
           ToastAndroid.showWithGravityAndOffset(
            response.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          if (response.data.status == 1) {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.price_title}>
            <View style={styles.title}>
              <Text style={styles.titletxt}>{item.name}</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.pricetxt}>Rs. {item.price}</Text>
            </View>
          </View>

          <View style={styles.subBody}>
            <Text style={styles.textbody}>
              Validity : {item.validity_no} {item.validity_period=='M' ? 'Month' : 'Year'}
            </Text>
            {item.service_name.map((benefits, i) => 
              <View key={i} style={styles.benefits}>
                <View style={styles.icon}>
                  <Image source={check_mark} />
                </View>
                <View style={styles.benefitstext}>
                  <Text>Free {benefits} :{item.total_quantity}</Text>
                </View>
              </View>
            )}
          </View>
            

            <View style={styles.button}>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() => razorPay(item)}>
                  <Text style={styles.appButtonText}>Subscribe</Text>
                </TouchableOpacity>
              </View>

        </View>
      </View>
    );
  };

  return (
    <Carousel
      sliderWidth={windowWidth}
      sliderHeight={200}
      itemWidth={windowWidth - 60}
      data={plans}
      renderItem={renderItem}
      hasParallaxImages={false}
    />
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // padding: 10,
    marginVertical: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    flexDirection: 'row',
  },
  subcontainer: {
    width: '100%',
    backgroundColor: WarnaSekunder,
    borderRadius: 10,
  },
  price_title: {
    flexDirection: 'row',
  },
  title: {
    width: '60%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  price: {
    width: '40%',
    height: 50,
    paddingRight: 10,
    backgroundColor: '#4fb9b4ba',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopStartRadius: 30,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 30,
  },
  titletxt: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
  },
  pricetxt: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Bold',
  },
  subBody: {
    padding: 20,
  },
  benefits: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  benefitstext: {
    marginLeft: 10,
  },
  textbody: {
    fontFamily: 'TitilliumWeb-Regular',
    marginBottom: 20,
    alignSelf : 'center',
    fontWeight : 'bold'
  },
    button: {
    alignItems: 'center',
    marginVertical: 20,
  },
  appButtonContainer: {
    backgroundColor: btnColor,
    borderRadius: 10,
    width: '50%',
    height: 40,
    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
