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
    } from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import { StackNavigator } from 'react-navigation';

export default class Loginfirst extends Component {
  static navigationOptions = {
    headerTitle: 
      <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
        <Text style={{color: 'rgb(222,148,151)',fontSize:20}}>登录</Text>
      </View>,
    headerRight:
      <View style={{flex: 1,flexDirection: 'column',alignItems: 'flex-end',marginRight:20}}>
        <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate('Register')}
        style={{flexDirection:'row',alignItems: 'center'}}>
          <Text style={{color: 'rgb(222,148,151)',fontSize:20}}>注册</Text>
        </TouchableOpacity>
      </View>,
    headerTintColor:'rgb(222,148,151)',
  };

  constructor(props) {
        super(props);
        this.loginin=this.loginin.bind(this);
        navigation=this.props.navigation;
        this.state = {
                conceal:true,
                renderPlaceholderOnly: true,
                name:"",
                password:"",
                username:"",
        };
    }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  loginin() {
    if ((this.state.name=="")||(this.state.password=="")){
        this.refs.logininfo.show("用户名或密码为空！")
    }
    else{
      //when tested on server,use http://www.clavier.moe
        fetch('http://118.25.56.186:3000/signin', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              name:this.state.name,
              password:this.state.password
              })
        }).then((response) => response.json())
        .then((jsonData) => {
            let loginreturn = jsonData.status;
            let description = jsonData.description;
            let errorcase=jsonData.case;
            if (loginreturn=="fail"){
              if (errorcase==1)
                this.refs.logininfo.show("登录失败，用户名不存在");
              else if(errorcase==2)
                this.refs.logininfo.show("登录失败，用户名或密码错误");
            }
            else{
              if (loginreturn=="error"){
                AsyncStorage.setItem('user',this.state.name); 
                this.refs.logininfo.show("已经登录");
                this.timer = setTimeout(() => {
                  this.props.navigation.navigate('BaseTab');
                }, 1000)
              }
              
              else{
                AsyncStorage.setItem('user',this.state.name); 
                this.refs.logininfo.show("登录成功");
                this.timer = setTimeout(() => {
                  this.props.navigation.navigate('BaseTab');
                }, 1000)
              }
            }
        })
    }
  }

  loginout(){
    fetch('http://118.25.56.186:3000/signout', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
    .then((jsonData) => {
        let loginreturn = jsonData.status;
        alert(loginreturn);
    })
  }

  regist(){
    this.props.navigation.replace({
      scene: Register,
    });
  }

  _conceal(){
    this.setState({conceal:!this.state.conceal});
  }

  render() {
      return this._render_later();//now render only once
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


        <TouchableOpacity
          style={styles.button}
          onPress={this.loginin}>
          <Text
            style={styles.btText}>登录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.refs.logininfo.show("联系开发者：\nQQ：1009670650 \n邮箱：wenhao_jun@outlook.com",1500)}}>
          <Text
            style={styles.btText}>登录遇到问题，需要帮助</Text>
        </TouchableOpacity>
    </ImageBackground>
      <Toast ref="logininfo" position='top' opacity={0.6}/>
    </View>
    );
  }
  
  /*_render_earlier() {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

      <View
        style={styles.header}>
          <Image style={{width: 30, height: 40}} source={require('../resource/my_left.png')}/>
          <Text style={{color: 'rgb(222,148,151)',fontSize:16}}>返回</Text>
      </View>

      <ImageBackground
          style={styles.container}
          source={require('../resource/Back_changed.png')}
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
