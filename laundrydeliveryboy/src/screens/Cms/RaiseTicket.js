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
import Feather from 'react-native-vector-icons/Feather';
import {btnbackground} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BarIndicator} from 'react-native-indicators';
import CommonHeader from '../../components/CommonHeader';
import { COLORS, SIZES } from '../../configs/theme';
import { saveQuery } from '../../services/auth-service';

const TicketScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    query: '',
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
    } catch (e) {
      // read error
    }
  };

  const registerHandle = async () => {
    if (data.query == '') {
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
        'query=' +
        data.query +
        '&user_id=' +
        user.id +
        "&name=" +
        user.name +
        "&email=" + 
        user.email +
        "&mobile=" + 
        user.mobile +
        "&role=Delivery Boy";
        saveQuery(body).then((res) => {
        setData({
        ...data,
        loading: false,
        });
        console.log(res);
        ToastAndroid.showWithGravityAndOffset(
            res.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          if (res.status == 1) {
            navigation.goBack();
          }
      });
    }
  };


  return (
    <View style={styles.container}>
      <CommonHeader title="Raise A Ticket" navigation={navigation} />
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
          <Text style={styles.text_footer}>Query / Complain </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="How can we help you?"
              multiline={true}
              numberOfLines={10}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val =>
                setData({
                  ...data,
                  query: val,
                })
              }
            />
            {data.check_textInputChange ? (
              <View>
                <Feather name="check-circle" color="green" size={20} />
              </View>
            ) : null}
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

export default TicketScreen;

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
    paddingVertical: 20,
  },

  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
  
  },
  textInput: {
    flex: 1,
    marginTop: 10,
    borderColor : COLORS.gray,
    borderWidth : .5,
    color: '#05375a',
    borderRadius : 10
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
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
