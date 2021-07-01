import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, Pressable, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, ImageBackground, ToastAndroid} from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { btnbackground } from '../../assets';
import globalCss from '../../utils/global';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import axios from 'axios';


const VendorProfile = ({navigation}) => {

  const [data, setData] = React.useState({
    name: '',
    mobile: '',
    email: '',
    loading: false,
  });

  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getuser();
  }, []);

  const getuser = async () => {
    try {
      let udata = await AsyncStorage.getItem('vendorInfo');
      udata = JSON.parse(udata);
      console.log(udata);
      setUser(udata);
      setData({
        id : udata.vendor_id,
        name: udata.name,
        email: udata.email,
        mobile: udata.mobile,
        addesss : udata.addesss,
        company_name : udata.company_name
      });
    } catch (e) {
      // read error
    }
  };


   const updateHandle = async () => {
    if (data.name.length == 0) {
      Alert.alert('Wrong Input!', 'Name field cannot be empty.', [
        {text: 'Okay'},
      ]);
      return false;
    } else {
      setData({
        ...data,
        loading: true,
      });
      let body =
        'email=' +
        data.email +
        '&name=' +
        data.name +
        '&mobile=' +
        data.mobile +
        '&company_name=' +
        data.company_name +
        '&addesss=' +
        data.addesss +
        '&vendor_id=' +
        data.id;
      axios
        .post('/vendor/VendorsApi/update_profile', body)
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
            user.name = data.name;
            user.mobile = data.mobile;
            user.company_name = data.company_name;
            user.addesss = data.addesss;

            AsyncStorage.setItem('vendorInfo', JSON.stringify(user));
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.footer}>
        <View
          style={{
            alignItems: 'center',
            position: 'relative',
            top: -70,
          }}>
          <Image
            source={{
              uri:
                user.vendor_auth_pic,
            }}
            resizeMode='contain'
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          />
        </View>

        <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.name}
              onChangeText={val =>
                setData({
                  ...data,
                  name: val,
                })
              }
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Email"
              editable={false}
              style={styles.textInput}
              autoCapitalize="none"
              value={data.email}
              onChangeText={val =>
                setData({
                  ...data,
                  email: val,
                })
              }
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <View style={styles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} />
            <TextInput
              placeholder="Mobile"
              style={styles.textInput}
              keyboardType='phone-pad'
              autoCapitalize="none"
              value={data.mobile}
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
                  mobile: val,
                })
               }
                
              }
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <View style={styles.action}>
            <FontAwesome name="home" color="#05375a" size={20} />
            <TextInput
              placeholder="Store Name"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.company_name}
              onChangeText={val =>
                setData({
                  ...data,
                  company_name : val,
                })
              }
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <View style={styles.action}>
            <FontAwesome name="location-arrow" color="#05375a" size={20} />
            <TextInput
              placeholder="Store Address"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.addesss}
              onChangeText={val =>
                setData({
                  ...data,
                  addesss : val,
                })
              }
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          {data.loading ? <BarIndicator color="black" /> : null}

          <View style={styles.button}>
            <TouchableOpacity
              style={globalCss.btncontainer}
              onPress={() => updateHandle()}>
              <ImageBackground
                source={btnbackground}
                style={globalCss.btnbackground}>
                <Text style={globalCss.btntext}>Update</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
  },
  footer: {
    flex: 4,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal : 10,
    marginTop: 100,
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
    marginTop: 20,
  },
 
});

export default VendorProfile;
