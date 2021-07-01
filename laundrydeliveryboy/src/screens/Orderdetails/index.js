import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Button, ToastAndroid} from 'react-native';
import CommonHeader from '../../components/CommonHeader';
import {COLORS, FONTS} from '../../configs/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { orderDetails, statusUpdate } from '../../services/auth-service';
import {Picker} from '@react-native-picker/picker';

const OrderdetailsScreen = ({navigation, route}) => {
  const item = JSON.parse(route.params.item);
  
  const [status, setStatus] = React.useState(item.status);

  const [bookings, setBookings] = React.useState([]);

  const toggleSwitch = () => {
    console.log(status);
    let body = "booking_id=" + item.id + "&status="+ status;
    statusUpdate(body).then((res) => {
      ToastAndroid.showWithGravityAndOffset(
            res.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
      );

        if (res.status == '1') {
          orderdetails();
        } 
    });
  };

  React.useEffect(() => {
      orderdetails();
    }, []);


    const orderdetails = () => {
      let body = "booking_id=" + item.id;
      orderDetails(body).then((res) => {
        setBookings(res.products);
      });
    }


  return (
    <View style={styles.container}>
      <CommonHeader title="Order Details" navigation={navigation} />

      <View style={styles.footer}>
        <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.col('70%')}>
                  <Picker
                    selectedValue={status}
                    itemStyle={{fontWeight: 'bold', color: '#ff0000'}}
                    style={styles.textInput}
                    onValueChange={(itemValue, itemIndex) =>
                      setStatus(itemValue)
                    }>
                    <Picker.Item
                      label="Pick Up"
                      value="3"
                    />
                    <Picker.Item
                      label="In Transit"
                      value="2"
                    />
                    <Picker.Item
                      label="Delivered"
                      value="4"
                    />
                       
                  </Picker>
              </View>
              <View style={[styles.col('30%'), {alignItems : 'flex-end', justifyContent : 'center'}]}>
                    <Button title='Update' color={COLORS.secondary} onPress={() => toggleSwitch()}></Button>
              </View>
            </View>
        </View>


        <ScrollView>
          {bookings.map((service, i) => 
            <View key={i} style={styles.card}>
              <View style={styles.row}>
                <View style={styles.col('30%')}>
                  <Image
                    source={{uri : service.service_image}}
                    style={{width: '100%', height: 60}}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.col('70%')}>
                  <View>
                    <Text style={FONTS.body3}>{service.item_name} </Text>
                    <Text style={FONTS.h4}>{service.service_name}</Text>
                    <Text style={FONTS.body4}>Quantity : {service.quantity}</Text>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text>
                      <Text>
                        <FontAwesome name="rupee" size={20} />
                      </Text>
                      <Text style={FONTS.h2}>{service.main_price}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={styles.card}>
            <View
              style={{
                borderBottomColor: COLORS.lightGray,
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}>
              <Text style={FONTS.h3}>Customer Details</Text>
            </View>
            {/* <Gap height={10} /> */}
            <Text style={FONTS.h4}>{item.name}</Text>
            <Text style={FONTS.body4}>{item.email}, +91 {item.mobile}</Text>
            <Text style={FONTS.body4}>
                {item.shipping_address}, {item.shipping_city}, {item.shipping_pin}
            </Text>

            <Text style={FONTS.body3}>Delivery Date : {item.date}</Text>
          </View>

          {/* <View style={styles.card}>
            <View
              style={{
                borderBottomColor: COLORS.lightGray,
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}>
              <Text style={FONTS.h3}>Payment</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.col('80%')}>
                <Text style={FONTS.h4}>Subtotal</Text>
              </View>
              <View style={[styles.col('20%'), {alignItems: 'flex-end'}]}>
                <Text style={FONTS.h4}>
                  <FontAwesome name="rupee" /> {item.amount - item.delivery_charge}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col('80%')}>
                <Text style={FONTS.h4}>Delivery Charge</Text>
              </View>
              <View style={[styles.col('20%'), {alignItems: 'flex-end'}]}>
                <Text style={FONTS.h4}>
                  <FontAwesome name="rupee" /> {item.delivery_charge}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.row,
                {borderTopWidth: 1, borderTopColor: COLORS.lightGray},
              ]}>
              <View style={styles.col('80%')}>
                <Text style={FONTS.h4}>Payable Amount</Text>
              </View>
              <View style={[styles.col('20%'), {alignItems: 'flex-end'}]}>
                <Text style={FONTS.h4}>
                  <FontAwesome name="rupee" /> {item.amount}
                </Text>
              </View>
            </View>
          </View> */}
        </ScrollView>
  
      </View>
    </View>
  );
};

export default OrderdetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  footer: {
    flex: 4,
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    margin: 10,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  col: width => ({
    width: width,
    padding: 10,
  }),
});
