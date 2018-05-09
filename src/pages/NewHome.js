import React, { Component } from 'react'
import {
    StyleSheet,
    ListView,
    View,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    NativeModules,
    AppState
} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'

import TextInput from '../components/_TextInput'

{
    var display="开始"
    var pause=true
    var refreshed=false
    var m=24
    var i=0
    var backIM=require('../resource/Back.png')
    var Prevtime=0
    var se=0
} 

export default class NewHome extends Component {

  static navigationOptions = {
    header: null,
  };
  
   constructor(props) {
         super(props);
         var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
          this.state = {
                time:0,
                dataSource:ds,
                data:[],
                time1:(new Date()).valueOf()+25*60*1000,
                name:"请输入所完成的任务",
                duration:10*1000
        };
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
           display="再次\n开始"
           pause=true
           this.refs.timeup.show(this.state.duration/60000+"分钟周期完毕");
         }
         if (!pause){
          se=(s-m*60)
          if((se).toFixed(0)==60) se=59//仅修正毫秒换算成秒后的显示问题，不造成时间记录上的误差
          return ((m)+":"+Math.floor(se))
         }
         else{
          if (display=="开始")
            return "开始"
          else 
          if  (display=="再次\n开始")
            return "再次\n开始"
          else
            return "记录中"
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
        this.setState({time1:(new Date()).valueOf()+this.state.duration})
      }
      if(!pause){
        this.editView.show()
        i=i+1
      }
      pause=!pause
    }

    render(){
      return(
        <View style={styles.container}>
          {this._render()}
          <Toast ref="timeup" position='top' opacity={0.6}/>
          <TextInput
             ref={editView => this.editView = editView}
             inputText={this.state.name}
             titleTxt={"刚完成了这些..."}
             ensureCallback={name=> ((refreshed=true),this.state.data[i]=((24-m).toFixed(0)+":"+(60-(s-m*60).toFixed(0)))+"  (M:S)"+"        :   "+name)}
          /> 
        </View>
      )
    }

    _renderRow(rowData,rowId){
      return(
       <Text style={styles.recorder}>{rowData}</Text>
       )
      }

    _render() {
        if (refreshed==true){
            refreshed=false
            pause=false
        }
        display=this.countdown() 
      return ( 
          <View>  
            <ImageBackground
                style={styles.backgroundImage}
                source={backIM}
                resizeMode="cover">
            <Text style={styles.backspace}> 
             </Text>
            <ImageBackground
              style={{width:220, height:220,alignItems:'center',justifyContent:'center',}}
              source={require('../resource/Home_Circle.png')}
              resizeMode="cover">
          <TouchableOpacity style={styles.btn} onPress={this.addPoint.bind(this)}>
            <Text style={styles.counter}>
             {display}
             </Text>
          </TouchableOpacity>
          </ImageBackground>
            <Text style={styles.backspace}> 
             </Text>
           
            <ListView
              enableEmptySections = {true}
              style={{margin:20,}}
              dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
              renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,rowId)} />
            </ImageBackground>

            
          </View>

        )
    }
}

const styles = StyleSheet.create({
  counter: {
    fontSize: 50,
    textAlign: 'center',
    margin: 20,
    color:'rgb(222,148,151)',
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
    color:'rgb(222,148,151)',
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
 backgroundImage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        //width:gScreen.width,
        //height:gScreen.height
        //backgroundColor:'rgba(0,0,0,0)',
  },

});