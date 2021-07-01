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
import Feather from 'react-native-vector-icons/Feather';
import CommonHeader from '../../component/CommonHeader';
import {btnColor } from '../../utils';
import {btnbackground} from '../../assets/images';
import globalCss from '../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BarIndicator} from 'react-native-indicators';
import { COLORS } from '../../utils/theme';

const TicketScreen = ({navigation, route}) => {
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
        user.id+
        "&name=" +
        user.name +
        "&email=" + 
        user.email +
        "&mobile=" + 
        user.mobile +
        "&role=Buyer";
      axios
        .post('/website/Services/save_query', body)
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
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
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

export default TicketScreen;

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
