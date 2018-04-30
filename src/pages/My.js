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
import {Navigator} from 'react-native-deprecated-custom-components';
import Login from './Login_new'
import MyChart from './MyChart'
import Profile from './Profile'

export default class My extends Component {



  render() {
    return (
      <Navigator
          initialRoute={{ name: 'Profile', component: Profile }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          style={{flex:1}}
          renderScene={(route, navigator) => {  
          let Component = route.component;  
          return <Component {...route.params} navigator={navigator}/>  
        }} 
      />
    );
  }
}

