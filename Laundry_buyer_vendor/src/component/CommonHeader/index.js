
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Pressable
} from 'react-native';

import {  WarnaAbu, windowWidth } from '../../utils';
import { leftarrow } from '../../assets';


const CommonHeader = ({ navigation, title, route }) => {
    return (
        <View style={{ padding : 15, flexDirection : 'row', }}>
      
            <Pressable onPress={() => navigation.goBack()}>
            <Image
                source={leftarrow}
                resizeMode="contain"
                style={{
                    width: 20,
                    tintColor : WarnaAbu
                }}
            />
            </Pressable>
          
            <View style={{justifyContent : 'center', alignItems : 'center', width : '100%'}}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
      color : WarnaAbu,
      fontSize: 20,
      fontFamily: 'TitilliumWeb-Bold',
      alignSelf : 'center',
      
    }
});

export default CommonHeader;
