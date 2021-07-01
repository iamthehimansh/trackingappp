import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Pressable,
  Image
} from 'react-native';
import {btnColor, WarnaAbu, WarnaWarn, windowHeight, windowWidth} from '../../utils';
import SearchableDropdown from 'react-native-searchable-dropdown';
import axios from 'axios';
import {BarIndicator} from 'react-native-indicators';
import {Picker} from '@react-native-picker/picker';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalCss from '../../utils/global';
import { COLORS, FONTS } from '../../utils/theme';


const Pesanan = ({navigation}) => {
  const [items, setItems] = React.useState([]);
  const [data, setData] = React.useState({
    item : [],
    quantity : 1,
    service : []
  });
  const [userdata, setUserdata] = React.useState({});
  const [services, setServices] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [cartItem, setCartItem] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState([]);
  const [totalQuantity, setQuantity] = React.useState([]);


  useEffect(() => {
    checkLogin()
    
    setLoading(true);
    axios
      .get('/website/Services/fetch_item')
      .then(res => {
        if (res.data.status == 1) {
          setItems(res.data.item);
          setLoading(false);
        }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          'Something went wrong please try again',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );
  }, []);




  const checkLogin = async () => {
    try {
      AsyncStorage.getItem('userInfo').then((data) => {
        setUserdata(JSON.parse(data));
      })
      fetchCart();
    } catch (e) {
      // read error
    }
  };

  const fetchCart = () => {
    AsyncStorage.getItem('userInfo').then((data) => {
        
        console.log(JSON.parse(data).name)
      axios
      .get('/website/Services/fetch_cart_sevice/' + JSON.parse(data).id)
      .then(res => {
        if (res.data.status == 1) {
          setCartItem(res.data.cart_service);
          setTotalPrice(res.data.total_price);
          setQuantity(res.data.total_quantity);
          console.log(cartItem);
        }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          'Something went wrong please try again',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );
      })
    
  }

  const fetchServices = (item) => {
     setData({
              ...data,
              item : item
            });
    axios
      .get('/website/Services/fetch_service_by_item/' + item.id)
      .then(res => {
        if (res.data.status == 1) {
          setServices(res.data.service);
          setLoading(false);
        }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          'Something went wrong please try again',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );
  }

  const addToCart = () => {
    let body = 'item_id=' + data.item.id + '&service_id=' + data.service.id + '&quantity=1' + '&user_id=' + userdata.id; 
     axios
      .post('/website/Services/add_to_cart', body)
      .then(res => {
        ToastAndroid.showWithGravityAndOffset(
            res.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          if (res.data.status == 1) {
            fetchCart();
          }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          res.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );
  }


  const updateCart = (item, action) => {
    let body = '';
    if (action === 'increment') {
       item.quantity = Number(item.quantity) + 1;
       body = 'cart_id=' + item.id + '&quantity='+ item.quantity + '&user_id=' + userdata.id;
    } else {
       if (item.quantity > 0) {
         item.quantity = Number(item.quantity) - 1;
         body = 'cart_id=' + item.id + '&quantity=' + item.quantity + '&user_id=' + userdata.id;
       }
       
    }
     
    
     axios
      .post('/website/Services/update_cart', body)
      .then(res => {
        ToastAndroid.showWithGravityAndOffset(
            res.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          if (res.data.status == 1) {
            fetchCart();
          }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          res.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );
  }


  const removeCart = (item) => {
      axios
      .get('/website/Services/delete_from_cart/' + item.id)
      .then(res => {
        ToastAndroid.showWithGravityAndOffset(
            res.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        if (res.data.status == 1) {
          fetchCart();
        }
      })
      .catch(error =>
        ToastAndroid.showWithGravityAndOffset(
          'Something went wrong please try again',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ),
      );
  }


  return (
    <View style={styles.container}>
      <View style={styles.titlebar}>
        <SearchableDropdown
          selectedItems={data.item}
          onItemSelect={item => {
            fetchServices(item);
          }}
          containerStyle={{backgroundColor: 'white', borderRadius: 20}}
          onRemoveItem={(item, index) => {
            const items = this.state.selectedItems.filter(
              sitem => sitem.id !== item.id,
            );
            this.setState({selectedItems: items});
          }}
          itemStyle={{
            padding: 15,
            marginTop: 2,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{color: '#222'}}
          itemsContainerStyle={{maxHeight: 240}}
          items={items}
          defaultIndex={2}
          resetValue={false}
          textInputProps={{
            placeholder: 'Choose Item',
            underlineColorAndroid: 'transparent',
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            },
            // onTextChange: text => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
        {/* <Text style={styles.title}>Choose your service</Text> */}
        
        <View style={{backgroundColor : 'white', marginTop : 20, borderRadius : 10}}>
          <Picker
              selectedValue={data.gender}
              itemStyle={{fontWeight: 'bold', backgroundColor : '#FF0000'}}
              style={styles.textInput}
              onValueChange={(itemValue, itemIndex) =>
                setData({
                  ...data,
                  service : itemValue
                })
              }>
              <Picker.Item label="Select Service" value="" />
              {services && services.length > 0
                ? services.map((item, i) => (
                    <Picker.Item
                      key={i}
                      label={item.name}
                      value={item}
                    />
                  ))
                : null}
          </Picker>
        </View>

        <View style={styles.button}>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() => addToCart()}>
                  <Text style={styles.appButtonText}>Add</Text>
                </TouchableOpacity>
        </View>
        
      </View>
      <View animation="fadeInUpBig" style={styles.footer}>
        
        {isLoading ? <BarIndicator color="black" /> : null}
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItem.map((item, i) => (
            <View key={i} style={[styles.itemBx, globalCss.shadow]}>
              <View style={styles.img}>
                <Pressable>
                  <Image
                    source={{uri: item.service_image}}
                    resizeMode="contain"
                    style={styles.itemimg}
                  />
                </Pressable>
              </View>
              <View style={styles.description}>
                <Text style={styles.serviceName}>{item.service_name}</Text>
                {/* <Text style={styles.category}>Washing & Ironing</Text> */}
                <Text style={styles.price}>Rs. {item.price}</Text>
              </View>
              <View style={styles.quantity}>
                <View style={{alignItems : 'flex-end'}}>
                  <Pressable onPress={() => removeCart(item)}>
                    <AntDesign name="closecircle" color="black" size={20} />
                  </Pressable>
                </View>
                <View style={styles.plusminus}>
                   <View style={styles.iconContainer}>
                <Pressable onPress={() => updateCart(item, 'decrement')}>
                  <Feather name="minus" color="black" size={20} />
                </Pressable>
                </View>

                <View
                  style={[styles.iconContainer, {backgroundColor: '#FFFFFF'}]}>
                  <Text>{item.quantity}</Text>
                </View>
                
                <View style={styles.iconContainer}>
                  <Pressable onPress={() => updateCart(item, 'increment')}>
                    <Feather name="plus" color="black" size={20} />
                  </Pressable>
                </View>
                </View>
               
              </View>
            </View>
          ))}
        </ScrollView>
        {cartItem.length > 0 ? (
        <Pressable onPress={() => navigation.navigate('Booking', {price : totalPrice, quantity : totalQuantity})}>
        <View style={styles.btncheckout}>
          <View style={{flex : 2}}>
            <Text style={[FONTS.h3, {color : COLORS.white}]}>Continue ({cartItem.length} Items)</Text>
          </View>
          <View style={{flex : 1, alignItems : 'flex-end'}}>
                  <Text style={[FONTS.h3, {color : COLORS.white}]}> {totalPrice} INR   <Feather name="arrow-right" color="white" size={20} /></Text>
          </View>
        </View>
        </Pressable>
        ) : null}        
        
      </View>
    </View>
  );
};

export default Pesanan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: btnColor,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  titlebar: {
    padding: 15,
  },
  title: {
    color: WarnaAbu,
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
    textAlign: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: WarnaAbu,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  itemBx: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  img: {
    width: windowWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemimg: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.09,
    borderRadius: 10,
  },
  description: {
    width: windowWidth * 0.35,
    paddingLeft: 10,
  },
  quantity: {
    width: windowWidth * 0.25,
    justifyContent: 'space-between',
    height: windowHeight * 0.1,
    
  },
  iconContainer: {
    width: '28%',
    height: '80%',
    backgroundColor: WarnaAbu,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  plusminus : {
    justifyContent: 'space-between',
    flexDirection : 'row',
    alignItems: 'flex-end',
  },
  serviceName: {
    color: btnColor,
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
  },
  price: {
    paddingTop: 5,
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 15,
  },
  category: {
    color: 'grey',
    fontFamily: 'TitilliumWeb-Regular',
  },
 textInput : {
   backgroundColor : '#FF0000',
 },

 button: {
    alignItems: 'center',
    marginTop : 20
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: WarnaWarn,
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

  btncheckout : {
    paddingVertical : 20,
    paddingHorizontal : 10,
    backgroundColor : btnColor,
    width : '100%',
    borderRadius : 5,
    flexDirection : 'row'
   }
});
