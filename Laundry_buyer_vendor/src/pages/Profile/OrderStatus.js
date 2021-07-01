import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import {
    btnColor, WarnaWarn,
} from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {FONTS, COLORS} from '../../utils/theme';
import Gap from '../../component/Gap';
import CommonHeader from '../../component/CommonHeader';
import Timeline from 'react-native-timeline-flatlist'


const OrderStatus = ({navigation}) => {

 const data = [
      {time: '09:00', title: 'Order Placed', description: 'Event 1 Description',lineColor : 'green'},
      {time: '10:45', title: 'Order Accepted', description: 'Event 2 Description',lineColor : 'green'},
      {time: '12:00', title: 'Picked Up', description: 'Event 3 Description',lineColor : 'green'},
      {time: '14:00', title: 'Received', description: 'Event 4 Description',lineColor : COLORS.gray , circleColor : COLORS.gray },
      {time: '16:30', title: 'Processing', description: 'Event 5 Description',lineColor : COLORS.gray, circleColor : COLORS.gray },
      {time: '16:30', title: 'Dispatched', description: 'Event 5 Description',lineColor : COLORS.gray, circleColor : COLORS.gray },
      {time: '16:30', title: 'In Transit', description: 'Event 5 Description',lineColor : COLORS.gray, circleColor : COLORS.gray },
      {time: '16:30', title: 'Delivered', description: 'Event 5 Description',lineColor : COLORS.gray, circleColor : COLORS.gray }
    ];


  

  return (
    <View style={styles.container}>
      <CommonHeader navigation={navigation} title={'My Orders'} />
      <View style={styles.footer}>
        <Timeline
          //..other props
          data={data}
          circleSize={20}
          circleColor='green'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor: WarnaWarn, color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5, marginTop : 30}
          }}
        />
      </View>
    </View>
    
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    backgroundColor: btnColor,
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
  footer: {
        flex: 4,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
});
