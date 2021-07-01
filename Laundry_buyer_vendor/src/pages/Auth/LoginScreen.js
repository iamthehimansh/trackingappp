import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ToastAndroid,
  Switch,
  ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {btnColor, WarnaSekunder} from '../../utils';
import axios from 'axios';

import {BarIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    loading: false,
  });

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(val) === false) {
        setData({
          ...data,
          username: val,
          check_textInputChange: true,
          isValidUser: false,
        });
        return false;
      } else {
        setData({
          ...data,
          username: val,
          check_textInputChange: true,
          isValidUser: true,
        });
      }
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = async (userName, password) => {
    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return false;
    } else {
      setData({
        ...data,
        loading: true,
      });
      let body = 'email=' + userName + '&password=' + password;
      axios
        .post('/website/Services/login', body)
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
            AsyncStorage.setItem(
              'userInfo',
              JSON.stringify(response.data.user),
            );
            navigation.replace('MainApp');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };


  const vendorLogin = async () => {
    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return false;
    } else {
      setData({
        ...data,
        loading: true,
      });
      let body = 'email=' + data.username + '&password=' + data.password;
      axios
        .post('/vendor/VendorsApi/login', body)
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
            AsyncStorage.setItem(
              'vendorInfo',
              JSON.stringify(response.data.vendors),
            );
            navigation.replace('Vendor');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={btnColor} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: '#fff',
          },
        ]}>
        
        <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '700'}}>User</Text>
          </View>
          <View style={{marginHorizontal: 10}}>
            <Switch
              trackColor={{false: btnColor, true: WarnaSekunder}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Store</Text>
          </View>
        </View>

        {/* <View style={styles.loading}> */}

        {/* </View> */}

        {!isEnabled ? (
          <Animatable.View animation={'bounceInLeft'}>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="grey" size={20} />
              <TextInput
                placeholder="Your email or mobile"
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => textInputChange(val)}
                // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
              />
              {data.check_textInputChange && data.isValidUser ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Invalid email id</Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  // color: colors.text,
                  marginTop: 35,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="grey" size={20} />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text style={{color: btnColor, marginTop: 15}}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            {data.loading ? <BarIndicator color="black" /> : null}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={() => {
                  loginHandle(data.username, data.password);
                }}>
                <Text style={styles.appButtonText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                style={[
                  styles.signIn,
                  {
                    borderColor: btnColor,
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: btnColor,
                    },
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ) : (
            <Animatable.View animation={'bounceInRight'}>
              <Text style={styles.text_footer}>Username</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="grey" size={20} />
                <TextInput
                  placeholder="Your email or mobile"
                  placeholderTextColor="#666666"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={val => textInputChange(val)}
                // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange && data.isValidUser ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidUser ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Invalid email id</Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    // color: colors.text,
                    marginTop: 35,
                  },
                ]}>
                Password
            </Text>
              <View style={styles.action}>
                <Feather name="lock" color="grey" size={20} />
                <TextInput
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={val => handlePasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                      <Feather name="eye" color="grey" size={20} />
                    )}
                </TouchableOpacity>
              </View>
              {data.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be 8 characters long.
                </Text>
                </Animatable.View>
              )}

              <TouchableOpacity onPress={() => navigation.navigate('VendorForgot')}>
                <Text style={{ color: btnColor, marginTop: 15 }}>
                  Forgot password?
              </Text>
              </TouchableOpacity>
              {data.loading ? <BarIndicator color="black" /> : null}

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() => vendorLogin()}>
                  <Text style={styles.appButtonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('VendorSignup')}
                style={[
                  styles.signIn,
                  {
                    borderColor: btnColor,
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: btnColor,
                    },
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Animatable.View>
        )}
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: btnColor,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
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
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
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
  appButtonContainer: {
    elevation: 8,
    backgroundColor: btnColor,
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
