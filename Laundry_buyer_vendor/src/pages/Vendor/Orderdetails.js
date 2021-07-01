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
} from 'react-native';
import {
  WarnaAbu,
  windowWidth,
  windowHeight,
  btnColor,
  WarnaUtama,
  WarnaSekunder,
  WarnaDisable,
} from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {delivery, shirt, curtains} from '../../assets/images';
import {FONTS, COLORS} from '../../utils/theme';
import Gap from '../../component/Gap';

const OrderdetailsScreen = ({navigation, route}) => {

  const item = JSON.parse(route.params.item);
  console.log(item);

  return (
    <ScrollView style={styles.container}>

      {item.details.map((service, i) => 
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
        {/* <View
          style={{
            borderBottomColor: COLORS.lightGray,
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}>
          <Text style={FONTS.h3}>Shipping Details</Text>
        </View>
        <Gap height={10} />
        <Text style={FONTS.h4}>{item.name}</Text>
        <Text style={FONTS.body4}>{item.email}, +91 {item.mobile}</Text>
        <Text style={FONTS.body4}>
            {item.shipping_address}, {item.shipping_city}, {item.shipping_pin}
        </Text> */}

        <Text style={FONTS.body3}>Delivery Date : {item.date}</Text>
      </View>

      <View style={styles.card}>
        <View
          style={{
            borderBottomColor: COLORS.lightGray,
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}>
          <Text style={FONTS.h3}>Payment</Text>
        </View>
        <Gap height={10} />
        {/* <View style={styles.row}>
          <View style={styles.col('80%')}>
            <Text style={FONTS.h4}>Subtotal</Text>
          </View>
          <View style={[styles.col('20%'), {alignItems: 'flex-end'}]}>
            <Text style={FONTS.h4}>
              <FontAwesome name="rupee" /> {item.amount - item.delivery_charge}
            </Text>
          </View>
        </View> */}
        {/* <View style={styles.row}>
          <View style={styles.col('80%')}>
            <Text style={FONTS.h4}>Delivery Charge</Text>
          </View>
          <View style={[styles.col('20%'), {alignItems: 'flex-end'}]}>
            <Text style={FONTS.h4}>
              <FontAwesome name="rupee" /> {item.delivery_charge}
            </Text>
          </View>
        </View> */}

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
      </View>
    </ScrollView>
  );
};

export default OrderdetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WarnaAbu,
    flex: 1,
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
