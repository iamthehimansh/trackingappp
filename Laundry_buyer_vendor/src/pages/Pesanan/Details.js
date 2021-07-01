import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {windowWidth, windowHeight} from '../../utils';
import {heart, heart_full, leftarrow, btnbackground} from '../../assets';
import HTML from 'react-native-render-html';

const Detail = ({navigation, route}) => {
  const item = JSON.parse(route.params.item);
  console.log(item);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: item.image,
        }}
        resizeMode="cover"
        style={styles.serviceimg}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              source={leftarrow}
              style={[styles.headerIcon, {marginLeft: 10}]}
            />
          </Pressable>
          <Image
            resizeMode="contain"
            style={[styles.headerIcon, {marginRight: 10}]}
            source={heart}
          />
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.name_price}>
          <View style={styles.name}>
            <Text style={styles.nametxt}>{item.name.toUpperCase()}</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.nametxt}>${item.price}</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.description}>
            <HTML source={{html: item.service_offered}} />
            <Text style={styles.subheader}>Service Avaibility</Text>
            <HTML source={{html: item.service_availibility}} />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btncontainer}
            onPress={() => navigation.navigate('Booking', { item: JSON.stringify(item) })}>
            <ImageBackground
              source={btnbackground}
              style={styles.btnbackground}>
              <Text style={styles.btntext}>Book Service</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  serviceimg: {
    width: windowWidth,
    height: windowHeight / 2.4,
  },
  header: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-between',
    paddingTop: windowHeight / 25,
  },
  headerIcon: {
    width: 25,
    tintColor: '#666666',
  },
  content: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 30,
    position: 'relative',
    top: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: windowHeight - windowHeight / 2.4,
  },
  name_price: {
    flexDirection: 'row',
  },
  name: {
    width: '80%',
  },
  price: {
    width: '20%',
    alignItems: 'flex-end',
  },
  nametxt: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 25,
  },
  description: {
    flex: 1,
    paddingVertical: 20,
    fontFamily: 'TitilliumWeb-Regular',
  },
  footer: {
    alignItems: 'center',
  },
  btncontainer: {
    width: windowWidth / 1.4,
    borderRadius: 20,
    height: 50,
    overflow: 'hidden',
    marginTop: 20,
  },
  btnbackground: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntext: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
    color: '#FFFFFF',
  },
  subheader: {
    fontFamily: 'TitilliumWeb-Bold',
    marginBottom: 10,
  },
});
