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
    } from 'react-native'
import My from './My'
import Toast, {DURATION} from 'react-native-easy-toast'

export default class Register extends Component {

  static navigationOptions = {
    headerTitle: 
      <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
        <Text style={{color: 'rgb(222,148,151)',fontSize:20}}>注册</Text>
      </View>,
    headerRight:      
    <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
    </View>,
    headerTintColor:'rgb(222,148,151)',
  };

  constructor(props) {
        super(props);
        this.regist=this.regist.bind(this);
        navigation=this.props.navigation;
        this.state = {
                conceal:true,
                renderPlaceholderOnly: true,
                name:"",
                password:"",
                password_veri:"",
        };
    }

  /*componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }*/

  regist() {
    if ((this.state.password_veri=="")||(this.state.name=="")||(this.state.password=="")){
        this.refs.logininfo.show("请将信息填写完整")
    }
    else{
      if(this.state.password_veri!=this.state.password){
        this.refs.logininfo.show("两次输入密码不一致！")
      }
      else{
        fetch('http://192.168.1.100:3000/signup', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              name:this.state.name,
              password:this.state.password,
              repassword:this.state.password,
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
              this.refs.logininfo.show("注册成功");
              this.props.navigation.navigate('BaseTab');
            }
        })
      }
    }
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

  _conceal(){
    this.setState({conceal:!this.state.conceal});
  }

  render() {
      return this._render_later();
  }

  _render_later() {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
          style={styles.container}
          source={require('../resource/Back_changed.png')}
          resizeMode="cover">

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
    </View>
    );
  }
  
  _render_earlier() {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

      <View
        style={styles.header}>
          <Image style={{width: 30, height: 40}} source={require('../resource/my_left.png')}/>
      </View>

      <ImageBackground
          style={styles.container}
          source={require('../resource/Back_changed.png')}
          resizeMode="cover">

    </ImageBackground>
    </View>
    );
  }
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
    color: 'rgb(222,148,151)',
  },
  input_pw: {
    width: 180,
    height: 40,
    color: 'rgb(222,148,151)',
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
    color: 'rgb(222,148,151)',
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
});
