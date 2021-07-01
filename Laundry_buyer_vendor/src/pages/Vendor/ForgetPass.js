import {
  Image,
  Text,
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import React from 'react';

import {forgot, btnbackground} from '../../assets';
import {
  windowHeight,
  windowWidth,
  WarnaDisable,
  btnColor,
  WarnaWarn,
} from '../../utils/index';
import axios from 'axios';
import {BarIndicator} from 'react-native-indicators';

const VendorForgetPass = ({navigation}) => {
  console.log(1);
  const [data, setData] = React.useState({
    email: '',
    check_textInputChange: false,
    loading: false,
  });

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const sendOtp = () => {
    setData({
      ...data,
      loading: true,
    });
    let body = 'email=' + data.email;
    axios
      .post('/vendor/VendorsApi/forget_password', body)
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
          navigation.navigate('ForgotOTP', {
            email: data.email,
          });
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
          <Image source={forgot} style={styles.logo} resizeMode="cover" />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Forgot your password?</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Enter your email"
              onChangeText={val => textInputChange(val)}
            />
          </View>

          {data.loading ? <BarIndicator color='black' /> : null}

          <TouchableOpacity
            style={styles.btncontainer}
            onPress={() => sendOtp()}>
            <ImageBackground
              source={btnbackground}
              style={styles.btnbackground}>
              <Text style={styles.btntext}>Continue</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default VendorForgetPass;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  desimage: {
    alignItems: 'center',
    height: windowHeight / 2.6,
    marginTop: windowHeight / 10,
  },
  logo: {
    width: windowWidth / 2,
    height: windowHeight / 3,
  },
  content: {
    alignItems: 'center',
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
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: btnColor,
  },
  textInput: {
    fontSize: 18,
    width: windowWidth / 1.3,
    fontFamily: 'TitilliumWeb-Regular',
    textAlign: 'center',
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
});
