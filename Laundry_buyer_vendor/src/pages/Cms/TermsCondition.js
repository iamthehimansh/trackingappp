import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid
} from 'react-native';

import CommonHeader from '../../component/CommonHeader';
import {btnColor} from '../../utils';
import HTML from 'react-native-render-html';

import axios from 'axios';

const TermsScreen = ({navigation, route}) => {
 
  const [data, setData] = React.useState('');

  useEffect(() => {
    axios
        .get('/website/Services/check_treams_condition')
        .then(res => {
          if (res.data.status == 1) {
            setData(res.data.data);
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
  }, []);



  return (
    <View style={styles.container}>
      <CommonHeader title="Terms & Conditions" navigation={navigation} />
      <View style={styles.footer}>
            <HTML source={{html: data}} />
      </View>
    </View>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: btnColor,
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
