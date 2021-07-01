import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CommonHeader from '../../components/CommonHeader';
import {COLORS, FONTS} from '../../configs/theme';
import {WebView} from 'react-native-webview';

import Entypo from 'react-native-vector-icons/Entypo'

const SupportScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CommonHeader title="Contact Us" navigation={navigation} />

      <View style={styles.footer}>
        <WebView
          style={{maxHeight: 200, backgroundColor : COLORS.lightGray}}
          containerStyle={{maxHeight: 200}}
          source={{
            html:
              '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471218.38560188503!2d88.04952746944409!3d22.676385755547646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771160347adf%3A0x9fd70619f94d0bac!2sIndian%20Museum!5e0!3m2!1sen!2sin!4v1619073207258!5m2!1sen!2sin" width="100%" height="600" style="border :0;border-radius:20px" allowfullscreen="" loading="lazy" ></iframe>',
          }}
        />
              <View style={styles.card}>
                  <Text>
                      <Text style={FONTS.h2}>Wedify ~ </Text>
                      <Text style={FONTS.h3}> We do it for you</Text>
                  </Text>
                  <Text style={FONTS.body3}>Prafulla Kanon West, Kol- 700101</Text>
              </View>

              <View style={styles.card}>
                  <Text style={{ marginBottom: 10 }}>
                      <Text> <Entypo name="location" size={20}/> </Text>
                      <Text style={FONTS.h4}> Prafulla Kanon West, Kol- 700101</Text>
                  </Text>
                  <Text style={{marginBottom : 10}}>
                      <Text> <Entypo name="mobile" size={20} /> </Text>
                      <Text style={FONTS.h4}> +91 9876543210</Text>
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                      <Text> <Entypo name="mobile" size={20} /> </Text>
                      <Text style={FONTS.h4}> +91 9876543210</Text>
                  </Text>

                  <Text>
                      <Text> <Entypo name="mail" size={20} /> </Text>
                      <Text style={FONTS.h4}> wedify@gmail.com</Text>
                  </Text>
              </View>
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  footer: {
    flex: 4,
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginVertical : 20,
    borderRadius : 10
  },
});
