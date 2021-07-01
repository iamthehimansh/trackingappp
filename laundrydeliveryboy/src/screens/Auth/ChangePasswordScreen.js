import React from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CommonHeader from '../../components/CommonHeader';
import {SIZES, COLORS} from '../../configs/theme';
import {btnbackground} from '../../assets';
import {BarIndicator} from 'react-native-indicators';
import { updatePassword } from '../../services/auth-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = ({navigation, route}) => {
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem('userInfo').then((data) => {
     setUser(JSON.parse(data));
    })
    }, []);


  const [data, setData] = React.useState({
    oldpassword: '',
    password: '',
    confirm_password: '',
    check_confirmPass : false,
    loading: false,
  });


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



  const changePasswordHandle =async () => {
    if(data.oldpassword == '' || data.password == '' || data.confirm_password== ''){
      Alert.alert('Wrong Input!', 'Please enter OTP', [{text: 'Okay'}]);
      return;
    }

    setData({
      ...data,
      loading: true,
    });
    let body = 'user_id=' + user.id + '&password=' + data.password + '&old_password=' + data.oldpassword;
    updatePassword(body).then((res) => {
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
      }).catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          'Something went wrong please try again',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );;
  }

  return (
    <View style={styles.container}>
      <CommonHeader title="Reset Password" navigation={navigation} />

      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
          <Text style={styles.text_footer}>Old Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val =>
                setData({
                  ...data,
                  oldpassword: val,
                })
              }
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            New Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="New Password"
              secureTextEntry={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val =>
                setData({
                  ...data,
                  password: val,
                })
              }
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textConfirmChange(val)}
            />
          </View>
          {data.check_confirmPass ?
            <View>
              <Text style={styles.errorMsg}>Confirm Password Doesn't Match</Text>
            </View>
            : null}

          {data.loading ? <BarIndicator color='black' /> : null}

          <View style={[styles.button, {marginBottom: 30}]}>
            <TouchableOpacity style={styles.btncontainer} onPress={()=> changePasswordHandle()}>
              <ImageBackground
                source={btnbackground}
                style={styles.btnbackground}>
                <Text style={styles.btntext}>Update</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  footer: {
    flex: 4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  btncontainer: {
    width: SIZES.width / 1.4,
    borderRadius: 20,
    height: 50,
    overflow: 'hidden',
    marginTop: 20,
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
