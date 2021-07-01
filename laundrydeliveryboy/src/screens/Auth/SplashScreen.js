import {Image, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {logo} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('userInfo').then((data) => {
        if (data == null) {
          navigation.replace('Login');
        } else {
          navigation.replace('Home');
        }
      })
    }, 2000);
  }, [navigation]);

  return (
    <ImageBackground source={logo} style={styles.background}>
      
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 228,
    height: 115,
  },
});
