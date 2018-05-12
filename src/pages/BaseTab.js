//By Xue 2018.04.09
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';

import {TabNavigator,TabBarBottom} from 'react-navigation';  
import HomePage from './NewHome';
import TimeLine from './Timeline';
import My from './My';
import PropTypes from 'prop-types';
import TabBarItem  from '../components/TabBarItem'

const Tab = TabNavigator(  
  {  
    Home:{  
      screen:HomePage,  
      navigationOptions:({navigation}) => ({  
        tabBarLabel:'番茄时钟',  
        tabBarIcon:({focused,tintColor}) => (  
          <TabBarItem  
            tintColor={tintColor}  
            focused={focused}  
            normalImage={require('../resource/ic_tomato.png')}  
            selectedImage={require('../resource/ic_tomato.png')}  
          />  
        )  
      }),  
    },  
  
    TimeLine:{  
          screen:TimeLine,  
          navigationOptions:({navigation}) => ({  
          tabBarLabel:'时间线',  
          tabBarIcon:({focused,tintColor}) => (  
            <TabBarItem  
             tintColor={tintColor}  
              focused={focused}  
              normalImage={require('../resource/ic_timeline.png')}  
              selectedImage={require('../resource/ic_timeline.png')}  
            />  
          )  
        }),  
      },  
    Mine:{  
        screen:My,  
        navigationOptions:({navigation}) => ({  
        tabBarLabel:'我的',  
        tabBarIcon:({focused,tintColor}) => (  
          <TabBarItem  
           tintColor={tintColor}  
            focused={focused}  
            normalImage={require('../resource/ic_tab_my.png')}  
            selectedImage={require('../resource/ic_tab_my.png')}  
          />  
        )  
      }),  
    },  
  },{ 
      tabBarComponent:TabBarBottom,  
      tabBarPosition:'bottom',  
      swipeEnabled:true,  
      animationEnabled:true,  
      lazy:false,  
      showIcon:true,
      tabBarOptions:{  
        activeTintColor:'#585858',  
        inactiveTintColor:'#d2d2d2',  
        style:{backgroundColor:'#ffffff',},  
        labelStyle: {  
              fontSize: 10, 
          },  
      }  
    }  
  );  


type Props = {};
export default class BaseTab extends Component<Props> {

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      selectedTab:'番茄时钟',
      badgeText:""
    }
  }
  
  _badgeText(selectedTab){
    if(selectedTab=="番茄时钟")
      return this.state.badgeText
    else 
      return ""
  }

  componentWillMount(){
    AsyncStorage.setItem('ifFirst',"false"); 
  }

  

  render() {
    return (
      <Tab />
    );
  }
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  selectedTabText:{
    color:'#D81E06'
  },
  icon:{
    width:20,
    height:20
  }
})
