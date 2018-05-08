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
import Login from './Login_new'
import MyChart from './MyChart'
import Profile from './Profile'
import { StackNavigator } from 'react-navigation';

export const ProfileRoutes = StackNavigator({
  Home: { screen: Profile },
  Login: { screen : Login},
});

export default class My extends Component {
  render() {
      return <ProfileRoutes />;
  }
}


