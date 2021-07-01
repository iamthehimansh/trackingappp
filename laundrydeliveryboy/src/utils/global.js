import {StyleSheet} from 'react-native';
import {SIZES} from '../configs/theme';
export default class Global {

  token = '';
  static setToken = token => {
    this.token = token;
  };

  static getToken = () => {
    return this.token;
  };
  
}


