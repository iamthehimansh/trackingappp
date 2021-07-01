import {
  Image,
  Text,
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';

import {verified, btnbackground} from '../../assets';

import {BarIndicator} from 'react-native-indicators';
import { COLORS, SIZES } from '../../configs/theme';
import { forgetPasswordOtp, validatePasswordOtp } from '../../services/auth-service';

const ForgetPassOTP = ({navigation, route}) => {
  const {email} = route.params;
  console.log(email);
  const [data, setData] = React.useState({
    otp: '',
    check_textInputChange: false,
    loading: false,
  });

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        otp: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        otp: val,
        check_textInputChange: false,
      });
    }
  };

  const verifyregistraion = () => {
    if (!data.check_textInputChange) {
      Alert.alert('Wrong Input!', 'Please enter OTP', [{text: 'Okay'}]);
      return;
    }

    setData({
      ...data,
      loading: true,
    });
    let body = 'otp=' + data.otp + '&email=' + email;
    validatePasswordOtp(body).then((res) => {
      setData({
        ...data,
        loading: false,
        });
      ToastAndroid.showWithGravityAndOffset(
            res.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
      );
      if ( res.status == 1 ) {
        navigation.navigate('ResetPassword', {
            email : email
        });
      }
    });
    
    
  };

  const resendOtp = () => {
    setData({
      ...data,
      loading: true,
    });
    let body = 'email=' + email;
    forgetPasswordOtp(body).then((res) => {
      setData({
        ...data,
        loading: false,
        });
      ToastAndroid.showWithGravityAndOffset(
            res.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
      );
    });
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.background}>
        <View style={styles.desimage}>
          <Image source={verified} style={styles.logo} resizeMode="cover" />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>Enetr the OTP sent to {email}</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType='numeric'
              onChangeText={val => textInputChange(val)}
            />
          </View>

          <View style={styles.resendOtp}>
            <Text style={styles.resendtxt1}>Didn't you receive OTP?</Text>
            <Pressable onPress={() => resendOtp()}>
              <Text style={styles.resendtxt2}>Resend OTP</Text>
            </Pressable>
          </View>

          {data.loading ? <BarIndicator color="black" /> : null}

          <TouchableOpacity
            style={styles.btncontainer}
            onPress={() => verifyregistraion()}>
            <ImageBackground
              source={btnbackground}
              style={styles.btnbackground}>
              <Text style={styles.btntext}>Verify OTP</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgetPassOTP;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  desimage: {
    alignItems: 'center',
    height: SIZES.height / 2.6,
    marginTop: SIZES.height / 10,
  },
  logo: {
    width: SIZES.width / 2,
    height: SIZES.height / 3,
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
    borderBottomColor: COLORS.primary,
  },
  textInput: {
    fontSize: 18,
    width: SIZES.width / 1.3,
    marginTop: Platform.OS === 'ios' ? 10 : 12,
    fontFamily: 'TitilliumWeb-Regular',
    textAlign: 'center',
    color: 'black',
  },
  resendOtp: {
    flexDirection: 'row',
    marginTop: 10,
  },
  resendtxt1: {
    color: COLORS.gray,
    fontFamily: 'TitilliumWeb-Regular',
  },
  resendtxt2: {
    color: COLORS.secondary,
    fontFamily: 'TitilliumWeb-Bold',
    paddingLeft: 10,
  },
  btncontainer: {
    width: SIZES.width / 1.4,
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
