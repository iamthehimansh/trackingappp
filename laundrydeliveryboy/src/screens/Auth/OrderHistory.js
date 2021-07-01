import React from 'react';
import { 
    View, 
    Text, 
    Image,
    StyleSheet ,
    SafeAreaView,
    FlatList
} from 'react-native';
import { COLORS } from '../../configs/theme';
import CommonHeader from '../../components/CommonHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { orderHistory } from '../../services/auth-service';

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


const Card = ({data}) => {
    console.log(data);
    return(
        <View style={[styles.cardContainer, styles.shadow]}>
            <View style={{flexDirection : 'row'}}>
                <View style={{flex : 4}}>
                    <Text style={{fontWeight : 'bold'}}>#{data.unique_code}</Text>
                    <Text>Rs. {data.amount}</Text>
                    <Text>{data.shipping_address} , {data.shipping_pin} ,{data.shipping_city}</Text>
                </View>
            </View>
            

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
    );
}

const renderItem = ({item}) => (
    <Card data={item}/>
  );





const OrderHistory = ({navigation, route}) => {

    const [bookings, setBookings] = React.useState([]);

    React.useEffect(() => {
        AsyncStorage.getItem('userInfo').then((data) => {
        let body = "user_id=" + JSON.parse(data).id;
        orderHistory(body).then((res) => {
            setBookings(res.result);
        });
        console.log(bookings);
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
      backgroundColor : COLORS.primary
    },
    footer: {
        flex: 4,
        backgroundColor: COLORS.lightGray,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation : 5
    },
    cardContainer : {
        backgroundColor : COLORS.white,
        flex : 1,
        borderRadius : 20,
        paddingVertical : 10,
        paddingHorizontal : 10,
        marginBottom : 20
    }
  });