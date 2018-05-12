
import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    ToastAndroid,
    Image,
    ImageBackground,
    TouchableOpacity,
    Text,
    View,
    Modal,
    Button
} from 'react-native';

var displayTitle="null"
var imgsrc=""
export default class TimeLine extends Component {
    static defaultProps = {
        url: 'https://news-at.zhihu.com/api/4/news/latest'
    };

    constructor(props) {
        super(props);
        this.getView=this.getView.bind(this)
        this.state = {
            visible:false,
            data: [],
            refreshing: false,
            transparent:true,
        };
    }

    showModal(item){
        displayTitle=item.title
        imgsrc=item.images[0]
        this.setState({visible:true});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'rgb(248,248,248)'}}>
                <View style={styles.header}>
                    <View style={styles.left}>
                    </View>
                    <View style={styles.center}>
                        <Text style={{color: '#585858',fontSize:20}}>时间线</Text>
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
                        <View style={{alignItems: 'center',backgroundColor:'white'}}>
                        <Text style={{color: '#585858',fontSize:20}}>Loading</Text>
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

    getView({item}) {
        return (
            <TouchableOpacity 
            activeOpacity={0.75}
            onPress={()=>this.showModal(item)}>
                <View style={styles.item}>
                    {/*左边的图片*/}
                    <Image source={{uri: item.images[0]}} style={styles.image}/>
                    <View style={styles.left}>
                        {/*右边的View*/}
                        <Text style={{marginTop: 15, color: '#333333'}}>{item.title}</Text>
                        <View style={styles.content}>
                            <Text style={{flex: 1, textAlign: 'right'}}>{item.id + ''}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    keyExtractor = (item, index) => item.id;

    count = 0;

    onRefresh = () => {
        this.setState({
            refreshing: true,
        });
        //延时加载
        const timer = setTimeout(() => {
            clearTimeout(timer);
            //往数组的第一位插入数据，模拟数据新增 , unshift()会返回数组的长度
            this.state.data.unshift(new this.ItemData('https://pic2.zhimg.com/v2-8f11b41f995ca5340510c1def1c003d1.jpg',
                '下拉刷新添加的数据——————' + this.count, 475843));
            this.count++;
            this.setState({
                refreshing: false,
            });
        }, 1500);
    };


    ItemData(images, title, id) {
        this.images = new Array(images);
        this.title = title;
        this.id = id;
    }

    componentDidMount() {
        fetch(this.props.url)
            .then((response) => response.json())
            .then((response) => {
                var json = response['stories'];
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
        flexDirection: 'row',
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
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    header: {
        flexDirection: 'row',
        height: 60,
        backgroundColor:'rgb(248,248,248)',
        alignItems: 'center',
    },
});