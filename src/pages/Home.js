import React, { Component } from 'react'
import {
    StyleSheet,
    ListView,
    Image,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    NativeModules,
    AppState,
    AsyncStorage,
    Alert,
    BackHandler,
    Platform,
    DeviceEventEmitter
} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import TextInput from '../components/_TextInput'
import { createAnimatableComponent, View, Text } from 'react-native-animatable'
import RNKeyguardModule from '../components/Origin'

{
    var display="开始"
    var pause=true
    var timePause=false
    var refreshed=false
    var m=24
    var i=0
    var backIM=require('../resource/Back.png')
    var mstr="";
    var sestr="";
    var se=0
    var hours=0
    var minutes=0
    var s=0
} 

export default class Home extends Component {


   constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.handleTimesUp=this.handleTimesUp.bind(this);
        this.state = {
            time:0,
            dataSource:ds,
            data:[],
            time1:(new Date()).valueOf(),
            name:"完成了：",
            duration:1*10*1000,
            lasttime:1*10*1000,
            hour:0,
            minute:0,
            uploadData:"",
            year:(new Date()).getFullYear()+"",
            month:((new Date()).getMonth()+1)+"",
            day:(new Date()).getDate()+"",
            weekday:(new Date()).getDay(),
            tomato:0,
            username:"",
        };
    }

    handleAppStateChange(appState){
      if(appState==='background'){
          RNKeyguardModule.isLocked((unlocked)=>{
              if(unlocked){
                  timePause=true;
              }
          })
      }
    }

    componentWillMount() {
      if (Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
      }
      AppState.addEventListener('change',this.handleAppStateChange.bind(this));
    }

    componentDidMount() {
      AsyncStorage.getItem("user")
        .then((result) => {
            this.setState({username:result})
            this.updateTomato()
      })
      AsyncStorage.getItem("date")
      .then((result) => {
          if(result!=this.state.year+this.state.month+this.state.day){//一天过去后，保存并清空所有本地统计数据
            AsyncStorage.setItem('taskJoined',"false")
            AsyncStorage.setItem('taskCompleted',"false")
            AsyncStorage.setItem('date',this.state.year+this.state.month+this.state.day)
          }
          AsyncStorage.getItem("tomato")
          .then((result) => {
              this.setState({tomato:parseInt(result)})
          })
      }) 
    }

    updateTomato=()=>{
      fetch('http://118.25.56.186/users/'+this.state.username+"/userinfo", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
            }).then((response) => response.json())
            .then((jsonData) => {
              let tomato = jsonData.tomato;//检查番茄周期数是否达到任务要求，若服务端返回完成，则存入本地文件。
              if(tomato>=10){
                AsyncStorage.setItem('taskCompleted',"true")
                }
                AsyncStorage.setItem('tomato',""+tomato)
                this.state.tomato=tomato
            })
    }

    onBackAndroid=()=>{
      if(!pause){
        Alert.alert(
          '退出应用',
          '当前计时将被重置',
          [{text:'确定',
            onPress:()=>{
              pause=true;
              display="开始"
              BackHandler.exitApp();
            }},
            {text:'取消',
              onPress:()=>{
            }},])
        return true
      }
      else{
        Alert.alert(
        '退出应用',
        '计时尚未开始',
        [{text:'确定',
          onPress:()=>{
            pause=true;
            display="开始"
            BackHandler.exitApp();
          }},
          {text:'取消',
            onPress:()=>{
            timepause=true
          }},])
        return true
      }
    }

    render(){
      return(
        <ImageBackground
                style={styles.backgroundImage}
                source={backIM}
                resizeMode="cover">
          {this._renderShareButton()}
          {this._render()}
          {this.getTime()}
          <TextInput
             ref={editView => this.editView = editView}
             inputText={this.state.name}
             titleTxt={"刚完成了这些..."}
             ensureCallback={name=> (
               (refreshed=true),
               this.state.data[i]=(this.state.hour+"时"+this.state.minute+"分"+"   "+name),
               this.state.uploadData+=this.state.data[i]+"\n"
               )}
          /> 
          <Toast ref="timeup" position='bottom' opacity={0.5} fadeInDuration={200} fadeOutDuration={200}s/>
          </ImageBackground>
      )
    }

    _renderRow(rowData,rowId){
      return(
       <Text style={styles.recorder}>{rowData}</Text>
       )
      }
     
    _renderShareButton(){
      if (this.state.uploadData!=""){
      return(
        <View style={styles.header}>
          <View animation="bounceIn" style={styles.left} useNativeDriver>
            {/*Xue:如果为ios,若报错请移除useNativeDriver*/}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonContainer}
            onPress={this.clearData.bind(this)}
            >
            <Image source={require('../resource/ic_event_delete.png')}style={{width:30,height:30}}/>
          </TouchableOpacity>  
          </View>
          <View animation="bounceIn" style={styles.right} useNativeDriver>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonContainer}
            onPress={this.upload.bind(this)}
            >
            <Image source={require('../resource/ic_news_share.png')}style={{width:30,height:30}}/>
          </TouchableOpacity>  
          </View>
        </View>
        )
      }else{
      return(
        <View style={styles.header}>
        </View>
          )
      }
    }

    _render() {
        if (refreshed==true){
            refreshed=false
            this.setState({time1:(new Date()).valueOf()+this.state.lasttime})
            pause=false
        }
        display=this.countdown() 
      return ( 
          <View animation="fadeIn" style={styles.center}>  
            <AnimatedCircularProgress
            style={{opacity:0.70}}
            size={220}
            width={4}
            fill={(100*1000*lastseconds/this.state.duration)}
            tintColor="black"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#a3a3a3" >
            {(fill) => (
            <TouchableOpacity style={styles.btn} onPress={this.handlePause.bind(this)}>
              <Text style={styles.counter}>
              {display}
              </Text>
            </TouchableOpacity>
            )}
            </AnimatedCircularProgress>
            <ListView
              enableEmptySections = {true}
              style={{margin:20,}}
              dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
              renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,rowId)} /> 
          </View>
        )
    }

    countdown(){
      this.timer = setTimeout(()=>{
          this.setState({
              time:(new Date()).valueOf()
          });}, 10)
      lastseconds=(parseInt((this.state.time1-this.state.time)/10)/100).toFixed(2)
      m=Math.floor((lastseconds+1)/60)
      se=(lastseconds-m*60)
      if((lastseconds<=0)&&(this.state.lasttime<=0)&&(!pause)){
        display="再次\n开始"
        pause=true
        this.state.weekday=(new Date()).getDay()
        this.handleTimesUp()
      }
      if(!timePause){
        if (!pause){
          this.state.lasttime=this.state.time1-this.state.time//记录时间差用于暂停
          if((se).toFixed(0)==60) se=59//仅修正毫秒换算成秒后的显示问题，不造成时间记录上的误差
          if ((m>=10)&&(se>=10)){
              mstr=m
              sestr=Math.floor(se)
              return ((m)+":"+Math.floor(se))
          }
          else if ((m>=10)&&(se<10)) {
              mstr=m
              sestr="0"+Math.floor(se)
              return ((m)+":0"+Math.floor(se))
          }
          else if ((m<10)&&(se>=10)) {
              mstr="0"+m
              sestr=Math.floor(se)
              return ("0"+(m)+":"+Math.floor(se))
          }
          else {
              mstr="0"+m
              sestr="0"+Math.floor(se)
              return ("0"+(m)+":0"+Math.floor(se))
          }
        }
        else{
          if (display=="开始"){
              return "开始"
          }
          else if  (display=="再次\n开始"){
              return "再次\n开始"
          }
        }
      }else{
        this.state.time1=(new Date()).valueOf()+this.state.lasttime
        if(display=='开始')
          return "开始"
        else
          return "继续"
      }
    }

    handlePause(){
      if(display=="开始"|display=="再次\n开始"){
        timePause=false
        pause=!pause
        this.setState({time1:(new Date()).valueOf()+this.state.duration})
      }else if(display=="继续"){
        timePause=!timePause
      }else{
        if(!pause){
          this.editView.show()
          i=i+1
        }
      }
    }

    handleTimesUp(){//记录完成一个周期后的各项数据
      this.state.tomato=this.state.tomato+1
      AsyncStorage.setItem('tomato',(this.state.tomato+""))
      AsyncStorage.setItem((this.state.weekday+""),(this.state.tomato+""))
      AsyncStorage.getItem("logined")
      .then((result) => {
        if(result=="true"){
          this.refs.timeup.show("已结束一个番茄周期\n    专注排行已更新",1500);
          fetch('http://118.25.56.186/users/'+this.state.username+"/"+this.state.tomato+"/updatetomatoes", {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
             }).then((response) => response.json())
             .then((jsonData) => {
                 let taskreturn = jsonData.info;//检查番茄周期数是否达到任务要求，若服务端返回完成，则存入本地文件。
                 if(taskreturn=="you have finished the task!"){
                    AsyncStorage.setItem('taskCompleted',"true")
                 }
              })
        }
      })
    }

    upload(){
      fetch('http://118.25.56.186/data/create', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              length:"1500",
              content:this.state.uploadData,
              year:this.state.year,
              month:this.state.month,
              day:this.state.day,
              hour:this.state.hour,
              min:this.state.minute,
        })
      }).then((response) => response.json())
      .then((jsonData) => {
        let loginreturn = jsonData.status;
        if(loginreturn=="success"){
          this.refs.timeup.show("分享成功"+"将被显示在时间线上",1500)
        }
        else{
            this.refs.timeup.show("请先登录",1500);
        }
    })
    }

    clearData(){
      this.setState({data:[]})
      this.state.uploadData=""
    }

    getTime(){
      hours=(new Date()).getHours()
      if(hours<10){
        this.state.hour='0'+hours
      }
      else{
        this.state.hour=""+hours
      }
      minutes=(new Date()).getMinutes()
      if(minutes<10){
        this.state.minute='0'+minutes
      }
      else{
        this.state.minute=""+minutes
      }
    }

}

const styles = StyleSheet.create({
  counter: {
    fontSize: 50,
    textAlign: 'center',
    margin: 20,
    color:'black',
    opacity:0.80,
  },
  header: {
    flexDirection: 'row',
    height: 30,
    marginTop:5,
    alignItems: 'center'
  },
  backspace: {
    fontSize: 0,
    textAlign: 'center',
    margin: 15,
  },
  recorder: {
    fontSize: 20,
    textAlign: 'left',
    margin: 0,
    color:'#979797',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    opacity:1,
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 0,
    borderRadius: 2
  },
  backgroundImage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        //width:gScreen.width,
        //height:gScreen.height
        //backgroundColor:'rgba(0,0,0,0)',
  },
  center: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  right: {
    flex:1,
    marginTop:10,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  left: {
    flex:1,
    marginTop:10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

});