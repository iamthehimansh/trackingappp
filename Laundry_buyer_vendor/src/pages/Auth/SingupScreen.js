import React from 'react';
import { 
    View, 
    Text, 
    ToastAndroid, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    Pressable
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';

import axios from 'axios';

import {
    BarIndicator,
  } from 'react-native-indicators';
import { btnColor } from '../../utils';
import Reactotron from 'reactotron-react-native';


const SignupScreen = ({navigation}) => {

    const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

    const [data, setData] = React.useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        check_textInputChange: false,
        check_mobileChange: false,
        is_validMobile : true,
        is_validEmail : true,
        is_validPassword : true,
        check_emaileChange: false,
        check_textInputChange: false,
        secureTextEntry: true,
        loading : false
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                name: val,
                check_textInputChange: true
            });
                                                    
        } else {
            setData({
                ...data,
                name: val,
                check_textInputChange: false
            });
        }
    }


    const phoneInputChange = (val) => {
        if( val.length !== 0 ) {
            const reg = /^[0]?[789]\d{9}$/;
            if (reg.test(val) === false) {
                setData({
                    ...data,
                    mobile: val,
                    check_mobileChange: true,
                    is_validMobile : false
                });
                return false;
            }
            else {
                setData({
                    ...data,
                    mobile: val,
                    check_mobileChange: true,
                    is_validMobile : true
                }); 
            }                                           
        } else {
            setData({
                ...data,
                mobile: val,
                check_mobileChange: false
            });
        }
    }

    const emailInputChange = (val) => {
        if( val.length !== 0 ) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(val) === false) {
                setData({
                    ...data,
                    email: val,
                    check_emaileChange: true,
                    is_validEmail : false
                });
                return false;
            }
            else {
                setData({
                    ...data,
                    email: val,
                    check_emaileChange: true,
                    is_validEmail : true
                }); 
            }                                        
        } else {
            setData({
                ...data,
                email: val,
                check_emaileChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.length >= 4 ) {
            setData({
                ...data,
                password: val,
                is_validPassword : true,
            });    
        } else {
            setData({
                ...data,
                password: val,
                is_validPassword : false,
            });    
        }
        
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }


    const registerHandle = () => {
        if ( !data.is_validEmail || !data.is_validMobile || !data.check_textInputChange || !data.is_validPassword || !data.check_emaileChange || !data.check_mobileChange) {
            Alert.alert('Wrong Input!', 'Recheck all inputs', [
                {text: 'Okay'}
            ]);
            return;
        }else if(!toggleCheckBox){
             Alert.alert('Please note!','Please agree to our Terms & Condition', [
                {text: 'Okay'}
            ]);
            return;
        }
        // if () {
        //     Alert.alert('Please agree to our Terms & Condition', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        setData({
            ...data,
            loading : true
        })
        let body = "name=" + data.name + "&password=" + data.password + "&email=" + data.email + "&mobile=" + data.mobile;
        axios.post('/website/Services/save_otp', body)
          .then((response) => {
            setData({
                ...data,
                loading : false
            });
            ToastAndroid.showWithGravityAndOffset(
                response.data.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
              if (response.data.status == 1) {
                    setData({
                        ...data,
                        name: '',
                        mobile: '',
                        email: '',
                        password: '',
                        check_textInputChange: false,
                        check_mobileChange: false,
                        is_validMobile : true,
                        is_validEmail : true,
                        is_validPassword : true,
                        check_emaileChange: false,
                        check_textInputChange: false,
                        secureTextEntry: true,
                    });
                    navigation.navigate('Otp', {
                        name : data.name,
                        email : data.email,
                        mobile : data.mobile,
                        password : data.password
                    }) ;
               } 
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={btnColor} barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text_footer}>Full Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your First Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>


            
            
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Email</Text>
            <View style={styles.action}>
                <Feather 
                    name="mail"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => emailInputChange(val)}
                />
                {data.check_emaileChange && data.is_validEmail ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.is_validEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>The email you entered is not valid</Text>
            </Animatable.View>
            }


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Phone</Text>
            <View style={styles.action}>
                <Feather 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your phone number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => phoneInputChange(val)}
                />
            {data.check_mobileChange && data.is_validMobile ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.is_validMobile ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>The mobile you entered is not valid</Text>
            </Animatable.View>
            }



            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            
           

            {data.loading ? <BarIndicator color='black' /> : null}


            <View style={[styles.action, {flexDirection : 'row'}]}>
                    <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                <Pressable onPress={() => navigation.navigate('Terms')}>
                <Text style={[styles.text_footer]}>I agree to the <Text style={{fontWeight : "bold"}}>Terms & Conditions</Text></Text>
                </Pressable>
                
            </View>

            <View style={styles.button}>
            
            <TouchableOpacity style={styles.appButtonContainer} onPress={()=>  registerHandle()}>
                <Text style={styles.appButtonText}>
                    SIGNUP
                </Text>
            </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.replace('Login')}
                    style={[styles.signIn, {
                        borderColor: btnColor,
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: btnColor
                    }]}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: btnColor
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
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
        backgroundColor: btnColor,
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
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
  });