import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  btnColor,
  windowWidth,
  windowHeight,
  WarnaAbu,
  WarnaSekunder,
  WarnaWarn,
} from '../../utils';
import {arrow_right, headerdark} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Akun = ({navigation, route}) => {
  const [userdata, setUserdata] = React.useState({});
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      let data = await AsyncStorage.getItem('userInfo');
      setUserdata(JSON.parse(data));
      console.log(userdata);
    } catch (e) {
      // read error
    }
  };

  const logout = () => {
    AsyncStorage.removeItem('userInfo').then(() => {
      navigation.replace('Login');
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ImageBackground source={headerdark} style={styles.header}>
          <Animatable.Text
            animation={'slideInLeft'}
            delay={200}
            style={{
              color: '#FFFFFF',
              fontFamily: 'TitilliumWeb-Bold',
              fontSize: 25,
            }}>
            {userdata.name}
          </Animatable.Text>
          <Animatable.Text
            delay={200}
            animation={'slideInRight'}
            style={{color: '#FFFFFF', fontFamily: 'TitilliumWeb-Regular'}}>
            {userdata.email}
          </Animatable.Text>
          <Image
            source={{uri: userdata.image}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderColor: WarnaWarn,
              borderWidth: 2,
              position: 'absolute',
              top: '80%',
            }}
          />
        </ImageBackground>

        <View style={styles.footer}>
          <Pressable onPress={() => navigation.navigate('EditProfile')}>
            <Animatable.View
              animation={'zoomIn'}
              style={[styles.shadow, styles.itemList]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <FontAwesome name="edit" color={WarnaWarn} size={30} />
              </View>
              <View style={{flex: 6, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Edit Profile</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Image
                  source={arrow_right}
                  style={{
                    width: 30,
                    height: 20,
                  }}
                />
              </View>
            </Animatable.View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Myaddress')}>
            <Animatable.View
              animation={'zoomIn'}
              style={[styles.shadow, styles.itemList]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <FontAwesome name="address-book" color={WarnaWarn} size={30} />
              </View>
              <View
                animation={'zoomIn'}
                style={{flex: 6, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>My Address</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Image
                  source={arrow_right}
                  style={{
                    width: 30,
                    height: 20,
                  }}
                />
              </View>
            </Animatable.View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('PasswordReset')}>
            <Animatable.View
              animation={'zoomIn'}
              style={[styles.shadow, styles.itemList]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <FontAwesome name="history" color={WarnaWarn} size={30} />
              </View>
              <View style={{flex: 6, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Change Password</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Image
                  source={arrow_right}
                  style={{
                    width: 30,
                    height: 20,
                  }}
                />
              </View>
            </Animatable.View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('OrderHistory')}>
            <Animatable.View
              animation={'zoomIn'}
              style={[styles.shadow, styles.itemList]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <FontAwesome name="edit" color={WarnaWarn} size={30} />
              </View>
              <View style={{flex: 6, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Order History</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Image
                  source={arrow_right}
                  style={{
                    width: 30,
                    height: 20,
                  }}
                />
              </View>
            </Animatable.View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('SubscriptionHistory')}>
            <Animatable.View
              animation={'zoomIn'}
              style={[styles.shadow, styles.itemList]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <FontAwesome name="history" color={WarnaWarn} size={30} />
              </View>
              <View style={{flex: 6, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Subscription History</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Image
                  source={arrow_right}
                  style={{
                    width: 30,
                    height: 20,
                  }}
                />
              </View>
            </Animatable.View>
          </Pressable>


          <Pressable onPress={() => navigation.navigate('Ticket')}>
            <Animatable.View
              animation={'zoomIn'}
              style={[styles.shadow, styles.itemList]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <FontAwesome name="support" color={WarnaWarn} size={30} />
              </View>
              <View style={{flex: 6, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Raise a Ticket</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Image
                  source={arrow_right}
                  style={{
                    width: 30,
                    height: 20,
                  }}
                />
              </View>
            </Animatable.View>
          </Pressable>

          <Pressable onPress={() => logout()}>
            <Animatable.View
              animation={'zoomIn'}
              style={[styles.shadow, styles.itemList]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <FontAwesome name="sign-out" color={WarnaWarn} size={30} />
              </View>
              <View style={{flex: 6, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Logout</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Image
                  source={arrow_right}
                  style={{
                    width: 30,
                    height: 20,
                  }}
                />
              </View>
            </Animatable.View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Akun;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WarnaAbu,
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.37,
    paddingHorizontal: 30,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 5,
    paddingTop: '15%',
  },
  shadow: {
    shadowColor: '#00f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // elevation: 5,
  },
  itemList: {
    padding: 15,
    margin: 10,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: WarnaSekunder,
  },
});
