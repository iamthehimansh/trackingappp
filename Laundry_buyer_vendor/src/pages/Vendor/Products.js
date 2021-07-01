import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  ToastAndroid
} from 'react-native';
import {
  WarnaAbu,
  WarnaSekunder
} from '../../utils';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {shirt} from '../../assets/images';
import {FONTS, COLORS} from '../../utils/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductScreen = ({navigation}) => {

  const [bookings, setBookings] = React.useState([]);

    
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('vendorInfo').then((data) => {
          console.log(data);
        axios
        .get('/vendor/VendorsApi/fetch_service_by_item/'+ JSON.parse(data).vendor_id )
        .then(res => {
          if (res.data.status == 1) {
            setBookings(res.data.service);
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
      });

      return () => {
        // Unsubscribe for the focus Listener
        unsubscribe;
      };
    }, [navigation]);


  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.searchBox}>
        <View style={styles.action}>
          <TextInput
            placeholder="Search Product..."
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <MaterialIcons name="search" color="grey" size={24} />
        </View>
      </View> */}

      <View style={styles.productsContainer}>
        <View
          style={{
            height: 40,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginBottom: 5,
            marginTop: 20,
          }}>
          <View style={[styles.tableCol, {width : '40%'}]}>
            <Text style={[styles.tabletext, {fontFamily: 'TitilliumWeb-Bold'}]}>
              Service
            </Text>
          </View>
          <View style={[styles.tableCol, { width: '20%' }]}>
            <Text style={[styles.tabletext, {fontFamily: 'TitilliumWeb-Bold'}]}>
              Item
            </Text>
          </View>
          <View style={[styles.tableCol, { width: '30%' }]}>
            <Text style={[styles.tabletext, {fontFamily: 'TitilliumWeb-Bold'}]}>
              Price
            </Text>
          </View>
          <View style={[styles.tableCol, { width: '10%' }]}>
            <Text style={[styles.tabletext, {fontFamily: 'TitilliumWeb-Bold'}]}>
              Action
            </Text>
          </View>
        </View>
        
        {bookings.map((item, i) => 
          <View key={i} style={styles.productrow}>
              <View style={[styles.tableCol, { width: '40%', flexDirection : "row" }]}>
                <Image source={{uri : item.image}} style={{width : 20, height : 20, borderRadius : 20, marginRight : 10}}/>
                <Text style={styles.tabletext}>{item.name}</Text>
              </View>
              <View style={[styles.tableCol, { width: '20%' }]}>
                <Text style={styles.tabletext}>{item.item_name}</Text>
              </View>
              <View style={[styles.tableCol, { width: '30%' }]}>
                <Text style={styles.tabletext}>{item.price} /-</Text>
              </View>
              <View style={[styles.tableCol, { width: '10%' }]}>
                <Entypo onPress={() => navigation.navigate('Editservice', {service : JSON.stringify(item)})} name="dots-three-horizontal" size={24} />
              </View>
        </View>
        )}
      
       </View>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WarnaAbu,
    flex: 1,
  },
  searchBox: {
    padding: 20,
    backgroundColor: COLORS.white,
    margin: 10,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  productsContainer: {
    marginHorizontal: 10,
  },
  tableCol: {
    alignItems: 'flex-start',
  },
  tabletext: {
    fontSize: 11,
  },
  productrow: {
    backgroundColor: WarnaSekunder,
    height: 40,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
});
