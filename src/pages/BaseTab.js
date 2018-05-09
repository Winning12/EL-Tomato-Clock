//By Xue 2018.04.09
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import HomePage from './NewHome';
import TimeLine from './Timeline';
import My from './My';
import PropTypes from 'prop-types';

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



  _renderTabarItems(selectedTab,icon,selectedIcon,Component){
    return (
      <TabNavigator.Item
          selected={this.state.selectedTab === selectedTab}  
          title={selectedTab} 
          titleStyle={styles.tabText}  
          selectedTitleStyle={styles.selectedTabText}  
          badgeText={this._badgeText(selectedTab)}
          renderIcon={() => <Image style={styles.icon} source={icon} />}  
          renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon} />}  
          onPress={() => this.setState({ selectedTab: selectedTab })}
      >
          <Component />
      </TabNavigator.Item>
    )
  }
  render() {
    return (
      <View style={styles.container} >  
                <TabNavigator>  
                 {this._renderTabarItems('番茄时钟',require('../resource/ic_tab_homepage.png'),require('../resource/ic_tab_homepage_select.png'),HomePage)}
                 {this._renderTabarItems('时间线',require('../resource/ic_tab_search.png'),require('../resource/ic_tab_search_select.png'),TimeLine)}
                 {this._renderTabarItems('我的',require('../resource/ic_tab_my.png'),require('../resource/ic_tab_my_select.png'),My)}
                </TabNavigator>  
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  tabText:{
    color:'#000000',
    fontSize:10
  },
  selectedTabText:{
    color:'#D81E06'
  },
  icon:{
    width:20,
    height:20
  }
})
