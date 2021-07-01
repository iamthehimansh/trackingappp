import {Dimensions, StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {WarnaUtama} from '../../utils';
import { Add_saldo, atm } from '../../assets';

const Saldo = ({balance, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.informasiSaldo}>
        <View style={styles.text}>
          <Text style={styles.labelSaldo}>Balance :</Text>
          <Text style={styles.valueSaldo}>Rs. {balance > 0 ? balance : 0}</Text>
        </View>
        {/* <View style={styles.text}>
          <Text style={styles.labelPoint}>Total Point :</Text>
          <Text style={styles.valuePoint}>100 point</Text>
        </View> */}
      </View>
      <View style={styles.bottomAksi}>
        <Pressable onPress={() => navigation.navigate('RequestMoney')}>
          <Image source={atm} />
        </Pressable>
      </View>
    </View>
  );
};

export default Saldo;

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 17,
    margin: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    // marginTop: -windowHeight * 0.05,
    flexDirection: 'row',
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informasiSaldo: {
    width: '60%',
  },
  labelSaldo: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20,
  },
  valueSaldo: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 20,
  },
  labelPoint: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 12,
  },
  valuePoint: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 12,
    color: WarnaUtama,
  },
  bottomAksi: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
});
