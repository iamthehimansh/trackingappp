import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import {
  WarnaAbu,
  windowWidth,
  windowHeight,
  btnColor,
  WarnaSekunder
} from '../../utils';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {delivery} from '../../assets/images';
import {FONTS} from '../../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DashboardScreen = ({navigation}) => {

  const [bookings, setBookings] = React.useState([]);

    
    React.useEffect(() => {
    AsyncStorage.getItem('vendorInfo').then((data) => {
        console.log(data);
    axios
      .get('/vendor/VendorsApi/get_home_data/'+ JSON.parse(data).vendor_id)
      .then(res => {
        if (res.data.status == 1) {
          setBookings(res.data.dashboard_data);
          console.log(bookings.latest_bookings);
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
    }, []);

  const logout = () => {
    AsyncStorage.removeItem('vendorInfo');
    navigation.replace('Login');
  }


  const checkStatus = (status) => {
  console.log(status);
  switch(status){
        case '1': return 'Ordered';
        case '2': return 'In Transit';
        case '3': return 'Pickup';
        case '4': return 'Delivered';
        case '6': return 'Cancelled'
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagecard}>
        <View style={styles.header}>
          <View style={{flex: 1}}>
            <Text style={FONTS.h3}>Dashboard</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', flexDirection : 'row', justifyContent : 'flex-end'}}>
            <Pressable onPress={() => navigation.navigate('VendorProfile')} style={{marginRight : 15}}>
                <Entypo name="user" size={20} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('VendorTicketArise')} style={{marginRight : 15}}>
                <MaterialIcons name="support-agent" size={20} />
            </Pressable>
            <Pressable onPress={() => logout()}>
                <Entypo name="log-out" size={20} />
            </Pressable>
          </View>
        </View>

        <View style={styles.banner}>
          <Image
            source={{
              uri:
                'https://us.123rf.com/450wm/belchonock/belchonock2007/belchonock200713310/156390797-collage-with-photos-of-plumber-on-white-background-banner-design.jpg?ver=6',
            }}
            resizeMode="stretch"
            style={{
              width: '100%',
              height: (windowHeight * 18) / 100,
              borderRadius: 5,
            }}
          />
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Pressable onPress={() => navigation.navigate('Orders')}>
          <View style={styles.cardContainer}>
            <View style={styles.smallCard}>
              <Entypo name="shopping-bag" size={40} color={'black'} />
            </View>
            <View style={styles.cardText}>
              <Text style={{fontSize: 16, fontFamily: 'TitilliumWeb-Bold'}}>
                Orders
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Products')}>
          <View style={styles.cardContainer}>
            <View style={styles.smallCard}>
              <MaterialIcons
                name="local-laundry-service"
                size={40}
                color={'black'}
              />
            </View>
            <View style={styles.cardText}>
              <Text style={{fontSize: 16, fontFamily: 'TitilliumWeb-Bold'}}>
                Services
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Report')}>
          <View style={styles.cardContainer}>
            <View style={styles.smallCard}>
              <MaterialIcons name="bar-chart" size={40} color={'black'} />
            </View>
            <View style={styles.cardText}>
              <Text style={{fontSize: 16, fontFamily: 'TitilliumWeb-Bold'}}>
                Report
              </Text>
            </View>
          </View>
        </Pressable>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
        }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.col2}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="scale"
              source={delivery}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Text style={{fontSize: 25, color: WarnaAbu}}>{bookings.active_bookings}</Text>
              <Text style={{fontSize: 18, color: WarnaAbu}}>Active Orders</Text>
            </ImageBackground>
          </View>
          <View style={styles.col2}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="scale"
              source={delivery}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Text style={{fontSize: 25, color: WarnaAbu}}>{bookings.delivered_bookings}</Text>
              <Text style={{fontSize: 18, color: WarnaAbu}}>Deliverd Orders</Text>
            </ImageBackground>
          </View>
          <View style={styles.col2}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="scale"
              source={delivery}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Text style={{fontSize: 25, color: WarnaAbu}}>{bookings.total_earnings}</Text>
              <Text style={{fontSize: 18, color: WarnaAbu}}>Total Earning</Text>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <Text style={{fontSize: 22, fontFamily: 'TitilliumWeb-Bold'}}>
          Recent Bookings
        </Text>
        <View
          style={{
            backgroundColor: '#ffffff',
            height: 40,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginBottom: 5,
            marginTop: 20,
          }}>
          <View style={styles.tableCol}>
            <Text style={[styles.tabletext, {fontFamily: 'TitilliumWeb-Bold'}]}>
              Booking Id
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tabletext, {fontFamily: 'TitilliumWeb-Bold'}]}>
              Date
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tabletext, {fontFamily: 'TitilliumWeb-Bold'}]}>
              Amount
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tabletext, {fontFamily: 'TitilliumWeb-Bold'}]}>
              Status
            </Text>
          </View>
        </View>

        {bookings.latest_bookings && bookings.latest_bookings.map((item, i) =>  
        <View
          key={i}
          style={{
            backgroundColor: WarnaSekunder,
            height: 40,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginBottom: 5,
          }}>
          <View style={styles.tableCol}>
            <Text style={styles.tabletext}>{item.unique_code}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tabletext}>{item.date}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tabletext}>{item.shop_amount} /-</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tabletext}>{checkStatus(item.status)}</Text>
          </View>
        </View>
       
        )}
        
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WarnaAbu,
    flex: 1,
  },
  imagecard: {
    backgroundColor: btnColor,
    height: (windowHeight * 30) / 100,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
  },
  banner: {
    padding: 10,
  },
  smallCard: {
    height: 80,
    backgroundColor: '#faac3a85',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: 100,
  },
  cardText: {
    padding: 5,
    alignItems: 'center',
  },
  col2: {
    width: windowWidth / 2.5,
    height: 150,
    backgroundColor: '#4fb9b461',
    marginBottom: 20,
    borderRadius: 10,
    marginRight: 20,
  },
  tableCol: {
    width: '25%',
    alignItems: 'flex-start',
  },
  tabletext: {
    fontSize: 11,
  },
});
