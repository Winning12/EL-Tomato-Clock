
import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    ToastAndroid,
    Image,
    ImageBackground,
    TouchableOpacity,
    Text,
    Modal,
    Button,
    AsyncStorage
} from 'react-native';
import { createAnimatableComponent, View} from 'react-native-animatable'

var displayTitle="null"
var imgsrc=""
var i=0
var avatars=[require('../resource/1.png'),require('../resource/2.png'),
require('../resource/3.png'),require('../resource/4.png'),
require('../resource/5.png'),require('../resource/6.png'),
require('../resource/7.png'),require('../resource/8.png'),
require('../resource/9.png'),require('../resource/10.png'),
require('../resource/11.png'),]
export default class TimeLine extends Component {

    constructor(props) {
        super(props);
        this.getView=this.getView.bind(this)
        this.handleAvatar=this.handleAvatar.bind(this)
        this.doLike=this.doLike.bind(this)
        this.unLike=this.unLike.bind(this)
        this.showLike=this.showLike.bind(this)
        this.state = {
            visible:false,
            data: [],
            refresh:true,
            refreshing: false,
            transparent:true,
            year:(new Date()).getFullYear(),
            month:(new Date()).getMonth()+1,
            day:(new Date()).getDate(),
            opacity:0.7,
            name:"",
        };
    }

    componentWillMount(){
        AsyncStorage.getItem("user")
        .then((result) => {
            this.setState({name:result})
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'rgb(248,248,248)'}}>
                <View style={styles.header}>
                    <View style={styles.left}>
                    </View>
                    <View style={styles.center}>
                        <Text style={{color: '#585858',fontSize:20}}>时间线 </Text>
                    </View>
                    <View style={styles.right}>
                    <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={this.onRefresh}
                    style={{flexDirection:'row',alignItems: 'flex-end'}}
                    >
                        <Image style={{width: 30, height: 40,margin:20,}} source={require('../resource/timeline_refresh.png')}/>
                    </TouchableOpacity>
                    </View>
                </View>

            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.getView}

                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}

                    ListFooterComponent={
                        <View style={{borderRadius:8,margin:5,alignItems: 'center',backgroundColor:'white'}}>
                        <Text style={{color: '#585858',fontSize:20}}>没有更多数据</Text>
                        <Text style={{color: '#585858',fontSize:20}}>请下拉以尝试刷新</Text>
                        </View>
                    }
                />
            </View>
                <Modal
                    animationType='fade'
                    visible={this.state.visible}
                    transparent={this.state.transparent}>
                    <View
                        style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.3)'}}>
                        <View style={{borderRadius: 20,height:400,width:300,backgroundColor:'white'}}>
                            <View style={{alignItems: 'flex-end',marginRight:20}}>
                                <TouchableOpacity  onPress={()=>{this.setState({visible:false})}}>
                                    <Text style={{marginTop: 15, color:'#585858'}}>收起</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center',margin:20}}>
                                <Text style={{marginTop: 15, color: 'black'}}>{displayTitle}</Text>
                                <Image source={{uri: imgsrc}} style={styles.image}/>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    showModal(item){
        displayTitle=item.name
        this.setState({visible:true});
    }

    getView({item}) {
        this.showLike(item)
        return (
            <View animation='fadeIn' useNativeDriver>
            <TouchableOpacity 
            activeOpacity={0.75}
            onPress={()=>this.showModal(item)}>
                <View style={styles.item}>
                    <View style={{alignItems: 'center',flexDirection:'row',marginBottom:10,}}>
                    <View style={styles.avatarContainer}>
                        <Image
                        style={{width: 35, height: 35}}
                        source={this.handleAvatar(item)}
                        />
                    </View>
                    <Text style={{marginLeft:10,fontSize:20}}>{item.author.name + ''}</Text>
                    </View>
                    <View style={{marginLeft:20}}>
                        <Text style={{ color: '#333333',fontSize:18}}>{this.handleItemContent(item)}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginLeft:20,marginTop:10,marginBottom:5}}>
                        <Text style={{ color: '#a8a8a8',fontSize:15}}>{this.handleItemDate(item)}</Text>
                        <View style={{justifyContent:'center',alignItems: 'flex-end',flex: 1,marginRight:20}}>
                            <TouchableOpacity 
                            activeOpacity={0.5}
                            onPress={()=>this.like(item)}>
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

    handleAvatar(item){
        return avatars[parseInt(item.author.avatar)]
    }

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

    handleItemContent(item){
        var count=0;
        var res="";
        for (i=0;i<item.content.length;i++){
            if (item.content[i]=='\n'){
                count++;
            }
            if(count>=2){
                res+='\n'+'点击展开'
                break;
            }
            res+=item.content[i];
        }
        return res;
    }

    handleLikeNumbers(item){
        if(item.likedusers!=undefined)
            return item.likedusers.length
        else
            return 0
    }

    showLike(item){
        if(item.likedusers!=undefined){
            if(item.likedusers.indexOf(this.state.name)==-1){
                this.state.opacity=0.3
            }else
                this.state.opacity=0.8
        }else
            this.state.opacity=0.3
    }

    like(item){
        AsyncStorage.getItem("user")
        .then((result) => {
            this.state.name=result
        })
        if(item.likedusers!=undefined){
            if(item.likedusers.indexOf(this.state.name)==-1){
                this.doLike(item)
            }else
                this.unLike(item)
        }   
        else
            this.doLike(item)
    }

    doLike(item){
        fetch('http://118.25.56.186/data/'+item._id+'/dolike', {
        method: 'GET',
        headers: {
              'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
      .then((jsonData) => {
        let loginreturn = jsonData.status;
        if(loginreturn=="success"){
          this.setState({opacity:0.7})
          this.onRefresh()
        }
    })
    }

    unLike(item){
        fetch('http://118.25.56.186/data/'+item._id+'/undolike', {
        method: 'GET',
        headers: {
              'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
      .then((jsonData) => {
        let loginreturn = jsonData.status;
        if(loginreturn=="success"){
          this.setState({opacity:0.7})
          this.onRefresh()
        }
        })
    }

    keyExtractor = (item, index) => item.id;

    count = 0;

    onRefresh = () => {
        fetch('http://118.25.56.186/data', {
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


    ItemData(images, title, id) {
        this.images = new Array(images);
        this.title = title;
        this.id = id;
    }

    componentDidMount() {
        fetch('http://118.25.56.186/data/', {
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

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(230,230,230)',
    },
    centerContainer: {
        backgroundColor: 'rgb(240,240,240)',
        justifyContent: 'center',
        alignItems: 'center',
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
        width: 40,
        height: 40,
        borderRadius: 15,
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