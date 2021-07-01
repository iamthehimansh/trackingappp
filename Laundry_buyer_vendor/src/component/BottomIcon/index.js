import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';


import {WarnaSekunder, windowWidth, windowHeight} from '../../utils';
import Reactotron from 'reactotron-react-native'

const BottomIcon = ({categories, type, navigation}) => {
  // Reactotron.log(categories);
  return (
    categories && categories.length>0 ?
      categories.map((item, i) => 
        <TouchableOpacity style={styles.container(type)} key={i}>
          <View style={styles.button(type)}>
            {/* <Icon /> */}
            <Image source={{uri: item.image}} style={styles.images}/>
          </View>
          <Text style={styles.text(type)}>{item.name}</Text>
        </TouchableOpacity>
      )
      : null
    
  );
};

export default BottomIcon;

const styles = StyleSheet.create({
  container: (type) => ({
    marginBottom: type === 'layanan' ? 12 : 0,
    marginRight: type === 'layanan' ? 10 : 0,
  }),
  text: (type) => ({
    fontSize: 10,
    fontFamily:
      type === 'layanan' ? 'TitilliumWeb-Light' : 'TitilliumWeb-Regular',
    textAlign: 'center',
  }),
  button: (type) => ({
    backgroundColor: WarnaSekunder,
    padding: type === 'layanan' ? 12 : 7,
    borderRadius: 10,
  }),
  images : {
    width : windowWidth/6.5,
    height : 50,
    borderRadius : 10
  }

});
