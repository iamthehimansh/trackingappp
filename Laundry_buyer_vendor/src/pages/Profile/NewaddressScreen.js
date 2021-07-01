import React , {useEffect} from 'react';
import { 
    View, 
    Text, 
    Alert,
    StyleSheet ,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { CommonHeader } from './index';


import { COLORS, SIZES, FONTS, images, icons } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



const NewaddressScreen = ({navigation, route}) => {

    const [data, setData] = React.useState({
        phone: '',
        alterphone: '',
        city: '',
        state : '',
        pincode : '',
        address : ''
    });

    useEffect(() => {
        getuser();
    }, []);

    const getuser = async() => {
        let userToken = await AsyncStorage.getItem('userInfo');
        userToken = JSON.parse(userToken);
        setData({
            phone : userToken.phone,
            alterphone : userToken.alterphone,
            city : userToken.city,
            state : userToken.state,
            pincode : userToken.pincode,
            address : userToken.address
        })
    }

    const updateHandle =async () => {
        console.log(data);
        let userToken = await AsyncStorage.getItem('userInfo');
        userToken = JSON.parse(userToken);
        // if ( data.oldpassword == '' || data.password == '' || data.confirm_password == '' ) {
        //     Alert.alert('Wrong Input!', 'Any fields cannot be empty.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + userToken.userToken
            },
            body: JSON.stringify(data)
        };
        fetch("http://103.145.50.200:4000/api/user/" + userToken._id, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if (result.success) {
                    Alert.alert('Wow!', result.message, ['Ok']);
                    navigation.goBack();
                } else {
                    Alert.alert('Oops!', result.message, ['Ok']);
                }
            },
            (error) => {
            
            }
        )

    }


    return (
      <View style={styles.container}>
        <CommonHeader navigation={navigation} title={'Add New Address'} route={route}/>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding : 20}}>
            <Text style={styles.text_footer}>Phone Number</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    style={styles.textInput}
                    keyboardType = 'phone-pad'
                    value={data.phone}
                    onChangeText={(val) => setData({
                        ...data,
                        phone : val
                    })}
                />
            </View>


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Alternative Phone Number</Text>
            <View style={styles.action}>
                <Feather 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={data.alterphone}
                    onChangeText={(val) => setData({
                        ...data,
                        alterphone : val
                    })}
                />
               
            </View>


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Pincode</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="location-arrow"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={data.pincode}
                    onChangeText={(val) => setData({
                        ...data,
                        pincode : val
                    })}
                />
            </View>


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Town / City</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="city"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={data.city}
                    onChangeText={(val) => setData({
                        ...data,
                        city : val
                    })}
                />
            </View>


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>State</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="globe"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={data.state}
                    onChangeText={(val) => setData({
                        ...data,
                        state : val
                    })}
                />
            </View>


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Address</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="search-location"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={data.address}
                    onChangeText={(val) => setData({
                        ...data,
                        address : val
                    })}
                />
            </View>


          
            <View style={[styles.button, {marginBottom : 30}]}>
                <TouchableOpacity style={styles.appButtonContainer} onPress={()=>updateHandle()}>
                    <Text style={styles.appButtonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
    );
};

export default NewaddressScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor : COLORS.white,
    },
    shadow: {
        shadowColor: "#00f",
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
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#4ca9c8",
        borderRadius: 10,
        width: '100%',
        height: 50,
        justifyContent: 'center',
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
  });