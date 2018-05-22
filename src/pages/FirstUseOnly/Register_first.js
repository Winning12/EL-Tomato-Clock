import React, { Component } from 'react'
import { 
    Image,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ImageBackground,
    InteractionManager,
    AsyncStorage,
    Modal
    } from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'

var avatars=[require('../../resource/1.png'),require('../../resource/2.png'),
require('../../resource/3.png'),require('../../resource/4.png'),
require('../../resource/5.png'),require('../../resource/6.png'),
require('../../resource/7.png'),require('../../resource/8.png'),
require('../../resource/9.png'),require('../../resource/10.png'),
require('../../resource/11.png'),]
export default class RegisterFirst extends Component {

  static navigationOptions = {
    headerTitle: 
      <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
        <Text style={{color: '#686868',fontSize:20}}>注册</Text>
      </View>,
    headerRight:      
    <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
    </View>,
    headerTintColor:'#686868',
  };

  constructor(props) {
        super(props);
        this.regist=this.regist.bind(this);
        this._renderAvatar=this._renderAvatar.bind(this);
        this._renderChoice=this._renderChoice.bind(this);
        this._renderRandom=this._renderRandom.bind(this);
        navigation=this.props.navigation;
        this.state = {
                conceal:true,
                renderPlaceholderOnly: true,
                name:"",
                password:"",
                password_veri:"",
                avatar:null,
                avatarid:"0",
                visible:false
        };
    }

  /*componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }*/
  render() {
    return this._render_later();
}

  _render_later() {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
    <ImageBackground
        style={styles.container}
        source={require('../../resource/Back_login.png')}
        resizeMode="cover">
      
      <TouchableOpacity 
        activeOpacity={0.5} 
        style={{marginBottom:30,opacity:0.8}} 
        onPress={()=>{this.setState({visible:true})}}>
        {this._renderAvatar()}
      </TouchableOpacity>

      <View
        style={styles.inputBox}>
        <Text
          style={styles.btText}>用户名</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => this.setState({name:text})}/>
      </View>

      <View
        style={styles.inputBox}>
         <Text
          style={styles.btText}>   密码   </Text>
        <TextInput
          style={styles.input_pw}
          secureTextEntry={this.state.conceal}
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => this.setState({password:text})}/>
      <TouchableOpacity onPress={this._conceal.bind(this)}>
        <Text
          style={styles.btText}>显示</Text>
      </TouchableOpacity>
      </View>

      <View
        style={styles.inputBox}>
         <Text
          style={styles.btText}>确认密码</Text>
        <TextInput
          style={styles.input_pw}
          secureTextEntry={this.state.conceal}
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => this.setState({password_veri:text})}/>
      </View>


      <TouchableOpacity
        style={styles.button}
        onPress={this.regist}>
        <Text
          style={styles.btText}>注册</Text>
      </TouchableOpacity>

    </ImageBackground>
    <Toast ref="logininfo" position='top' opacity={0.6}/>
    <Modal
      animationType='fade'
      visible={this.state.visible}
      transparent={true}>
        <View
          style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.3)'}}>
          <View style={{borderRadius: 10,backgroundColor:'rgb(248,248,248)'}}>
            <View style={{flexDirection:'row'}}>
              {this._renderChoice(0)}
              {this._renderChoice(1)}
              {this._renderChoice(2)}
            </View>
            <View style={{flexDirection:'row'}}>
              {this._renderChoice(3)}
              {this._renderChoice(4)}
              {this._renderChoice(5)}
            </View>
            <View style={{flexDirection:'row'}}>
              {this._renderChoice(6)}
              {this._renderChoice(7)}
              {this._renderChoice(8)}
            </View>
            <View style={{flexDirection:'row'}}>
              {this._renderChoice(9)}
              {this._renderChoice(10)}
              {this._renderRandom()}
            </View>
          </View>
        </View>
    </Modal>
  </View>
  );
  }
  _renderRandom(){
    i=Math.floor(11*Math.random())
    return(
      <TouchableOpacity style={styles.choiceContainer} onPress={()=>{this.setState({visible:false,avatar:avatars[i],avatarid:i+""})}}>
        <Text style={{fontSize:20}}>随机{"\n"}选择</Text>
      </TouchableOpacity>
      )
  }

  _renderChoice(i){
    return(
    <TouchableOpacity style={styles.choiceContainer} onPress={()=>{this.setState({visible:false,avatar:avatars[i],avatarid:i+""})}}>
      <Image
      style={{width: 60, height: 60}}
      source={avatars[i]}
      />
    </TouchableOpacity>
    )
  }

  _renderAvatar(){
    if(this.state.avatar==null){
      return (
        <View style={styles.avatarContainer}>
          <Text>选择头像</Text>
        </View> )
    }
    else
      return (<View style={styles.avatarContainer}>
          <Image
          style={{width: 80, height: 80}}
          source={this.state.avatar}
          />
        </View>)
  }

  regist() {
    if ((this.state.password_veri=="")||(this.state.name=="")||(this.state.password=="")){
        this.refs.logininfo.show("请将信息填写完整")
    }else if(this.state.avatar==null){
        this.refs.logininfo.show("请选择头像")
    }else{
      if(this.state.password_veri!=this.state.password){
        this.refs.logininfo.show("两次输入密码不一致！")
      }
      else{
        fetch('http://118.25.56.186/signup', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              name:this.state.name,
              password:this.state.password,
              repassword:this.state.password,
              avatar:this.state.avatarid
              })
        }).then((response) => response.json())
        .then((jsonData) => {
            let loginreturn = jsonData.status;
            let description = jsonData.description;
            if (loginreturn=="fail"){
              if (description=="username has been used")
                this.refs.logininfo.show("用户名已存在");
            }
            else{
              AsyncStorage.clear();
              AsyncStorage.setItem('ifFirst',"false"); 
              AsyncStorage.setItem('user',this.state.name); 
              AsyncStorage.setItem('logined',"true");
              this.refs.logininfo.show("注册成功");
              this.timer = setTimeout(() => {
                this.props.navigation.replace('BaseTab');
              }, 1000)
            }
        })
      }
    }
  }

  
  _conceal(){
    this.setState({conceal:!this.state.conceal});
  }

  /*loginout(){
    fetch('http://192.168.1.100:3000/signout', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
    .then((jsonData) => {
        let loginreturn = jsonData.status;
        alert(loginreturn);
        this.props.navigator.pop();
    })
  }*/

  
  /*_render_earlier() {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

      <View
        style={styles.header}>
          <Image style={{width: 30, height: 40}} source={require('../../resource/my_left.png')}/>
      </View>

      <ImageBackground
          style={styles.container}
          source={require('../../resource/Back_changed.png')}
          resizeMode="cover">

    </ImageBackground>
    </View>
    );
  }*/
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: 200,
    height: 40,
    color: '#686868',
  },
  input_pw: {
    width: 180,
    height: 40,
    color: '#686868',
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 8,
    opacity:0.9,
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
  button_small:{
    height: 50,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',    
    marginBottom: 8,
    opacity:0.9,
  },
  btText: {
    color: '#686868',
  },
  header: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center'
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    },
  right: {
    flex: 1,
    marginLeft: 18,
    flexDirection: 'column',
    alignItems: 'flex-end',
    },
  center: {
    flex: 1,
    marginLeft: 18,
    flexDirection: 'column',
    alignItems: 'center',
    },    
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceContainer:{
    width:80,
    height:80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3
  }
});
