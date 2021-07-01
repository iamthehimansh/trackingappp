import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import Router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'https://yourdemolink.online/FTL190125/laundry';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const App = ({}) => (
  <NavigationContainer>
    <Router />
  </NavigationContainer>
);
export default App;
