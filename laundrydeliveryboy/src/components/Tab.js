import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = ({ color, tab, onPress, icon, weight }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <AntDesign name={icon} size={20} color={color} />}
      <Text style={{ color , fontWeight : weight}}>{tab.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
  },
});

export default Tab;
