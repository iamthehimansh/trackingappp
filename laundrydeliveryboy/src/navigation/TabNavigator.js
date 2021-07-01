import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../components/Home';
import NeworderScreen from '../components/NeworderScreen';
import ActiveOrderScreen from '../components/ActiveOrderScreen';
import DeliveredScreen from '../components/DeliveredScreen';
import TabBar from '../components/TabBar';
import ProfileNavigator from './ProfileNavigator';

const TopTab = createMaterialTopTabNavigator();

function segment() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="New" component={NeworderScreen} />
      <TopTab.Screen name="Active" component={ActiveOrderScreen} />
      <TopTab.Screen name="Deliverd" component={DeliveredScreen} />
    </TopTab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  
  return (
    
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Dashboard"
        component={Home}
        initialParams={{
          icon: 'dashboard',
        }}
      />
      <Tab.Screen
        name="Orders"
        component={segment}
        initialParams={{icon: 'retweet'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        initialParams={{icon: 'user'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
