import React from 'react';
import { 
    View, 
    Text, 
    Image,
    StyleSheet ,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Pressable,
    ToastAndroid,
    SafeAreaView
} from 'react-native';
import  CommonHeader  from '../../component/CommonHeader';
import { btnColor, WarnaAbu } from '../../utils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



  


const Card = ({navigation, data}) => {
    return(
        <View style={[styles.cardContainer, styles.shadow]}>
            <View style={{flexDirection : 'row'}}>
                <View style={{flex : 4}}>
                    <Text style={{fontWeight : 'bold'}}>{data.service_name}</Text>
                    <Text>Used Quantity : {data.used_quantity}</Text>
                    <Text>Remaining Quantity : {data.total_quantity - data.used_quantity}</Text>
                </View>
            </View>
        </View>
    );
}

const renderItem = ({item}) => (
    <Card data={item}/>
  );



const SubscriptionHistory = ({navigation, route}) => {
    const [bookings, setBookings] = React.useState([]);

    
    React.useEffect(() => {
    AsyncStorage.getItem('userInfo').then((data) => {
        
    axios
      .get('/website/Services/used_subscription_details/' + JSON.parse(data).id)
      .then(res => {
        if (res.data.status == 1) {
          setBookings(res.data.subscription);
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
        <CommonHeader navigation={navigation} title={'Active Subscription'} route={route} />

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

export default SubscriptionHistory;

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
        paddingHorizontal: 20,
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