import React, { Component } from 'react'
import { 
    Image,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ImageBackground,
    } from 'react-native'
import BaseTab from './src/pages/BaseTab'
import Swiper from './src/pages/Swiper'
import Signin from './src/pages/Login_new'
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';



export const ProfileRoutes = StackNavigator({
  Home: { screen: Swiper},
  BaseTab:{ screen: BaseTab},
  Signin:{screen: Signin}
  });

export default class App extends Component {
      
  render() {
      return <ProfileRoutes/>;
  }
}


