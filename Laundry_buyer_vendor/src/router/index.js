import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  Akun,
  Home,
  Pesanan,
  Splash,
  Login,
  Otp,
  ForgetPass,
  Signup,
  Detail,
  Cart,
  ChangePasswordScreen,
  EditprofileScreen,
  OrderHistory,
  BookingScreen,
} from '../pages';
import {BottomNavigator} from '../component';
import VendorRouter from './VendorRoute';
import ResetPassword from '../pages/Auth/ResetPassword';
import ForgetPassOTP from '../pages/Auth/ForgetPassOTP';
import MyaddressScreen from '../pages/Profile/MyAdress';
import SubscriptionHistory from '../pages/Profile/SubscriptionHistory';
import VendorForgetPass from '../pages/Vendor/ForgetPass';
import VendorSignupScreen from '../pages/Auth/VendorSignup';
import TermsScreen from '../pages/Cms/TermsCondition';
import Orderdetails from '../pages/Profile/OrderDetails';
import OrderStatus from '../pages/Profile/OrderStatus';
import TicketScreen from '../pages/Profile/RaiseTicket';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => (
  <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Services" component={Pesanan} />
    <Tab.Screen name="Profile" component={Akun} />
  </Tab.Navigator>
);

const Router = () => (
  <Stack.Navigator initialRouteName="">
    <Stack.Screen
      name="MainApp"
      component={MainApp}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
    <Stack.Screen
      name="Forgot"
      component={ForgetPass}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ForgotOTP"
      component={ForgetPassOTP}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Detail"
      component={Detail}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Booking"
      component={BookingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Cart" component={Cart} options={{headerShown: false}} />
    <Stack.Screen
      name="PasswordReset"
      component={ChangePasswordScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditprofileScreen}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="Myaddress"
      component={MyaddressScreen}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="Ticket"
      component={TicketScreen}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="OrderHistory"
      component={OrderHistory}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="Order-Details"
      component={Orderdetails}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="OrderStatus"
      component={OrderStatus}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="SubscriptionHistory"
      component={SubscriptionHistory}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="Vendor"
      component={VendorRouter}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="VendorForgot"
      component={VendorForgetPass}
      options={{headerShown: false}}
    />


    <Stack.Screen
      name="VendorSignup"
      component={VendorSignupScreen}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="Terms"
      component={TermsScreen}
      options={{headerShown: false}}
    />

    
  </Stack.Navigator>
);

export default Router;
