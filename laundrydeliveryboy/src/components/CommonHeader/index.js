import React from 'react';
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';

import {COLORS, SIZES, FONTS} from '../../configs/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTabBar} from '../../contexts/TabBarProvider';

const CommonHeader = ({navigation, title, route}) => {
  const { setShowTabBar, showTabBar } = useTabBar();
  setShowTabBar(false);

  return (
    <View style={{padding: 15, flexDirection: 'row'}}>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name="chevron-left" size={30} color={COLORS.white} />
      </Pressable>

      <View style={{marginLeft: 20}}>
        <Text style={[FONTS.h2, styles.title]}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.white,
  },
});

export default CommonHeader;
