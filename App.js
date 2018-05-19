import React, { Component } from 'react'
import { 
    Image,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ImageBackground,
    AsyncStorage
    } from 'react-native'
import BaseTab from './src/pages/BaseTab'
import Swiper from './src/pages/FirstUseOnly/Swiper'
import Signin from './src/pages/FirstUseOnly/Login_first'
import Register from './src/pages/FirstUseOnly/Register_first'
import Splash from './src/pages/Splash'

import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

const TransitionConfiguration = () => ({
  screenInterpolator: (sceneProps) => {
    const { scene } = sceneProps;
    const { route } = scene;
    const params = route.params || {};
    const transition = params.transition || 'forHorizontal';
    return CardStackStyleInterpolator[transition](sceneProps);
  },
});

export const ProfileRoutes = StackNavigator({
  Home: {screen :Splash},
  Swiper:{ screen: Swiper},
  BaseTab:{ screen: BaseTab},
  Signin:{screen: Signin},
  Register:{screen:Register}
  }, {
    transitionConfig: TransitionConfiguration,
});



export default class App extends Component {
      
  render() {
      return <ProfileRoutes/>;
  }
}


