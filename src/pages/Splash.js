import React, { Component } from 'react'
import { 
    ImageBackground,
    View,
    StyleSheet,
    AsyncStorage
    } from 'react-native'

import {Dimensions,PixelRatio} from 'react-native';
let {WIDTH,HEIGHT} = Dimensions.get("window");

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
                check:false,
        };
      }
      componentWillMount(){
        AsyncStorage.getItem("ifFirst")
        .then((result) => {
          if(result=="false"){
            this.setState({check:result})
          }
        })
      };

    static navigationOptions = {
        header: null,
      };

    componentDidMount() {
        const { navigation } = this.props
        this.timer = setTimeout(() => {
            if(this.state.check!="false")
                this.props.navigation.navigate('Swiper');
            else
                this.props.navigation.navigate('BaseTab');
        }, 1200)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={styles.container}>  
            <ImageBackground
                style={styles.container}
                source={require('../resource/img_intro_4.png')}
                resizeMode="cover"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
});