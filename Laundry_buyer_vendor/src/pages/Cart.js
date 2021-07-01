
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Pressable} from 'react-native';
import { btnColor, WarnaAbu, windowHeight, windowWidth, WarnaDisable } from '../utils';
import globalCss from '../utils/global';
import { shirt, jeans, woman, curtains, tie } from '../assets/images';
import Feather from 'react-native-vector-icons/Feather';
import CommonHeader from '../component/CommonHeader';


const Cart = ({navigation}) => (
  <View style={styles.container}>
    <CommonHeader title="My Cart" navigation={navigation} />
    <View 
        animation="fadeInUpBig"
        style={styles.footer}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Items OR Services */}
        <View style={[styles.itemBx, globalCss.shadow]}>
            <View style={styles.img}>
                <Image 
                  source={jeans}
                  resizeMode = 'contain'
                  style={styles.itemimg}
                />
            </View>
            <View style={styles.description}>
                <Text style={styles.serviceName}>Jeans</Text>
                <Text style={styles.price}>$20</Text>
                <View style={{width : '100%', flexDirection : 'row'}}>
                  <View style={styles.quantity}>
                    <View style={styles.iconContainer}>
                      <Feather 
                        name="minus"
                        color="black"
                        size={20}
                      />
                    </View>
                    <View style={[styles.iconContainer, { backgroundColor : '#FFFFFF' }]}>
                        <Text>0</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Feather 
                        name="plus"
                        color="black"
                        size={20}
                      />
                    </View>
                  </View>
                  <View style={styles.deletecontainer}>
                    <View style={[styles.iconContainer, { backgroundColor : WarnaAbu }]}>
                        <Feather 
                          onPress={() => alert('Cart Item removed')}
                          name="trash"
                          color="black"
                          size={20}
                        />
                      </View>
                  </View>
                </View>
                
            </View>
            
        </View>



        {/* Items OR Services */}
        <View style={[styles.itemBx, globalCss.shadow]}>
            <View style={styles.img}>
                <Image 
                  source={shirt}
                  resizeMode = 'contain'
                  style={styles.itemimg}
                />
            </View>
            <View style={styles.description}>
                <Text style={styles.serviceName}>T-Shirts</Text>
                <Text style={styles.price}>$60</Text>
                <View style={{width : '100%', flexDirection : 'row'}}>
                  <View style={styles.quantity}>
                    <View style={styles.iconContainer}>
                      <Feather 
                        name="minus"
                        color="black"
                        size={20}
                      />
                    </View>
                    <View style={[styles.iconContainer, { backgroundColor : '#FFFFFF' }]}>
                        <Text>0</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Feather 
                        name="plus"
                        color="black"
                        size={20}
                      />
                    </View>
                  </View>
                  <View style={styles.deletecontainer}>
                    <View style={[styles.iconContainer, { backgroundColor : WarnaAbu }]}>
                        <Feather 
                          onPress={() => alert('Cart Item removed')}
                          name="trash"
                          color="black"
                          size={20}
                        />
                      </View>
                  </View>
                </View>
                
            </View>
            
        </View>

        {/* Items End */}
        </ScrollView>
    </View>
  </View>
);

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: btnColor
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
  },
  titlebar : { 
    padding : 15,  
  },
  title: {
    color : WarnaAbu,
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
    textAlign : 'center'
  },
  footer: {
    flex: 4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  itemBx : {
    flexDirection : 'row',
    // padding : 10,
    marginBottom : 20
  },
  img : {
    padding : 10,
    backgroundColor : WarnaDisable,
    borderRadius : 10,
  },
  itemimg : {
    width : windowWidth * 0.25,
    height : 80
  },
  description : {
    width : windowWidth - (windowWidth * 0.25),
    paddingLeft : 20,
    // backgroundColor : 'blue'
  },
  quantity : {
    width : '50%',
    flexDirection : 'row',
    marginTop : 10,
    // backgroundColor : 'yellow'
  },
  iconContainer : {
    width : 35,
    height : 35,
    backgroundColor : '#FFFFFF',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 50,
    borderColor : WarnaAbu,
    borderWidth : 1,
    marginRight : 10,
  },
  serviceName : {
    color : btnColor,
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
  },
  price : {
    paddingTop : 5,
    fontFamily: 'TitilliumWeb-Bold',
    fontSize : 15
  },
  category : {
    color : 'grey',
    fontFamily : 'TitilliumWeb-Regular'
  },
  deletecontainer : {
    width : '30%',
    justifyContent : 'flex-end',
    alignItems : 'flex-end',
  }

});
