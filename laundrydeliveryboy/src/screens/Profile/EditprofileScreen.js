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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {btnbackground} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BarIndicator} from 'react-native-indicators';
import CommonHeader from '../../components/CommonHeader';
import { COLORS, SIZES } from '../../configs/theme';
import { updateProfile } from '../../services/auth-service';

const EditprofileScreen = ({navigation, route}) => {
  const [data, setData] = React.useState({
    name: '',
    mobile: '',
    email: '',
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
        name: udata.name,
        email: udata.email,
        mobile: udata.mobile,
      });
    } catch (e) {
      // read error
    }
  };

  const registerHandle = async () => {
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
        '&user_id=' +
        user.id;

      updateProfile(body).then((res) => {
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
            user.name = data.name;
            AsyncStorage.setItem('userInfo', JSON.stringify(user));
            
          }
      }).catch(function(error) {
          console.log(error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Edit Profile" navigation={navigation} />
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
          <Text style={styles.text_footer}>Name </Text>
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

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <Feather name="mail" color="#05375a" size={20} />
            <TextInput
              placeholder="Your email"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.email}
              editable={false}
              onChangeText={val =>
                setData({
                  ...data,
                  email: val,
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
            Phone Number
          </Text>
          <View style={styles.action}>
            <Feather name="phone" color="#05375a" size={20} />
            <TextInput
              keyboardType="phone-pad"
              placeholder="Your Mobile No"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.mobile}
              editable={false}
              onChangeText={val =>
                setData({
                  ...data,
                  mobile: val,
                })
              }
            />
          </View>

          {data.loading ? <BarIndicator color="black" /> : null}

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.btncontainer}
              onPress={() => registerHandle()}>
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

export default EditprofileScreen;

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
