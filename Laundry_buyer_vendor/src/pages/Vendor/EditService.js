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
  ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {btnColor} from '../../utils';
import {btnbackground} from '../../assets/images';
import globalCss from '../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BarIndicator} from 'react-native-indicators';
import {Picker} from '@react-native-picker/picker';

const EditService = ({navigation, route}) => {
  const {service} = route.params;
  console.log(service);
  const [data, setData] = React.useState({
    id : JSON.parse(service).id,
    vendor_id: '',
    item_id: JSON.parse(service).item_id,
    name: JSON.parse(service).name,
    price : JSON.parse(service).price,
    description: JSON.parse(service).description,
    loading: false,
  });

  const [user, setUser] = React.useState({});
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    getuser();
    axios
      .get('/vendor/VendorsApi/fetch_item')
      .then(res => {
        if (res.data.status == 1) {
          setItems(res.data.item);
        }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          'Something went wrong, please try again.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );
  }, []);

  const getuser = async () => {
    try {
      let udata = await AsyncStorage.getItem('vendorInfo');
      udata = JSON.parse(udata);
      setUser(udata);
    } catch (e) {
      // read error
    }
  };

  const registerHandle = async () => {
    console.log(data);
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
        'id='+
        data.id+
        '&vendor_id=' +
        user.vendor_id +
        '&item_id=' +
        data.item_id +
        '&name=' +
        data.name +
        '&price=' +
        data.price +
        '&description=' +
        data.description;
      axios
        .post('/vendor/VendorsApi/service_edit', body)
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
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
          <Text style={styles.text_footer}>Select Item</Text>
          <View style={styles.action}>
            <Picker
              selectedValue={data.item_id}
              itemStyle={{fontWeight: 'bold', backgroundColor : '#FF0000'}}
              style={styles.textInput}
              onValueChange={(itemValue, itemIndex) =>
                setData({
                  ...data,
                  item_id : itemValue
                })
              }>
              <Picker.Item label="Select Service" value="" />
              {items && items.length > 0
                ? items.map((item, i) => (
                    <Picker.Item
                      key={i}
                      label={item.name}
                      value={item.id}
                    />
                  ))
                : null}
          </Picker>
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={styles.text_footer}>Service Name </Text>
          <View style={styles.action}>
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
            Price
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Price"
              keyboardType='numeric'
              style={styles.textInput}
              autoCapitalize="none"
              value={data.price}
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
                  price : val,
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
            Description
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Service Description"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.description}
              onChangeText={val =>
                setData({
                  ...data,
                  description : val,
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

export default EditService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: btnColor,
  },
  footer: {
    flex: 4,
    backgroundColor: '#FFFFFF',
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
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
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
