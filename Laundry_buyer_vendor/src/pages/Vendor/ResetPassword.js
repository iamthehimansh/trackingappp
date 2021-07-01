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

import {btnbackground, reset} from '../../assets';
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
import Feather from 'react-native-vector-icons/Feather';

const ResetPassword = ({navigation, route}) => {
  const {email} = route.params;
  console.log(email);
  const [data, setData] = React.useState({
    password: '',
    confirm_password : '',
    check_textInputChange: false,
    check_confirmPass : false,
    loading: false,
  });

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        password: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        check_textInputChange: false,
      });
    }
  };

  const textConfirmChange = val => {
    if (val.length !== 0) {
      if (val !== data.password) {
        setData({
          ...data,
          confirm_password: val,
          check_confirmPass: true,
        });
      } else {
        setData({
          ...data,
          confirm_password: val,
          check_confirmPass: false,
        });
      }
      
    } else {
      setData({
        ...data,
        confirm_password: val,
        check_confirmPass: false,
      });
    }
  };

  const createPassword = () => {
    if (!data.check_textInputChange) {
      Alert.alert('Wrong Input!', 'Please enter OTP', [{text: 'Okay'}]);
      return;
    }

    setData({
      ...data,
      loading: true,
    });
    let body = 'password=' + data.password + '&email=' + email;
    axios
      .post('/vendor/VendorsApi/change_password', body)
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
          navigation.replace('Login');
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
          <Image source={reset} style={styles.logo} resizeMode="contain" />
        </View>
        <View>
          <Text style={[styles.title, styles.content]}>Reset Password</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="New Password"
              secureTextEntry={true}
              onChangeText={val => textInputChange(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={val => textConfirmChange(val)}
            />
          </View>
          {data.check_confirmPass ?
            <Animatable.View
              animation="bounceIn"
            >
              <Text style={styles.errorMsg}>The email you entered is not valid</Text>
            </Animatable.View>
            : null}

          {data.loading ? <BarIndicator color='black' /> : null}

          <TouchableOpacity
            style={styles.btncontainer}
            onPress={() => createPassword()}>
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

export default ResetPassword;

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
