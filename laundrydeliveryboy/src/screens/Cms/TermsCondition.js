import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid
} from 'react-native';

import {WebView} from 'react-native-webview';
import CommonHeader from '../../components/CommonHeader';
import { COLORS } from '../../configs/theme';


const TermsScreen = ({navigation}) => {
 
  const [data, setData] = React.useState('');

  useEffect(() => {
    
  }, []);



  return (
    <View style={styles.container}>
      <CommonHeader title="Terms & Conditions" navigation={navigation} />
      <View style={styles.footer}>
        <WebView
          source={{
            html: data,
          }}
        />
      </View>
    </View>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  footer: {
    flex: 4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  }
 
});
