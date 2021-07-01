import {
  Image,
  Text,
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert
} from 'react-native';
import React from 'react';

import {btnbackground, reset, transaction} from '../../assets';

import {
  windowHeight,
  windowWidth,
  WarnaDisable,
  btnColor,
  WarnaWarn,
} from '../../utils/index';
import axios from 'axios';
import {BarIndicator} from 'react-native-indicators';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RequestMoney = ({navigation}) => {

  const [balance, setBalance] = React.useState(0);
  const[user, setUser] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem('vendorInfo').then((data) => {
      setUser(JSON.parse(data));
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
  
  const [data, setData] = React.useState({
    password: '',
    check_textInputChange: false,
    check_Amount : false,
    loading: false,
  });

  const textInputChange = val => {
    if (val !== 0) {
      if(Number(val) > balance){
        setData({
        ...data,
        password : val,
        check_Amount: true,
        check_textInputChange: true,
        });
      }else{
        setData({
        ...data,
        password : val,
        check_Amount: false,
        check_textInputChange: true,
        });
      }
    } else {
      setData({
        ...data,
        password: val,
        check_textInputChange: false,
      });
    }
  };


  const createPassword = () => {
    if (!data.check_textInputChange) {
      Alert.alert('Wrong Input!', 'Please enter Amount', [{text: 'Okay'}]);
      return;
    }

    setData({
      ...data,
      loading: true,
    });
    let body = 'vendor_id=' + user.vendor_id + '&amount=' + data.password;
    axios
      .post('/vendor/VendorsApi/request_maney', body)
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
          navigation.navigate('RequestHistory');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <ScrollView style={styles.background}>
      <View style={styles.background}>
        <View style={styles.desimage}>
          <Image source={transaction} style={styles.logo} resizeMode="contain" />
        </View>
        <View>
          <Text style={[styles.title, styles.content]}>Withdrawal Request</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              keyboardType='numeric'
              autoCapitalize="none"
              placeholder="Enter Amount"
              onChangeText={val => textInputChange(val)}
            />
          </View>
          {data.check_Amount ?
            <Animatable.View
              animation="bounceIn"
            >
              <Text style={styles.errorMsg}>The amount must be less or equal to {balance}</Text>
            </Animatable.View>
            : null}

          {data.loading ? <BarIndicator color='black' /> : null}

          <TouchableOpacity
            style={styles.btncontainer}
            onPress={() => createPassword()}>
            <ImageBackground
              source={btnbackground}
              style={styles.btnbackground}>
              <Text style={styles.btntext}>Submit</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RequestMoney;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  desimage: {
    alignItems: 'center',
    marginTop: windowHeight / 10,
  },
  logo: {
    width: windowWidth / 2,
    height: windowHeight / 4,
  },
  content: {
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 25,
    textAlign: 'justify',
  },
  subtitle: {
    fontFamily: 'TitilliumWeb-Regular',
  },
  action: {
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: btnColor,
    width: windowWidth / 1.3,
    alignSelf: 'center',
  },
  textInput: {
    fontSize: 18,
    width: windowWidth / 1.3,
    fontFamily: 'TitilliumWeb-Regular',
    color: 'black',
  },
  resendOtp: {
    flexDirection: 'row',
    marginTop: 10,
  },
  resendtxt1: {
    color: WarnaDisable,
    fontFamily: 'TitilliumWeb-Regular',
  },
  resendtxt2: {
    color: WarnaWarn,
    fontFamily: 'TitilliumWeb-Bold',
    paddingLeft: 10,
  },
  btncontainer: {
    width: windowWidth / 1.4,
    borderRadius: 20,
    height: 50,
    overflow: 'hidden',
    marginTop: 60,
    alignSelf: 'center',
  },
  btnbackground: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntext: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
    color: '#FFFFFF',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    alignSelf : 'center'
  },
});
