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
            <Text />
        )
    }


    getView({item}) {
        return (
        <View animation="fadeIn" style={{marginTop:10,marginBottom:10,alignItems: 'center',flexDirection:'row'}} useNativeDriver>
            <View style={styles.avatarContainer}>
                <Image
                style={{width: 35, height: 35}}
                source={require('../resource/my_avatar.png')}
                />
            </View>
            <View style={{marginLeft:5,flexDirection:'column'}}>
                <Text style={{fontSize:18}}>{item.name}</Text>
                <Progress.Bar style={{marginTop:5}} progress={this.handleFill(item)} width={250} height={8} color="#686868"/>
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