import React, {useEffect} from 'react';
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
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import CommonHeader from '../../component/CommonHeader';
import {btnColor, windowHeight, windowWidth} from '../../utils';
import {btnbackground} from '../../assets/images';
import globalCss from '../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BarIndicator} from 'react-native-indicators';

const MyaddressScreen = ({navigation, route}) => {
  const [data, setData] = React.useState({
    address: '',
    city: '',
    pin_code: '',
    loading: false,
  });

  const [user, setUser] = React.useState({});

  useEffect(() => {
    getuser();
  }, []);

  const getuser = async () => {
    try {
      let udata = await AsyncStorage.getItem('userInfo');
      udata = JSON.parse(udata);
      setUser(udata);
      setData({
        address : udata.address ,
        city: udata.city,
        pin_code: udata.pin_code,
      });
    } catch (e) {
      // read error
    }
  };

  const registerHandle = async () => {
    if (data.address == '' || data.pin_code == '' || data.city== '') {
      Alert.alert('Wrong Input!', 'No field cannot be empty.', [
        {text: 'Okay'},
      ]);
      return false;
    } else {
      setData({
        ...data,
        loading: true,
      });
      let body =
        'address=' +
        data.address +
        '&pin_code=' +
        data.pin_code +
        '&city=' +
        data.city +
        '&user_id=' +
        user.id;
      axios
        .post('/website/Services/update_my_address', body)
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
            user.address = data.address;
            user.pin_code = data.pin_code;
            user.city = data.city;
            console.log(user);
            AsyncStorage.setItem('userInfo', JSON.stringify(user));
            navigation.goBack();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Pickup & Delivery Address" navigation={navigation} />
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
          <Text style={styles.text_footer}>City </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.city}
              onChangeText={val =>
                setData({
                  ...data,
                  city: val,
                })
              }
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Postal Code
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your postal code"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType='numeric'
              value={data.pin_code}
              onChangeText={val =>
                {let newText = '';
                  let numbers = '0123456789';

                  for (var i=0; i < val.length; i++) {
                      if(numbers.indexOf(val[i]) > -1 ) {
                          newText = newText + val[i];
                      }
                      else {
                          alert("Please enter numbers only");
                          return;
                      }
                  }
                setData({
                  ...data,
                  pin_code: val,
                })}
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
            Address
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Full Address"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.address}
              onChangeText={val =>
                setData({
                  ...data,
                  address: val,
                })
              }
            />
          </View>

          {data.loading ? <BarIndicator color="black" /> : null}

          <View style={styles.button}>
            <TouchableOpacity
              style={globalCss.btncontainer}
              onPress={() => registerHandle()}>
              <ImageBackground
                source={btnbackground}
                style={globalCss.btnbackground}>
                <Text style={globalCss.btntext}>Update</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MyaddressScreen;

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
    // paddingLeft: 10,
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
});
