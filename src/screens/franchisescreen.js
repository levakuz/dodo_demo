import React, { Component }  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class FranchiseScreen extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
        dataFranchises:[],
      
      
        }
    }

    ComponentDidMount(){
    }
    render(){
        return(
            
            <View>
            <StatusBar backgroundColor="#212021"  />
            <ScrollView>
            <TouchableOpacity  onPress={() => { this.props.navigation.navigate('Додо Пицца')}}>
              <View >
                 <Image resizeMode={"stretch"} style={{width:windowWidth,height:windowHeight/5,backgroundColor:'#ff5a00'}} source={require('../screens/Dodo.png')} />
              </View>
            
            </TouchableOpacity>
            <View style={{width:windowWidth, height:windowHeight/20, backgroundColor: "#212021"}}/>

            <TouchableOpacity  onPress={() => { this.props.navigation.navigate('Додо Пицца')}}>
              <View >
              <Image resizeMode={"stretch"} style={{width:windowWidth,height:windowHeight/5,backgroundColor:'#ff5a00'}} source={require('../screens/Dodo.png')} />
              </View>
            </TouchableOpacity>
            <View style={{width:windowWidth, height:windowHeight/20, backgroundColor: "#212021"}}/>
            <TouchableOpacity  onPress={() => { this.props.navigation.navigate('Додо Пицца')}}>
              <View >
              <Image resizeMode={"stretch"} style={{width:windowWidth,height:windowHeight/5,backgroundColor:'#ff5a00'}} source={require('../screens/Dodo.png')} />
              </View>
            </TouchableOpacity>
            <View style={{width:windowWidth, height:windowHeight/20, backgroundColor: "#212021"}}/>
            <TouchableOpacity  onPress={() => { this.props.navigation.navigate('Додо Пицца')}}>
              <View >
                <Image resizeMode={"stretch"} style={{width:windowWidth,height:windowHeight/5,backgroundColor:'#ff5a00'}} source={require('../screens/Dodo.png')} />
              </View>
            </TouchableOpacity>
            <View style={{width:windowWidth, height:windowHeight/20, backgroundColor: "#212021"}}/>
            <TouchableOpacity  onPress={() => { this.props.navigation.navigate('Додо Пицца')}}>
              <View >
              <Image resizeMode={"stretch"} style={{width:windowWidth,height:windowHeight/5,backgroundColor:'#ff5a00'}} source={require('../screens/Dodo.png')} />
              </View>
            </TouchableOpacity>
            <View style={{width:windowWidth, height:windowHeight/20, backgroundColor: "#212021"}}/>
            
            </ScrollView>

            </View>


        )
    }
    
    
}

