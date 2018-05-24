import React, { Component } from 'react'
import { 
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ImageBackground,
    InteractionManager,
    AsyncStorage,
    } from 'react-native'
import {createAnimatableComponent, View,} from 'react-native-animatable'
import * as Progress from 'react-native-progress';

var weekdays=[require('../resource/Mon.png'),require('../resource/Tue.png'),
require('../resource/Wed.png'),require('../resource/Thu.png'),
require('../resource/Fri.png'),require('../resource/Sat.png'),
require('../resource/Sun.png'),]
export default class Statistic extends Component {

  constructor(props) {
    super(props);
    this._renderBars=this._renderBars.bind(this)
    this._renderBars_last=this._renderBars_last.bind(this)
    this.handleFill=this.handleFill.bind(this)
    this.handleChinese=this.handleChinese.bind(this)
    this.state = {
        data: [],
        refreshing: false,
        length:0,
        myitem:{},
        name:"",
        weekday:(new Date()).getDay(),
        count:7,
        length:0,
        tomato:[0,0,0,0,0,0,0],
        tomato1:0,
        tomato2:0,
        tomato3:0,
        tomato4:0,
        tomato5:0,
        tomato6:0,
        tomato7:0,
        avatar:null,
    };
  }
  //数组不支持强制更新，不能解决异步读写的回调延迟问题，故使用七个单独变量
  
  static navigationOptions = {
    headerTitle: 
      <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
        <Text style={{color: '#686868',fontSize:20}}>专注统计</Text>
      </View>,
    headerRight:      
    <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
    </View>,
    headerTintColor:'#686868',
  };


  //理由同上
  componentDidMount() {
    AsyncStorage.getItem("1")
      .then((result) => {
        this.setState({tomato1:result})
        if(result>this.state.length){
          this.setState({length:result})
        }
    })
    AsyncStorage.getItem("2")
      .then((result) => {
        this.setState({tomato2:result})
        if(result>this.state.length){
          this.setState({length:result})
        }
    })
    AsyncStorage.getItem("3")
      .then((result) => {
        this.setState({tomato3:result})
        if(result>this.state.length){
          this.setState({length:result})
        }
    })
    AsyncStorage.getItem("4")
    .then((result) => {
      this.setState({tomato4:result})
      if(result>this.state.length){
        this.setState({length:result})
      }
    })
    AsyncStorage.getItem("5")
    .then((result) => {
      this.setState({tomato5:result})
      if(result>this.state.length){
        this.setState({length:result})
      }
    })
    AsyncStorage.getItem("6")
    .then((result) => {
      this.setState({tomato6:result})
      if(result>this.state.length){
        this.setState({length:result})
      }
    })
    AsyncStorage.getItem("7")
    .then((result) => {
      this.setState({tomato7:result})
      if(result>this.state.length){
        this.setState({length:result})
      }
    })

  }

  //无奈手动复制7份，避免动态添加组件与ARTVIEW冲突(动态添加写起来也较麻烦- -)
  //效率与解决了冲突的动态添加是一样的，在_render判断参数小于零后直接被短路
  render(){
    this.synchro()
    this.state.count=7
    return (
    <View style={styles.container}>
      {this._renderBars(this.state.weekday)}
      {this._renderBars(this.state.weekday-1)}
      {this._renderBars(this.state.weekday-2)}
      {this._renderBars(this.state.weekday-3)}
      {this._renderBars(this.state.weekday-4)}
      {this._renderBars(this.state.weekday-5)}
      {this._renderBars(this.state.weekday-6)}
      {this._renderBars_last(this.state.weekday)}
      {this._renderBars_last(this.state.weekday)}
      {this._renderBars_last(this.state.weekday)}
      {this._renderBars_last(this.state.weekday)}
      {this._renderBars_last(this.state.weekday)}
      {this._renderBars_last(this.state.weekday)}
      {this._renderBars_last(this.state.weekday)}
    </View>
    )
  }

  synchro(){
    this.state.tomato[0]=this.state.tomato1
    this.state.tomato[1]=this.state.tomato2
    this.state.tomato[2]=this.state.tomato3
    this.state.tomato[3]=this.state.tomato4
    this.state.tomato[4]=this.state.tomato5
    this.state.tomato[5]=this.state.tomato6
    this.state.tomato[6]=this.state.tomato7
  }

  _renderBars(weekday){
    if (weekday>0){
    return(
        <View style={{marginBottom:10,alignItems: 'center',flexDirection:'row'}}>
          <View style={styles.avatarContainer}>
            <Image
            style={{width: 35, height: 35}}
            source={weekdays[weekday-1]}
            />
          </View>
          <View style={{marginLeft:5,flexDirection:'column'}}>
            <Text style={{fontSize:18}}>{this.handleChinese(weekday)}</Text>
            <Progress.Bar style={{marginTop:5}} progress={this.handleFill(weekday)} width={250} height={8} color="#686868"  useNativeDriver/>
          </View>
        </View>
    )
    }
  }

  _renderBars_last(weekday){
    if ((this.state.count-weekday)>0){
    weekday=weekday+1
    this.state.count=this.state.count-1
    return(
        <View style={{marginBottom:10,alignItems: 'center',flexDirection:'row'}}>
          <View style={styles.avatarContainer}>
            <Image
            style={{width: 35, height: 35}}
            source={weekdays[this.state.count]}
            />
          </View>
          <View style={{marginLeft:5,flexDirection:'column'}}>
            <Text style={{fontSize:18}}>{this.handleChinese(this.state.count+1)}</Text>
            <Progress.Bar style={{marginTop:5}} progress={this.handleFill(this.state.count+1)} width={250} height={8} color="#686868"  useNativeDriver/>
          </View>
        </View>
    )
    }
  }

  handleChinese(weekday){
    switch(weekday){
      case 1:return "周一"
      case 2:return "周二"
      case 3:return "周三"
      case 4:return "周四"
      case 5:return "周五"
      case 6:return "周六"
      case 7:return "周日"
    }
  }

  handleFill(weekday){
    if(this.state.length!=0)
     return 1.0*(this.state.tomato[weekday-1]/this.state.length)
    else
     return 0
  }
  

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(240,240,240)',
  },
  centerContainer: {
      backgroundColor: 'rgb(240,240,240)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  image: {
      width: 90,
      height: 90,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,

  },
  left: {
      flex: 1,
      marginLeft: 18,
      flexDirection: 'column',
      alignItems: 'flex-start',
  },
  avatarContainer: {
      marginLeft:10,
      width: 55,
      height: 55,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
  },
  right: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
  },
  center: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
  },
  content: {
      bottom: 10,
      marginRight: 16,
      flexDirection: 'row',
      justifyContent: 'flex-end',
  },
  header: {
      flexDirection: 'row',
      height: 50,
      backgroundColor:'rgb(248,248,248)',
      alignItems: 'center',
  },
});