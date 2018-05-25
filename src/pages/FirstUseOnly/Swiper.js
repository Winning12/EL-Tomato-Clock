import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Image
} from 'react-native';

import {createAnimatableComponent, View,} from 'react-native-animatable'
import Swiper from 'react-native-swiper';
import { StackNavigator } from 'react-navigation';
var Dimensions = require('Dimensions');  
var thisWidth = Dimensions.get('window').width; 
//用于在第一次启动时，演示app功能
export default class _Swiper extends Component {

  constructor(props) {
    super(props);

  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    AsyncStorage.setItem("1","4")
    AsyncStorage.setItem("2","6")
    AsyncStorage.setItem("3","4")
    AsyncStorage.setItem("4","3")
    AsyncStorage.setItem("5","5")
    AsyncStorage.setItem("6","8")
    AsyncStorage.setItem("7","7")
  }//设定一周统计的预设数据，便于演示

  render(){
    const { navigate } = this.props.navigation;
    return (
      <Swiper 
      style={styles.wrapper} 
      autoplay={true} 
      autoplayTimeout={2.4}
      loop={false}
      scrollEnabled={false}
      activeDot={<View style={{backgroundColor:'white', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
      <ImageBackground
          style={{flex:1}}
          source={require('../../resource/Back_changed.png')}
          resizeMode="cover">        
            <View animation="fadeInLeft" style={styles.center} useNativeDriver>
                <Text style={styles.text}>番茄工作法</Text>
                <Text style={styles.text}>规划你的时间</Text>
                <View animation="fadeInUp" useNativeDriver>
                  <Image style={{height:(thisWidth-100)*1.8}} source={require('../../resource/swiper1.png')} resizeMode="contain"/>
                </View>
            </View>     
        </ImageBackground>
        <ImageBackground
          style={{flex:1}}
          source={require('../../resource/Back_changed.png')}
          resizeMode="cover">
            <View animation="fadeInLeft" delay={2500} style={styles.center} useNativeDriver>
                <Text style={styles.text}>时间线上</Text>
                <Text style={styles.text}>留下你的墨迹</Text>
                <View animation="fadeInRight" delay={2500} useNativeDriver>
                  <Image style={{height:(thisWidth-100)*1.8}} source={require('../../resource/swiper2.png')} resizeMode="contain"/>
                </View>
            </View>
        </ImageBackground>
        <ImageBackground
          style={{flex:1}}
          source={require('../../resource/Back_changed.png')}
          resizeMode="cover">
            <View animation="fadeInLeft" delay={5000} style={styles.center} useNativeDriver>
              <Text style={styles.text}>完整社区体验</Text>
              <Text style={styles.text}>营造专注氛围</Text>
              <View animation="fadeInRight" delay={5000} useNativeDriver>
                  <Image style={{height:(thisWidth-100)*1.8}} source={require('../../resource/swiper3.png')} resizeMode="contain"/>
              </View>
            </View>
        </ImageBackground>
        <ImageBackground
          style={{flex:1}}
          source={require('../../resource/Back_changed.png')}
          resizeMode="cover">
          <View style={styles.center}>
            <Text style={styles.text_large}>时墨</Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}>让世界看到</Text>
            <Text style={styles.text}>你的专注</Text>
          </View>
          <View style={styles.center}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('Signin')}>
                <Text style={styles.btText}>注册以获得完整功能</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('BaseTab')}>
                <Text style={styles.btText}>体验离线功能</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Swiper>
    );
  }


}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      margin:5,
    },
    text_large: {
      color: '#fff',
      fontSize: 40,
      marginBottom:20,
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
        color:  '#686868',
        fontSize:15
    },
  })