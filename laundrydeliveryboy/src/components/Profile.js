import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedScrollView from './AnimatedScrollView';
import {COLORS, SIZES, FONTS} from '../configs/theme';
import {useTabBar} from '../contexts/TabBarProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Profile = ({navigation}) => {
  const {setShowTabBar, showTabBar} = useTabBar();
  const [userdata, setUserdata] = React.useState({});
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkLogin();
      setShowTabBar(true);
      
      console.log(showTabBar);
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }, [navigation]);

  const checkLogin = async () => {
    try {
      let data = await AsyncStorage.getItem('userInfo');
      setUserdata(JSON.parse(data));
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
    <AnimatedScrollView style={styles.container}>
      <View style={styles.footer}>
        <View
          style={{
            alignItems: 'center',
            position: 'relative',
            top: -70,
          }}>
          <Image
            source={{
              uri:
                'https://img.dtnext.in/Articles/2020/May/202005121714341845_Delhi-pizza-delivery-boy-recovers-from-COVID19-discharged_SECVPF.gif',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          />
          <Text style={[FONTS.h3, {marginTop: SIZES.base}]}>{userdata.name}</Text>
          <Text style={FONTS.h4}>{userdata.email}</Text>
        </View>

        <Pressable onPress={() => navigation.navigate('EditProfile')}>
          <View style={[styles.menuitem, styles.shadow]}>
            <View style={{flex: 1}}>
              <FontAwesome name="user-o" size={20} />
            </View>
            <View style={{flex: 7}}>
              <Text style={FONTS.h4}>Edit Profile</Text>
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('ChangePassword')}>
          <View style={[styles.menuitem, styles.shadow]}>
            <View style={{flex: 1}}>
              <FontAwesome name="edit" size={20} />
            </View>
            <View style={{flex: 7}}>
              <Text style={FONTS.h4}>Change Password</Text>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('History')}>
          <View style={[styles.menuitem, styles.shadow]}>
            <View style={{flex: 1}}>
              <FontAwesome name="history" size={20} />
            </View>
            <View style={{flex: 7}}>
              <Text style={FONTS.h4}>History</Text>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('RaiseTicket') }>
          <View style={[styles.menuitem, styles.shadow]}>
            <View style={{flex: 1}}>
              <MaterialIcons name="support-agent" size={20} />
            </View>
            <View style={{flex: 7}}>
              <Text style={FONTS.h4}>Raise A Ticket</Text>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Support') }>
          <View style={[styles.menuitem, styles.shadow]}>
            <View style={{flex: 1}}>
              <FontAwesome name="support" size={20} />
            </View>
            <View style={{flex: 7}}>
              <Text style={FONTS.h4}>Support</Text>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => logout()}>
          <View style={[styles.menuitem, styles.shadow]}>
            <View style={{flex: 1}}>
              <FontAwesome name="sign-out" size={20} />
            </View>
            <View style={{flex: 7}}>
              <Text style={FONTS.h4}>log Out</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </AnimatedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
  },
  footer: {
    flex: 4,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 100,
  },
  menuitem: {
    width: SIZES.width - 40,
    padding: 15,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  
});

export default Profile;
