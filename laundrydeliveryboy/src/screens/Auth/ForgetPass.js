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

import {BarIndicator} from 'react-native-indicators';
import { COLORS, SIZES } from '../../configs/theme';
import { forgetPasswordOtp } from '../../services/auth-service';

const ForgetPass = ({navigation}) => {
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
     if (data.email.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'No field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    setData({
      ...data,
      loading: true,
    });

    let body = 'email=' + data.email;
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

        if (res.status == 1) {
          setData({
          ...data,
          email: '',
          check_textInputChange: false,
          });
          navigation.navigate('ForgotOTP', {
            email: data.email,
          });
        }
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

export default ForgetPass;

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
    fontFamily: 'TitilliumWeb-Regular',
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
