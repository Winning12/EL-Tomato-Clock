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

export default class Sharing extends Component {
    constructor(props) {
        super(props);
        navigation=this.props.navigation;
        this.getView=this.getView.bind(this)
        this._renderFooter=this._renderFooter.bind(this)
        this._renderHeader=this._renderHeader.bind(this)
        this.state = {
            data: [],
            refreshing: false,
            length:0,
            myitem:{},
            name:"",
            login:false,
            year:(new Date()).getFullYear(),
            month:(new Date()).getMonth()+1,
            day:(new Date()).getDate(),
            opacity:0.7,
            name:"",
            username:"",
            login:false,
        };
    }

    componentWillMount() {
        AsyncStorage.getItem("logined")
        .then((result) => {
         if(result=="true"){
             this.setState({login:true})
         }
        })
        AsyncStorage.getItem("user")
        .then((result) => {
            this.setState({username:result})
            if((this.state.username!="")&&(this.state.username!=null)){
            fetch('http://118.25.56.186/data?name='+this.state.username, {
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
                })
                .catch((error) => {
                    if (error) {
                        console.log('error', error);
                    }
                });
            }
        })
    }

    static navigationOptions = {
        headerTitle: 
          <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
            <Text style={{color: '#686868',fontSize:20}}>我的分享</Text>
          </View>,
        headerRight:      
        <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
        </View>,
        headerTintColor:'#686868',
    };

    render(){
        return (
           <View style={styles.container}>
                {this._renderHeader()}
                <FlatList
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.getView}

                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}

                    ListFooterComponent={
                        this._renderFooter()
                    }
                />
            </View>
        )
    }


    getView({item}) {
        return (
            <View animation='fadeIn' useNativeDriver>
            <TouchableOpacity 
            activeOpacity={0.75}>
                <View style={styles.item}>
                    <View style={{marginLeft:10,marginTop:10}}>
                        <Text style={{ color: '#333333',fontSize:18}}>{item.content}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginLeft:20,marginTop:10,marginBottom:5}}>
                        <Text style={{ color: '#a8a8a8',fontSize:15}}>{this.handleItemDate(item)}</Text>
                        <View style={{justifyContent:'center',alignItems: 'flex-end',flex: 1,marginRight:20}}>
                            <TouchableOpacity 
                            activeOpacity={0.5}>
                                <View style={{opacity:this.state.opacity,flexDirection:'row',borderRadius:5,borderWidth:1,borderColor:'#c8c8c8'}}>
                                    <Image style={{margin:3,width:20,height:20}} source={require('../resource/ic_feed_like.png')}/>
                                    <Text style={{margin:3}}>{this.handleLikeNumbers(item) + ''}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        )
    };

    handleItemDate(item){
        if(item.year==this.state.year){
            if(item.month==this.state.month){
                if(item.day==this.state.day)
                    return "今天    "+item.hour+"时"+item.min+"分发布"
                else
                    return item.month+"月"+item.day+"日"+item.hour+"时"+item.min+"分发布"
            }
            else 
                return item.month+"月"+item.day+"日"+item.hour+"时"+item.min+"分发布"
        }
        else
            return item.year+"年"+item.month+"月"+item.day+"日"+item.hour+"时"+item.min+"分发布"
    }

    handleLikeNumbers(item){
        if(item.likedusers!=undefined)
            return item.likedusers.length
        else
            return 0
    }

    onRefresh = () => {
        if((this.state.name!="")&&(this.state.username!=null))
        fetch('http://118.25.56.186/data?name='+this.state.username, {
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
            })
            .catch((error) => {
                if (error) {
                    console.log('error', error);
                }
            });
    }

    _renderFooter(){
        if(this.state.login){
            return(
                <View style={{borderRadius:8,margin:5,alignItems: 'center',backgroundColor:'white'}}>
                    <Text style={{color: '#585858',fontSize:20}}>没有更多数据</Text>
                    <Text style={{color: '#585858',fontSize:20}}>请下拉以尝试刷新</Text>
                </View>
            )
        }
    }

    _renderHeader(){
        if(!this.state.login){
            return(
            <View style={{opacity:0.7,alignItems: 'center',height:55,flexDirection:'row',backgroundColor:"white"}}>
                <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Login')}>
                    <Text style={{fontSize:20}}>登录以查看分享历史</Text>
                </TouchableOpacity>
            </View>)
        }
    }


}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(230,230,230)',
    },    
    item: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        borderRadius: 8,
        backgroundColor: 'white',
        borderColor:'black',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
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