import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';

import {Imageheader, background} from '../../assets';
import {Saldo, Subscription} from '../../component';
import {WarnaAbu, btnColor} from '../../utils';
import BottomIcon from '../../component/BottomIcon';
import {PesananAktif} from '../../component';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({navigation}) => {
  const [categories, setCategories] = React.useState([]);
  const [plans, setPlans] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [bookings, setBookings] = React.useState([]);

  useEffect(() => {
    checkLogin();
    setLoading(true);

    // get active bookings from server
    AsyncStorage.getItem('userInfo').then((data) => {
      axios
        .get('/website/Services/my_bookings/' + JSON.parse(data).id)
        .then(res => {
          if (res.data.status == 1) {
            let newOrder = [];
            res.data.bookings.forEach(element => {
              if(element.status != '4' && element.status != '5'){
                newOrder.push(element);
              }
            });
            setBookings(newOrder);
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

    // get subscription plan from server h
    axios
      .get('/website/Services/fetch_subscription')
      .then(res => {
        if (res.data.status == 1) {
          setPlans(res.data.subscription);
          setLoading(false);
        }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          'Something went wrong, please try again.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );
  }, []);

  const checkStatus = (status) => {
  console.log(status);
  switch(status){
        case '1': return 'Ordered';
        case '2': return 'In Transit';
        case '3': return 'Pickup';
        case '4': return 'Delivered';
        case '6': return 'Cancelled'
    }
  }

  const checkLogin = async () => {
    try {
      let userdata = await AsyncStorage.getItem('userInfo');
      let vendordata = await AsyncStorage.getItem('vendorInfo');
      console.log(vendordata);
      if(vendordata != null){
         navigation.replace('Vendor');
      }
      else if (userdata == null) {
        navigation.replace('Login');
      }
    } catch (e) {
      // read error
    }
  };

  return (
    <ScrollView>
      <StatusBar backgroundColor={btnColor} barStyle="light-content" />
      <View style={styles.container}>
        <ImageBackground source={Imageheader} style={styles.header}>
          <Image source={background} style={styles.logo} resizeMode="contain" />
          <View style={styles.hello}>
            <Text style={styles.selamat}>World's Largest</Text>
            <Text style={styles.username}>Laundry Services</Text>
          </View>
        </ImageBackground>

        {/* Balance section */}
        {/* <Saldo /> */}

        <View style={styles.layanan}>
          <Text style={styles.label}>Subscription Packages</Text>
          {/* <View style={styles.iconLayanan}>
            {!isLoading ? (
              <BottomIcon
                categories={categories}
                type="layanan"
                navigation={navigation}
              />
            ) : null}
          </View> */}
        </View>

        {/* Subscription */}
        {/* <View style={styles.layanan}>
        <View style={styles.iconLayanan}>
        </View>
      </View> */}
        <Subscription plans={plans}/>

        <View style={styles.pesananAktif}>
          <Text style={styles.label}> Active Orders</Text>
          {bookings.map((item, i) => 
              <PesananAktif key={i} title={"Order No. " + item.unique_code} status={checkStatus(item.status)} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  logo: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.06,
  },
  hello: {
    marginTop: windowHeight * 0.025,
  },
  selamat: {
    fontSize: 24,
    fontFamily: 'TitilliumWeb-Regular',
  },
  username: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
  },
  layanan: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop : 20,
    textAlign : 'center'
  },
  label: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
  },
  iconLayanan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  pesananAktif: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: WarnaAbu,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
