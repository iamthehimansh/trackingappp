import {Image, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {logo, logooriginal} from '../../assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
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
