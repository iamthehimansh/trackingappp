import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../components/Profile';
import ChangePasswordScreen from '../screens/Auth/ChangePasswordScreen';
import OrderHistory from '../screens/Auth/OrderHistory';
import SupportScreen from '../screens/Support';
import EditprofileScreen from '../screens/Profile/EditprofileScreen';
import TicketScreen from '../screens/Cms/RaiseTicket';

const Stack = createStackNavigator();

const ProfileNavigator = ({ route}) => {

  
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='EditProfile' component={EditprofileScreen} />
      <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} />
      <Stack.Screen name='History' component={OrderHistory} />
      <Stack.Screen name='Support' component={SupportScreen} />
      <Stack.Screen name='RaiseTicket' component={TicketScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileNavigator;
