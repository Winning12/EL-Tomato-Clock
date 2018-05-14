import React, {PureComponent} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    AsyncStorage,
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import Login from './Login_new'
import Toast, {DURATION} from 'react-native-easy-toast'
import {createAnimatableComponent, View,} from 'react-native-animatable'

export default class Profile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
                name:"",
                logined:false,
        };
    }
    
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        AsyncStorage.getItem("user")
        .then((result) => {
            this.setState({name:result})
        })
        AsyncStorage.getItem("logined")
        .then((result) => {
            if(result=="true")
                this.setState({logined:true})
            else
                this.setState({logined:false})
        })
    }

    refresh=()=>{
        AsyncStorage.clear();
        fetch('http://118.25.56.186/signout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }).then((response) => response.json())
        .then((jsonData) => {
        let loginreturn = jsonData.status;
        if (loginreturn="success"){
            this.refs.logininfo.show("已经注销用户")
            AsyncStorage.setItem('logined',"false")
            AsyncStorage.setItem('user',"");
            this.setState({name:"",logined:false})
        } 
        })
    }

    loginOut=()=>{
        fetch('http://118.25.56.186/signout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }).then((response) => response.json())
        .then((jsonData) => {
        let loginreturn = jsonData.status;
        if (loginreturn="success"){
            this.refs.logininfo.show("已经注销用户")
            AsyncStorage.setItem('logined',"false");
            AsyncStorage.setItem('user',"");
            this.setState({name:"",logined:false})
        } 
    })
    }

    _onLogin = () => {
        this.props.navigation.replace({
            scene: Login,
          });
        /*this.props.navigator.push({
            component: Login,
        })*/
    }

    _onChart = () => {
        this.props.navigator.replace({
            scene: MyChart,
        })
    }

    _onPressStaticCell = title => alert(title)

    render() {
        AsyncStorage.getItem("user")
        .then((result) => {
            this.setState({name:result})
        })
        if(this.state.logined)
            return (
           this._render_logined()
            )
        else
            return(
            this._render_unlogined()
            )
    }

    _render_logined(){
        const { navigate } = this.props.navigation;
        return(
             <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ImageBackground
                style={{height: 230, alignItems: 'center', backgroundColor: 'transparent'}}
                source={require('../resource/img_my_head.png')}
                >
                    <View style={[styles.header]}>
                        <Text style={{color: 'white', fontSize: 16}}>{this.state.name}</Text>
                    </View>
                    <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                    }}>
                    <View style={styles.avatarContainer}>
                        <Image
                        style={{width: 60, height: 60}}
                        source={require('../resource/my_avatar.png')}
                        />
                    </View>
                    <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.loginContainer}
                    onPress={this.loginOut}
                    >
                        <Text style={{color: 'white'}}>注销</Text>
                    </TouchableOpacity>
            </View>
        </ImageBackground>
                <View style={[styles.cellContainer]}>
                    <ProfileStaticCell
                        title="专注统计"
                        imageName={require('../resource/ic_my_photos.png')}
                        onPress={()=>navigate('Statistic')}
                        anima='fadeInLeft'
                    />
                    <ProfileStaticCell
                        title="专注排名"
                        imageName={require('../resource/ic_my_collect.png')}
                        onPress={()=>navigate("Ranking")}
                        anima='fadeInLeft'
                        delay={50}
                    />
                    <ProfileStaticCell
                        title="我的分享"
                        imageName={require('../resource/ic_my_upload.png')}
                        onPress={this._onPressStaticCell}
                        anima='fadeInLeft'
                        delay={100}
                    />
                    <ProfileStaticCell
                        title="重置应用"
                        imageName={require('../resource/ic_my_right.png')}
                        onPress={this.refresh}
                        anima='fadeInLeft'
                        delay={150}
                    />
                </View>
                <Toast ref="logininfo" position='top' opacity={0.6}/>
            </View>
        )
    }

    _render_unlogined(){
        const { navigate } = this.props.navigation;
        return(
             <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ImageBackground
                style={{height: 230, alignItems: 'center', backgroundColor: 'transparent'}}
                source={require('../resource/img_my_head.png')}
                >
                    <View style={[styles.header]}>
                        <Text style={{color: 'white', fontSize: 16}}>{this.state.name}</Text>
                    </View>
                    <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                    }}>
                    <View style={styles.avatarContainer}>
                        <Image
                        style={{width: 60, height: 60}}
                        source={require('../resource/my_avatar.png')}
                        />
                    </View>
                    <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.loginContainer}
                    onPress={()=>navigate('Login')}
                    >
                        <Text style={{color: 'white'}}>点击登录</Text>
                    </TouchableOpacity>
            </View>
        </ImageBackground>
                <View style={[styles.cellContainer]}>
                    <ProfileStaticCell
                        title="专注统计"
                        imageName={require('../resource/ic_my_photos.png')}
                        onPress={()=>navigate('Statistic')}
                        anima='fadeInLeft'
                    />
                    <ProfileStaticCell
                        title="专注排名"
                        imageName={require('../resource/ic_my_collect.png')}
                        onPress={()=>navigate("Ranking")}
                        anima='fadeInLeft'
                        delay={50}
                    />
                    <ProfileStaticCell
                        title="我的分享"
                        imageName={require('../resource/ic_my_upload.png')}
                        onPress={this._onPressStaticCell}
                        anima='fadeInLeft'
                        delay={100}
                    />
                    <ProfileStaticCell
                        title="重置应用"
                        imageName={require('../resource/ic_my_right.png')}
                        onPress={this.refresh}
                        anima='fadeInLeft'
                        delay={150}
                    />
                </View>
                <Toast ref="logininfo" position='top' opacity={0.6}/>
            </View>
        )
    }
}


const ProfileStaticCell = ({
    title,
    imageName,
    style,
    onPress,
    anima,
    delay
}) => {
    return (
        <View animation={anima} delay={delay} useNativeDriver>
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.staticCell}
            onPress={()=>onPress(title)}
        >
            <Image style={{width: 20, height: 20, marginHorizontal: 15}} source={imageName}/>
            <View style={[styles.cellStyle, style || style]}>
                <Text style={{color: 'gray'}}>{title}</Text>
                <Image style={{width: 20, height: 20}} source={require('../resource/ic_my_right.png')}/>
            </View>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    loginContainer: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2
    },
    cellContainer: {
        borderColor: '#d9d9d9',
        marginTop: 15,
        backgroundColor: 'white'
    },
    staticCell: {
        flexDirection: 'row',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cellStyle: {
        flex: 1,
        height: 46,
        borderColor: '#d9d9d9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15
    }
});