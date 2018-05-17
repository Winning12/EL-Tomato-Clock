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
} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import TextInput from '../components/_TextInput'
import { createAnimatableComponent, View, Text } from 'react-native-animatable'

{
    var display="开始"
    var pause=true
    var refreshed=false
    var m=24
    var i=0
    var backIM=require('../resource/Back.png')
    var Prevtime=0
    var se=0
    var retnormal=false
    var hours=0
    var minutes=0
} 

export default class Home extends Component {


   constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            time:0,
            dataSource:ds,
            data:[],
            time1:(new Date()).valueOf()+25*60*1000,
            name:"完成了：",
            duration:25*60*1000,
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

    componentDidMount() {
      AsyncStorage.setItem("1","4")
      AsyncStorage.setItem("2","6")
      AsyncStorage.setItem("3","4")
      AsyncStorage.setItem("4","3")
      AsyncStorage.setItem("5","5")
      AsyncStorage.setItem("6","8")
      AsyncStorage.setItem("7","7")
      AsyncStorage.getItem("user")
        .then((result) => {
            this.setState({username:result})
      })
      AsyncStorage.getItem("date")
      .then((result) => {
          if(result!=this.state.year+this.state.month+this.state.day){
            AsyncStorage.setItem('tomato',"0")
            AsyncStorage.setItem('date',this.state.year+this.state.month+this.state.day)
          }
          AsyncStorage.getItem("tomato")
          .then((result) => {
              this.setState({tomato:parseInt(result)})
          })
      })
      
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
               this.state.data[i]=(this.state.hour+"时"+this.state.minute+"分"+"       "+name),
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
            pause=false
        }
        display=this.countdown() 
      return ( 
          <View animation="fadeIn" style={styles.center}>  
            <AnimatedCircularProgress
            style={{opacity:0.70}}
            size={220}
            width={4}
            fill={(100*1000*s/this.state.duration)}
            tintColor="black"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#a3a3a3" >
            {(fill) => (
            <TouchableOpacity style={styles.btn} onPress={this.addPoint.bind(this)}>
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
      //Android.isLocked((Bk)=>{locked=Bk})
      //if (locked){
       this.timer = setTimeout(() => {
        this.setState({time:(new Date()).valueOf()});
       }, 10)
       s=(parseInt((this.state.time1-this.state.time)/10)/100).toFixed(2)
       m=Math.floor((s+1)/60)
       //console.log("off")
       if(s<=0){
         this.state.weekday=(new Date()).getDay()
         display="再次\n开始"
         pause=true
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
              })
          }
         })
         
       }
       if (!pause){
        se=(s-m*60)
        if((se).toFixed(0)==60) se=59//仅修正毫秒换算成秒后的显示问题，不造成时间记录上的误差
        if(se<10) 
          se="0"+Math.floor(se)
        else
          se=Math.floor(se)
        if(m<10)
          m="0"+m
        return ((m)+":"+se)
       }
       else{
        if (display=="开始"){
          this.state.time1=((new Date()).valueOf()+25*60*1000)
          return "开始"
        }
        else 
        if  (display=="再次\n开始"){
          this.state.time1=((new Date()).valueOf()+25*60*1000)
          return "再次\n开始"
        }
        else
          return ((m)+":"+Math.floor(se))
       }
      /*}
      else{
        this.timer = setTimeout(() => {
        this.setState({time:(new Date()).valueOf()})
        }, 10)
        s=(parseInt((time1-this.state.time)/10)/100).toFixed(2)
        m=Math.floor(s/60)
        console.log("on")
        return ((m)+":"+(s-m*60-1).toFixed(0))
      }*/

       //this.timer = setTimeout(() => {
       //this.setState({time:(new Date()).valueOf()});
       //}, 10)
       //s=(parseInt((this.state.time-time1)/10)/100).toFixed(2)
    } 

    addPoint(){
      if(display=="开始"|display=="再次\n开始"){
        pause=!pause
        this.setState({time1:(new Date()).valueOf()+this.state.duration})
      }else{
        if(!pause){
          this.editView.show()
          i=i+1
        }
      }
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