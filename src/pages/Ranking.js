import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    AsyncStorage,
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import {createAnimatableComponent, View} from 'react-native-animatable'

export default class Ranking extends Component {
    static navigationOptions = {
        headerTitle: 
          <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
            <Text style={{color: '#686868',fontSize:20}}>专注排名</Text>
          </View>,
        headerRight:      
        <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
        </View>,
        headerTintColor:'#686868',
    };

    render(){
        return <Text/>
    }
}