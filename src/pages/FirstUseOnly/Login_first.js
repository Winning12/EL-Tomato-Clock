import React, { Component } from 'react'
import { 
    Image,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    InteractionManager,
    AsyncStorage,
    } from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import { StackNavigator } from 'react-navigation';
import { createAnimatableComponent, View} from 'react-native-animatable'

//从第一次启动时的app介绍界面登陆所显示的登录界面（所属导航器父子层级不同，故不可与一般登录界面合并）
export default class Loginfirst extends Component {
  static navigationOptions = {//导航器header选项
    headerTitle: 
      <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
        <Text style={{color: '#686868',fontSize:20}}>登录</Text>
      </View>,
    headerRight:
      <View  style={{flex: 1,flexDirection: 'column',alignItems: 'flex-end',marginRight:20}}>
        <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate('Register')}
        style={{flexDirection:'row',alignItems: 'center'}}>
          <Text style={{color: '#686868',fontSize:20}}>注册</Text>
        </TouchableOpacity>
      </View>,
    headerTintColor:'#686868',
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

  /*componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }*/
  //原计划做逐层渲染的代码，因性能足够，没有采用

  loginin() {//向服务器发送数据和存储本地的登录功能
    if ((this.state.name=="")||(this.state.password=="")){
        this.refs.logininfo.show("用户名或密码为空！")
    }
    else{
        fetch('http://118.25.56.186/signin', {
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
                AsyncStorage.clear();
                AsyncStorage.setItem('ifFirst',"false"); 
                AsyncStorage.setItem('user',this.state.name); 
                AsyncStorage.setItem('logined',"true");
                this.refs.logininfo.show("已经登录");
                this.timer = setTimeout(() => {
                  this.props.navigation.navigate('BaseTab');
                }, 1000)//延迟1秒后进入Tab导航器
              }
              else{
                AsyncStorage.clear();
                AsyncStorage.setItem('ifFirst',"false"); 
                AsyncStorage.setItem('user',this.state.name); 
                AsyncStorage.setItem('logined',"true");
                this.refs.logininfo.show("登录成功");
                this.timer = setTimeout(() => {
                  this.props.navigation.navigate('BaseTab');
                }, 1000)
              }
            }
        })
    }
  }

  loginout(){//便于测试登录逻辑的登出方法，没有使用在release版中
    fetch('http://118.25.56.186/signout', {
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

  regist(){//用户点击右上角时，导航至注册界面
    this.props.navigation.replace({
      scene: Register,
    });
  }

  _conceal(){//改变密码显示状态
    this.setState({conceal:!this.state.conceal});
  }

  render() {
      return this._render_later();
      //便于做逐层渲染，将组件先抽象至各层的渲染方法
      //再根据需要渲染（因性能足够，此处只有一层）
  }

  _render_later() {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

      <ImageBackground
          style={styles.container}
          source={require('../../resource/Back_login.png')}
          resizeMode="cover">
        
        <View style={{marginBottom:30}}>
          <Image
            style={{width: 100, height: 100,opacity:0.5}}
            source={require('../../resource/logo.png')}
          />
        </View>

        <View
          animation='fadeInLeft'
          style={styles.inputBox}
          useNativeDriver>
          <Text
            style={styles.btText}>用户名</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={'transparent'}
            onChangeText={(text) => this.setState({name:text})}/>
        </View>

        <View
          animation='fadeInLeft'
          delay={50}
          style={styles.inputBox}
          useNativeDriver>
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
          animation='fadeInLeft'
          delay={100}
          useNativeDriver>
        <TouchableOpacity
          style={styles.button}
          onPress={this.loginin}>
          <Text
            style={styles.btText}>登录</Text>
        </TouchableOpacity>
        </View>
                
        <View
          animation='fadeInLeft'
          delay={150}
          useNativeDriver>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.refs.logininfo.show("联系开发者：\nQQ：1009670650 \n邮箱：wenhao_jun@outlook.com",1500)}}>
          <Text
            style={styles.btText}>登录遇到问题，需要帮助</Text>
        </TouchableOpacity>
        </View>
    </ImageBackground>
      <Toast ref="logininfo" position='top' opacity={0.6}/>
    </View>
    );
  }
  
  //被弃用的其他方法
  /*_render_earlier() {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

      <View
        style={styles.header}>
          <Image style={{width: 30, height: 40}} source={require('../../resource/my_left.png')}/>
          <Text style={{color: '#686868',fontSize:16}}>返回</Text>
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
  //样式表，因同名样式在不同页面须作微调，故没有导出到外部存储再引用，避免混淆
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
});
