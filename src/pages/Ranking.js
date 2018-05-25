import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    AsyncStorage,
    FlatList
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import {createAnimatableComponent, View} from 'react-native-animatable'
import * as Progress from 'react-native-progress';

var Dimensions = require('Dimensions');  
var thisWidth = Dimensions.get('window').width; 
var avatars=[require('../resource/1.png'),require('../resource/2.png'),
require('../resource/3.png'),require('../resource/4.png'),
require('../resource/5.png'),require('../resource/6.png'),
require('../resource/7.png'),require('../resource/8.png'),
require('../resource/9.png'),require('../resource/10.png'),
require('../resource/11.png'),]
//专注排名功能
export default class Ranking extends Component {
    constructor(props) {
        super(props);
        navigation=this.props.navigation;
        this.getView=this.getView.bind(this)
        this.handleFill=this.handleFill.bind(this)
        this._renderMine=this._renderMine.bind(this)
        this.state = {
            data: [],
            refreshing: false,
            length:0,
            myitem:{},
            name:"",
            login:false
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("logined")
        .then((result) => {
         if(result=="true"){
             this.setState({login:true})
         }
        })
        AsyncStorage.getItem("user")
        .then((result) => {
            this.setState({name:result})
        })
        fetch('http://118.25.56.186/users/rankbytomatoes', {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json'
            }
            }).then((response) => response.json())
            .then((response) => {
                var json = response;
                this.setState({
                    data: json,
                });
                for (i=0;i<this.state.data.length;i++){
                    if(this.state.data[i].name==this.state.name)
                        this.setState({myitem:this.state.data[i]})
                }
            })
            .catch((error) => {
                if (error) {
                    console.log('error', error);
                }
            });
    }

    static navigationOptions = {
        headerTitle: 
          <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
            <Text style={{color: '#686868',fontSize:20}}>专注排名</Text>
          </View>,
        headerRight:      
        <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
        </View>,
        headerTintColor:'#686868',
    };

    render(){
        return (
        <View animation="fadeIn" style={styles.container} useNativeDriver>
        {this._renderMine()}
        <FlatList
            data={this.state.data}
            renderItem={this.getView}

            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            ListFooterComponent={
                        <View style={{height:50}}>
                        </View>
                    }
        />
        </View>
        )
    }

    _renderMine(){
        if(this.state.login){
            return(
            <View style={{alignItems: 'center',flexDirection:'row',backgroundColor:"white"}}>
                <View style={styles.avatarContainer}>
                    <Image
                    style={{width: 35, height: 35}}
                    source={require('../resource/my_avatar.png')}
                    />
                </View>
                <View style={{marginLeft:5,flexDirection:'column'}}>
                    <Text style={{fontSize:15}}>我：</Text>
                    <Progress.Bar style={{marginTop:5}} progress={this.handleFill(this.state.myitem)} width={250} height={8} color="#686868"  useNativeDriver/>
                </View>
            </View>
            )
        }else{
            return(
            <View style={{opacity:0.7,alignItems: 'center',height:55,flexDirection:'row',backgroundColor:"white"}}>
                <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Login')}>
                    <Text style={{fontSize:20}}>登录以查看排名</Text>
                </TouchableOpacity>
            </View>)
        }
    }

    getView({item}) {
        return (
        <View animation="fadeIn" style={{marginTop:10,marginBottom:10,alignItems: 'center',flexDirection:'row'}} useNativeDriver>
            <View style={styles.avatarContainer}>
                <Image
                style={{width: 35, height: 35}}
                source={avatars[parseInt(item.avatar)]}
                />
            </View>
            <View style={{marginLeft:5,flexDirection:'column'}}>
                <Text style={{fontSize:18}}>{item.name}</Text>
                <Progress.Bar style={{marginTop:5}} progress={this.handleFill(item)} width={thisWidth-100} height={8} color="#686868"/>
            </View>
        </View>
        )
    };

    onRefresh = () => {
        fetch('http://118.25.56.186/users/rankbytomatoes', {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json'
            }
            }).then((response) => response.json())
            .then((response) => {
                var json = response;
                this.setState({
                    data: json,
                });
                if(this.state.login){
                    for (i=0;i<this.state.data.length;i++){
                        if(this.state.data[i].name==this.state.name)
                            this.setState({myitem:this.state.data[i]})
                    }
                }
            })
            .catch((error) => {
                if (error) {
                    console.log('error', error);
                }
            });
    }

    handleFill(item){
        if(this.state.length<=parseInt(item.tomato))
            this.state.length=parseInt(item.tomato)
        if(this.state.length!=0){
            return 1.0*parseInt(item.tomato)/this.state.length
        }else{
            return 1.0
        }
    }


}
const styles = StyleSheet.create({
    container: {
        flex:1,
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
        backgroundColor: 'white',
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