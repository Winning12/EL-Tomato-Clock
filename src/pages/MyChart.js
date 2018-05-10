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
import { YAxis,XAxis, LineChart,BarChart, Grid, StackedAreaChart, StackedBarChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape'


export default class MyChart extends Component {
  
  static navigationOptions = {
    headerTitle: 
      <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
        <Text style={{color: 'rgb(222,148,151)',fontSize:20}}>专注统计</Text>
      </View>,
    headerRight:      
    <View style={{flex: 1,flexDirection: 'column',alignItems: 'center'}}>
    </View>,
    headerTintColor:'rgb(222,148,151)',
  };

  constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
        };
    }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  _back = () => {
        this.props.navigator.pop()
  }


  render() {
    if (this.state.renderPlaceholderOnly) {
    return this._render_earlier();
    }
    else{
      return this._render_later();
    }
  }

  _render_later() {

    const data = [ 50, 10, 40, 95, 14, 24, 85, 91, 35, 53, 53, 24, 50, 20, 70 ]
    const contentInset = { top: 10, bottom: 10 }
    
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

      <ImageBackground
          style={styles.container}
          source={require('../resource/Back.png')}
          resizeMode="cover">

          <View style={{width:350, height: 400, padding: 20}}>
           <View style={{width:350,height:350, padding: 20, flexDirection: 'row' }}>  
               <YAxis
                    style={{width:30,height:350,marginRight:20}}
                    data={ data }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'black',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
          
                <LineChart
                    style={{ flex: 1, height:350,width:300 }}
                    data={ data }
                    showGrid={false}
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ stroke: 'rgb(222,148,151)' }}
                >
                    <Grid/>
                </LineChart>
            </View>
            <View style={{width:280,height:50,marginTop:20,marginLeft:60}}>
                <XAxis
                    style={{ height:30}}
                    data={ data }
                    formatLabel={ (value, index) => (index+1) }
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            </View>
            </View>
    </ImageBackground>
    </View>
    );
  }
  
  _render_earlier() {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

      <ImageBackground
          style={styles.container}
          source={require('../resource/Back.png')}
          resizeMode="cover">

    </ImageBackground>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    width: 200,
    height: 40,
    color: 'rgb(222,148,151)',
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
