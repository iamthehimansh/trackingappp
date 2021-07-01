import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import TabNavigator from './TabNavigator';
import ForgetPass from '../screens/Auth/ForgetPass';
import OrderdetailsScreen from '../screens/Orderdetails';
import ForgetPassOTP from '../screens/Auth/ForgetPassOTP';
import ResetPassword from '../screens/Auth/ResetPassword';
import SignupScreen from '../screens/Auth/SingupScreen';
import TermsScreen from '../screens/Cms/TermsCondition';
import Profile from '../components/Profile';

const Stack = createStackNavigator();

const MainNavigator = ({route}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Forgot" component={ForgetPass} />
      <Stack.Screen name="ForgotOTP" component={ForgetPassOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="OrderDetails" component={OrderdetailsScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
