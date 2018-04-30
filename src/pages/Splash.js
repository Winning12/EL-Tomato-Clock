import React, { Component } from 'react'
import { 
    Image,
    View,
    StyleSheet 
    } from 'react-native'

export default class Splash extends Component {

    render() {
        return (
            <View style={styles.container}>  
            <Image
                source={require('../resource/img_intro_4.png')}
                resizeMode="cover"
            />
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