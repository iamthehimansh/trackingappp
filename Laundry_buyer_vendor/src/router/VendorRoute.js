import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
    Pressable
} from 'react-native';
import {
  DashboardScreen,
  NeworderScreen,
  ActiveOrderScreen,
  DeliveredScreen,
  ProductScreen,
  ReportScreen,
} from '../pages';
import { WarnaWarn, WarnaUtama, btnColor } from '../utils';
import { FONTS } from '../utils/theme';
import OrderdetailsScreen from '../pages/Vendor/Orderdetails';
import VendorForgetPassOTP from '../pages/Vendor/ForgetPassOTP';
import VendorResetPassword from '../pages/Auth/ResetPassword';
import VendorProfile from '../pages/Vendor/Profile';
import RequestMoney from '../pages/Vendor/RequestMoney';
import WalletHistory from '../pages/Vendor/WalletHistory';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Addservices from '../pages/Vendor/Addservices';
import EditService from '../pages/Vendor/EditService';
import VendorTicketArise from '../pages/Vendor/VendorTicketArise';


const Stack = createStackNavigator();

const TopTab = createMaterialTopTabNavigator();





function segment() {
  
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        labelStyle: FONTS.h3,
        style: {backgroundColor: btnColor}
      }}>
      <TopTab.Screen name="New" component={NeworderScreen} />
      <TopTab.Screen name="Active" component={ActiveOrderScreen} />
      <TopTab.Screen name="Deliverd" component={DeliveredScreen} />
    </TopTab.Navigator>
  );
}

const VendorRouter = ({navigation}) => (
  
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Orders" component={segment} />
    <Stack.Screen name="Orderdetails" component={OrderdetailsScreen} />
    <Stack.Screen name="Products" component={ProductScreen} options={{title:'Services', headerRight : () => (
          <Pressable onPress={() => navigation.navigate('Addservice')}>
            <FontAwesome name="plus" size={22} style={{paddingRight : 10}} />
          </Pressable>
        ),}} />
    <Stack.Screen name="Report" component={ReportScreen} />
    <Stack.Screen
      name="VendorForgotOTP"
      component={VendorForgetPassOTP}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="VendorResetPassword"
      component={VendorResetPassword}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="VendorProfile"
      component={VendorProfile}
      options={{title : 'Profile'}}
    />
    <Stack.Screen
      name="RequestMoney"
      component={RequestMoney}
      options={{title : 'Request Money', 
        headerRight : () => (
          <Pressable onPress={() => navigation.navigate('RequestHistory')}>
            <FontAwesome name="history" size={22} style={{paddingRight : 10}} />
          </Pressable>
        ),}}
    />
    <Stack.Screen
      name="RequestHistory"
      component={WalletHistory}
      options={{title : 'Request History'}
      
    }
    />
    <Stack.Screen
      name="Addservice"
      component={Addservices}
      options={{title : 'Add Services'}
      
    }
    />
    <Stack.Screen
      name="VendorTicketArise"
      component={VendorTicketArise}
      options={{title : 'Add Services'}}
    />

    <Stack.Screen
      name="Editservice"
      component={EditService}
      options={{title : 'Edit Services'}
      
    }
    />
  </Stack.Navigator>
);

export default VendorRouter;
