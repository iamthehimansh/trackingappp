import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet ,
    FlatList,
    ToastAndroid,
    SafeAreaView,
    Pressable
} from 'react-native';
import  CommonHeader  from '../../component/CommonHeader';
import { btnColor, WarnaAbu } from '../../utils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PrintStatus = ({status}) => {
  return(
    <Text style={{alignSelf : 'flex-start'}}>{status}</Text>
  )
}


const checkStatus = (status) => {
  console.log(status);
  switch(status){
        case '1': return <PrintStatus status={'Ordered'}/>;
        case '2': return <PrintStatus status={'In Transit'}/>;
        case '3': return <PrintStatus status={'Pickup'}/>;
        case '4': return <PrintStatus status={'Delivered'}/>;
        case '6': return <PrintStatus status={'Cancelled'}/>
    }
}


  


const Card = ({navigation, data}) => {
    return(
      <Pressable onPress={() => navigation.navigate('Order-Details', {item : JSON.stringify(data)})}>
        <View style={[styles.cardContainer, styles.shadow]}>
            <View style={{flexDirection : 'row'}}>
                <View style={{flex : 4}}>
                    <Text style={{fontWeight : 'bold'}}>#{data.unique_code}</Text>
                    <Text>Rs. {data.amount}</Text>
                    <Text>{data.shipping_address} , {data.shipping_pin} ,{data.shipping_city}</Text>
                </View>
            </View>
            
             {/* SEPARATOR */}
             <View style={{borderTopWidth : .5, marginVertical : 10, borderTopColor : 'gray'}}></View>

             <View style={{flexDirection : 'row'}}>
                 <View style={{flex : 1}}>
                        {checkStatus(data.status)}
                 </View>
                 <View style={{flex : 1}}>
                    <Text style={{alignSelf : 'flex-end'}}>{data.date}</Text>
                 </View>
             </View>
        </View>
        </Pressable>
    );
}





const OrderHistory = ({navigation, route}) => {

    const renderItem = ({item }) => (
      <Card data={item} navigation={navigation} />
    );
    
    const [bookings, setBookings] = React.useState([]);

    
    React.useEffect(() => {
    AsyncStorage.getItem('userInfo').then((data) => {
        
    axios
      .get('/website/Services/my_bookings/' + JSON.parse(data).id)
      .then(res => {
        if (res.data.status == 1) {
          setBookings(res.data.bookings);
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


    return (
        <View style={styles.container}>
        <CommonHeader navigation={navigation} title={'My Orders'} route={route} />

        <View style={styles.footer}>
        <SafeAreaView style={{flex: 1, padding : 10}}>
                <FlatList
                data={bookings}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
        </SafeAreaView>
        </View>
      </View>
    );
};

export default OrderHistory;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor : btnColor
    },
    footer: {
        flex: 4,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // paddingHorizontal: 20,
        paddingVertical: 20
    },
    shadow: {
        shadowColor: "#00f",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation : 5
    },
    cardContainer : {
        backgroundColor : WarnaAbu,
        flex : 1,
        borderRadius : 20,
        paddingVertical : 10,
        paddingHorizontal : 10,
        marginBottom : 20
    }
  });