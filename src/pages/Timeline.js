
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
import Toast, {DURATION} from 'react-native-easy-toast'
import * as Progress from 'react-native-progress';
import {Geolocation} from 'react-native-baidu-map';

var displayTitle=""
var displayAvatar=""
var displayName=""
var i=0
var avatars=[require('../resource/1.png'),require('../resource/2.png'),
require('../resource/3.png'),require('../resource/4.png'),
require('../resource/5.png'),require('../resource/6.png'),
require('../resource/7.png'),require('../resource/8.png'),
require('../resource/9.png'),require('../resource/10.png'),
require('../resource/11.png'),]
var Dimensions = require('Dimensions');  
var thisWidth = Dimensions.get('window').width; 
export default class TimeLine extends Component {

    constructor(props) {
        super(props);
        this.getView=this.getView.bind(this)
        this._renderTask=this._renderTask.bind(this)
        this._renderTask_Progress=this._renderTask_Progress.bind(this)
        this.joinTask=this.joinTask.bind(this)
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
            taskRendered:false,
            taskJoined:false,
            taskCompleted:false,
            tomato:0,      
            latitude:0.000000,
            longitude:0.000000,//初始化位置
        };
    }

    componentWillMount(){
        this.updateLocation()
        this.loadLocation_location()
        AsyncStorage.getItem("user")
        .then((result) => {
            this.setState({name:result})
            this.loadLocation_online()
        })
        AsyncStorage.getItem("taskCompleted")
        .then((result) => {
            if(result=="false"){
                AsyncStorage.getItem("taskJoined")
                .then((result) => {
                    if(result=="true")
                        this.setState({taskJoined:true})
                    else
                        this.setState({taskJoined:false})
                })
            }
            else{
                this.setState({taskCompleted:true})
            }
        })
        AsyncStorage.getItem("tomato")
        .then((result) => {
            this.setState({tomato:parseInt(result)})
        })
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

    updateLocation=()=> {//记录当前位置
        Geolocation.getCurrentPosition()
            .then(data => {
                AsyncStorage.setItem("latitude",data.latitude)
                AsyncStorage.setItem("longitude",data.longitude)
                fetch('http://118.25.56.186/users/'+data.latitude+","+data.longitude+"/updatelocation", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
                })
            })
            .catch(e =>{
                console.warn(e, 'error');
            })
    }

    loadLocation_location=()=>{//从本地和网络读取数据
        AsyncStorage.getItem("latitude")
        .then((result) => {
            if(result!=null)
            this.setState({latitude:result})
        })
        AsyncStorage.getItem("longitude")
        .then((result) => {
            if(result!=null)
            this.setState({longitude:result})
        })
    }

    loadLocation_online=()=>{
        fetch('http://118.25.56.186/users/'+this.state.name+'/userinfo', {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json'
            }
            }).then((response) => response.json())
            .then((jsonData) => {
                this.setState({latitude:jsonData.location.split(",")[0],longitude:jsonData.location.split(",")[1]})
            })
        }

    render() {
        this.state.taskRendered=false
        return (
            <View style={{flex: 1, backgroundColor: 'rgb(240,240,240)'}}>
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
                        <View style={{borderRadius:8,margin:5,alignItems: 'center'}}>
                        <Text style={{color: '#585858',fontSize:20}}> </Text>
                        <Text style={{color: '#585858',fontSize:20}}> </Text>
                        </View>
                    }
                />
            </View>
                <Modal
                    animationType='fade'
                    visible={this.state.visible}
                    transparent={this.state.transparent}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.3)'}}>
                        <View style={{borderRadius: 20,backgroundColor:'white'}}>
                            <View style={{justifyContent:'center',alignItems: 'center',flexDirection:'row'}}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                    style={{width: 35, height: 35}}
                                    source={this.handleAvatar(displayAvatar)}
                                    />
                                </View>
                                <Text style={{marginLeft:5,marginRight:5,fontSize:20}}>{displayName + ''}</Text>
                            </View>
                            <View style={{alignItems: 'center',margin:20}}>
                                <Text style={{marginTop: 5, fontSize:20,color: '#585858'}}>{displayTitle}</Text>
                            </View>
                            <TouchableOpacity  onPress={()=>{this.setState({visible:false})}}>
                                <View style={{height:40,alignItems: 'center',justifyContent:'center',borderTopWidth:1,borderTopColor:'rgb(240,240,240)'}}>
                                    <Text style={{fontSize:20,color:'#585858'}}>收起</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Toast ref="joinTask" position='top' opacity={0.6}/>
            </View>
        );
    }

    showModal(item){//仅在行数超标时弹出展开
        var count=0;
        for (i=0;i<item.content.length;i++){
            if (item.content[i]=='\n'){
                count++;
            }
        }
        if(count>=3){//检测行数
            displayTitle=item.content
            displayAvatar=item.author.avatar
            displayName=item.author.name
            this.setState({visible:true});
        }
    }

    getView({item}) {//渲染每一条分享
        this.showLike(item)
        return (
            <View animation='fadeIn' useNativeDriver>
            {this._renderTask(item)}
            <TouchableOpacity 
            activeOpacity={0.75}>
                <View style={styles.item}>
                    <View style={{alignItems: 'center',flexDirection:'row',marginBottom:10,}}>
                    <View style={styles.avatarContainer}>
                        <Image
                        style={{width: 35, height: 35}}
                        source={this.handleAvatar(item.author.avatar)}
                        />
                    </View>
                    <Text style={{marginLeft:5,fontSize:20}}>{item.author.name + ''}</Text>
                    </View>
                    {this._renderItemContent(item)}
                    <View style={{flexDirection:'row',marginLeft:20,marginTop:10,marginBottom:5}}>
                        <Text style={{ color: '#a8a8a8',fontSize:15}}>
                            {this.handleItemDate(item)}    {this.handleDistance(item)}
                        </Text>
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

    _renderItemContent(item){
        var count=1;
        var res="";
        var more=false
        for (i=0;i<item.content.length;i++){
            if (item.content[i]=='\n'){
                count++;
            }
            if(count>=3){
                if(i<item.content.length-4){ 
                    more=true
                }
            }else{
                res+=item.content[i];
            }
        }
        if(more)
            return (
                <View style={{marginLeft:20,marginRight:10}}>
                    <Text style={{ color: '#333333',fontSize:18}}>{res}</Text>
                    <TouchableOpacity 
                    style={{height:30,justifyContent:'center',alignItems:'flex-start'}} 
                    activeOpacity={0.7} 
                    onPress={()=>this.showModal(item)}>
                        <Text style={{ color: '#888888',fontSize:15}}>查看全部{count-1}条分享></Text>
                    </TouchableOpacity>
                </View>
            )
        else
            return(
                <View style={{marginLeft:20,marginRight:10}}>
                    <Text style={{ color: '#333333',fontSize:18}}>{res}</Text>
                </View>
            ) 
    }
    
    _renderTask(item){
        if(item==this.state.data[0]){
            return(
                <View animation='fadeInLeft' style={styles.task} useNativeDriver>
                    <View style={{flexDirection:"row",marginLeft:10}}>
                        <View style={styles.logoContainer}>
                            <Image
                            style={{width: 25, height: 25}}
                            source={require('../resource/logo.png')}
                            />
                        </View>
                        <Text style={{fontSize:15,margin:5}}>每日任务</Text>
                    </View>
                    <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this.joinTask}
                    >
                    <ImageBackground 
                    style={{opacity:0.9,height:(thisWidth-10)*3/7}} 
                    source={require("../resource/Task2.png")} 
                    resizeMode="cover"/>
                    </TouchableOpacity>
                    {this._renderTask_Progress()}
                </View>
            )
        }
    }


    joinTask(){
        fetch('http://118.25.56.186/tasks/join', {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json'
            }
            }).then((response) => response.json())
            .then((jsonData) => {
                let sta = jsonData.status;
                let err = jsonData.error;
                if(sta=="error"){
                    if(err=="you have joined this task!"){
                        AsyncStorage.setItem('taskJoined',"true")
                        this.refs.joinTask.show("任务已参加",1500)
                        this.setState({taskJoined:true})
                    }else if (err=="your points are not enough!"){
                        AsyncStorage.setItem('taskJoined',"false")
                        this.refs.joinTask.show("      当前点数不足\n请多发表时间线积攒",1500)
                        this.setState({taskJoined:false})
                    }else if (err=="notLogin"){
                        AsyncStorage.setItem('taskJoined',"false")
                        this.refs.joinTask.show("请先登录",1500)
                        this.setState({taskJoined:false})
                    }
                }else{
                    AsyncStorage.setItem('taskJoined',"true")
                    this.refs.joinTask.show("参加成功",1500)
                    this.setState({taskJoined:true})
                }  
            })
    }

    _renderTask_Progress(){
        if(!this.state.taskCompleted){
         if(!this.state.taskJoined){
            return(
                <View style={styles.right}>
                    <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.loginContainer}
                    onPress={this.joinTask}
                    >
                        <Text style={{color: 'black'}}>点击参与</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View style={styles.center}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>任务进度</Text>
                        <Progress.Bar style={{margin:5}} progress={this.handleFill()} width={250} height={8} color="#686868" useNativeDriver/>
                    </View>
                </View>
            )
        }
        }else{
            return(
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>任务已完成！</Text>
                    <Progress.Bar style={{margin:5}} progress={this.handleFill()} width={250} height={8} color="#686868" useNativeDriver/>
                </View>
            )
        }
    }

    

    handleDistance(item){//解析位置并计算出距离
        if(item.author.name==this.state.name){
            return "自己"
        }
        if(item.author.location!=undefined){
        var lat1=item.author.location.split(",")[0]
        var lng1=item.author.location.split(",")[1]
            if(this.GPStoM(this.state.latitude,this.state.longitude,lat1,lng1)<500)
                return "五百米内"
            else if(this.GPStoM(this.state.latitude,this.state.longitude,lat1,lng1)<1000)
                return "一千米内"
            else if(this.GPStoM(this.state.latitude,this.state.longitude,lat1,lng1)<2000)
                return "两千米内"
            else if(this.GPStoM(this.state.latitude,this.state.longitude,lat1,lng1)<5000)
                return "五千米内"
            else return ""
        }
    }

    GPStoM(lat_a, lng_a, lat_b, lng_b) {
        let EARTH_RADIUS = 6371000.0;
        let radLat1 = (lat_a * Math.PI / 180.0);
        let radLat2 = (lat_b * Math.PI / 180.0);
        let a = radLat1 - radLat2;
        let b = (lng_a - lng_b) * Math.PI / 180.0;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
            + Math.cos(radLat1) * Math.cos(radLat2)
            * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s;
    }

    handleFill(){
        if((this.state.tomato>=10)&&(this.state.taskCompleted!=true)){
            this.setState({taskCompleted:true})
            AsyncStorage.setItem('taskCompleted',"true")
        }
        if(this.state.tomato>0){
            return this.state.tomato/10
        }else
            return 0
    }

    handleAvatar(avatar){
        return avatars[parseInt(avatar)]
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
        this.loadLocation_online()
        this.updateLocation()
        fetch('http://118.25.56.186/users/'+this.state.name+"/userinfo", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
            }).then((response) => response.json())
            .then((jsonData) => {
                let _tomato = jsonData.tomato;//检查番茄周期数是否达到任务要求，若服务端返回完成，则存入本地文件。
                if(_tomato>=10){
                AsyncStorage.setItem('taskCompleted',"true")
                }
                AsyncStorage.setItem('tomato',""+_tomato)
                this.setState({tomato:_tomato})
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
            })


    }

    updateTomato=()=>{

      }

    ItemData(images, title, id) {
        this.images = new Array(images);
        this.title = title;
        this.id = id;
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(240,240,240)',
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
    task:{
        flex:1,
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
    logoContainer:{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        margin:5,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderColor: 'rgb(240,240,240)',
        borderWidth: 1,
        borderRadius: 2
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
        borderBottomWidth:2,
        borderColor:'rgb(230,230,230)',
        backgroundColor:'rgb(248,248,248)',
        alignItems: 'center',
    },
});