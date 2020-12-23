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
  Image,
  Button,
  TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class DodoOrderScrenn extends Component {

    constructor(props)
    {
        super(props);
        this.sheetRef = React.createRef(null);
        
        this.state = {
        order:'',
        dataOrder:[],
        status:''
        
      
        }
    }
    
    sendOrder(){
        const url_order = "http://95.181.230.223:5000/makeorder/" + this.state.order
        console.log(url_order)

        return(
          fetch(url_order)
          .then((response) => response.text())
          .then((responseJson) => {
            if (responseJson == 'no order found') {
                alert('Извините, такого заказа не существует')
            }
            else{
                console.log(JSON.parse(responseJson)['status'])
                this.setState({
                isLoading: false,
                dataOrder:responseJson,
                status: JSON.parse(responseJson)['status']
                });
                try {
                    console.log(this.state.status)
                    AsyncStorage.setItem('order', this.state.order.toString())
                    AsyncStorage.setItem('status', this.state.status.toString())
                } catch (error) {
                    console.log(error)
                }
                
                this.props.navigation.navigate('Додо Пицца QR')
            }
  
          })
          .catch((error) =>{
          console.error(error);
        
          })
        );
    }

    render(){
        
          
        
          return (
            
                <View style={{borderBottomWidth:1, borderColor:'gray', backgroundColor:"#ff5a00", width:windowWidth, height:windowHeight, alignItems:'center' }}>
                    <Text style={{fontSize:20, textAlign:'justify', marginHorizontal: 20, marginVertical: 10}}>Введите, пожалуйста номер заказа в поле ниже</Text>
                    <View style={{borderWidth:1, borderRadius:10, borderColor:'black', marginHorizontal: windowWidth/20, marginVertical:windowHeight/20, width:windowWidth/2}}>
                        <TextInput 
                        keyboardType={'phone-pad'}
                        onChangeText={(value) => this.setState({order: value})}
                        value={this.state.order}
                        defaultValue={'+7'}
                        style={{fontSize:20, fontWeight:'bold',justifyContent:'center', alignItems:'center', textAlign:'center'}}
                    >
                        </TextInput>
                    </View>
                    <TouchableHighlight
                        onPress={() =>  this.sendOrder() }
                        style={{backgroundColor:'#212021', marginVertical: 10, height: windowHeight/20, width:windowWidth/1.2, borderRadius: 10, paddingVertical: 3, paddingHorizontal:5,  alignSelf:'flex-end', alignItems:'center', justifyContent:'center' }}
                    >   

                        <Text style = {{fontSize: 15, color: "#fff"}}>Готово</Text>
                    </TouchableHighlight>
                </View>
            
          );
    }
    
    
}

