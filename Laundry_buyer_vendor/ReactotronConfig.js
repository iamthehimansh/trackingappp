import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

// grabs the ip address
const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

const reactotron = Reactotron.configure({ host })
  .useReactNative()
  .connect();

export default reactotron;