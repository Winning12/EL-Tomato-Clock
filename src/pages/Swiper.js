import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';
import { StackNavigator } from 'react-navigation';

export default class _Swiper extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  render(){
    const { navigate } = this.props.navigation;
    return (
      <Swiper style={styles.wrapper}  loop={false}>
        <View style={styles.slide1}>            
            <View style={styles.center}>
                <Text style={styles.text}>Welcome to IFruit</Text>
            </View>
            <View style={styles.center}>
            </View>
        </View>
        <View style={styles.slide2}>
            <View style={styles.center}>
                <Text style={styles.text}>Focus</Text>
            </View>
            <View style={styles.center}>
            </View>
        </View>
        <View style={styles.slide3}>
          <View style={styles.center}>
            <Text style={styles.text}>And Focus</Text>
          </View>
          <View style={styles.center}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('BaseTab')}>
                <Text style={styles.btText}>Experience Now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>
    );
  }

  toBase=()=>{
    this.props.navigation.replace({
        scene: BaseTab,
      });
  }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    button: {
        height: 50,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'white',    
        marginBottom: 8,
        opacity:0.9,
    },  
    center:{
        alignItems:'center',
        justifyContent: 'center',
        flex: 1,
    },
    btText: {
        color:  '#92BBD9',
    },
  })