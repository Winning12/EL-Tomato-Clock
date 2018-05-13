import React, { Component } from 'react'
import { 
    ImageBackground,
    StyleSheet,
    AsyncStorage,
    Image
    } from 'react-native'

import {Dimensions,PixelRatio} from 'react-native';
import {createAnimatableComponent, View,} from 'react-native-animatable'

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
        }, 2000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={styles.container}>  
            <ImageBackground
                style={{flex:1}}
                source={require('../resource/img_intro_4.png')}
                resizeMode="cover">
                <View animation='fadeIn' delay={300} duration={1500} style={styles.center} useNativeDriver>
                <Image
                style={{flex:1}}
                source={require('../resource/title.png')}
                resizeMode="contain"/>
                </View>
            </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
        flexDirection: 'column',
    },  
    center: {
        flex: 1,
        marginLeft: 18,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
    },
});