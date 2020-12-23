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
  Button
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

export default class DododScreen extends Component {

    constructor(props)
    {
        super(props);
        this.sheetRef = React.createRef(null);
        
        this.state = {
        isLoading: true,
        dataRestaurant:[],
        city : 'Санкт-Петербург',
      
        }
    }

    componentDidMount(){
      this.getRestaurants(this.state.city)
  }
    show = () => {
    
        this.sheetRef.current && this.sheetRef.current.snapTo(0);
      };
    
      hide = () => {
        console.log("here")
        this.sheetRef.current && this.sheetRef.current.snapTo(1);
      }
    
      renderContent = () => (
        <View
          style={{
            backgroundColor: '#212021',
            
            height: windowHeight,
          }}
        >
            <TouchableHighlight
                  onPress={() =>  this.setState({city:'Санкт-Петербург'}, this.hide(), this.getRestaurants('Санкт-Петербург'))}
                  style={{backgroundColor:'#ff5a00', marginVertical: 10, height: windowHeight/20, width:windowWidth, borderRadius: 10, paddingVertical: 3, paddingHorizontal:5,  alignSelf:'flex-end',alignItems:'center', justifyContent:'center' }}
                >   
                    <Text style = {{fontSize: 15, color: "#fff"}}>Санкт-Петербург</Text>
            </TouchableHighlight>
            <View></View>
            <TouchableHighlight
                  onPress={() => this.setState({city:'Москва'}, this.hide(),this.getRestaurants('Москва'))}
                  style={{backgroundColor:'#ff5a00', marginVertical: 10, height: windowHeight/20, width:windowWidth, borderRadius: 10, paddingVertical: 3, paddingHorizontal:5,  alignSelf:'flex-end', alignItems:'center', justifyContent:'center' }}
                >   
                    <Text style = {{fontSize: 15, color: "#fff"}}>Москва</Text>
            </TouchableHighlight>
          
        </View>
      );

      
      getRestaurants(city){

        const url_rest = "http://95.181.230.223:5000/dodo/restaurants/" + city
        console.log(url_rest)

        return(
          fetch(url_rest)
          .then((response) => response.json())
          .then((responseJson) => {
          this.setState({
              isLoading: false,
              dataRestaurant:responseJson
          });
          console.log(this.state.dataRestaurant)
        
  
          })
          .catch((error) =>{
          console.error(error);
        
          })
        );
      }


      _renderRestautants(item){
        return(
        <View>
      <TouchableHighlight
        onPress={() =>  [this.props.navigation.navigate('Додо Пицца Заказ'),AsyncStorage.setItem('Restaurant', item.name), AsyncStorage.setItem('City', this.state.city)] }
        style={{backgroundColor:'#212021', marginVertical: 10, height: windowHeight/20, width:windowWidth/1.2, borderRadius: 10, paddingVertical: 3, paddingHorizontal:5,  alignSelf:'flex-end', alignItems:'center', justifyContent:'center' }}
      >   

        <Text style = {{fontSize: 15, color: "#fff"}}>{item.name}</Text>
      </TouchableHighlight>
      </View>
      );
      }
    render(){
        
          
        
          return (
            <>
                <View style={{borderBottomWidth:1, borderColor:'gray', backgroundColor:"#ff5a00", width:windowWidth, height:windowHeight }}>
                <View   style={{flexDirection:'row', justifyContent:'flex-end', marginLeft: windowWidth/1.8 }}>
                <TouchableHighlight
                  onPress={() => this.show()}
                  style={{backgroundColor:'#212021', marginVertical: 10, height: windowHeight/25, borderRadius: 10, paddingVertical: 3, paddingHorizontal:5, marginHorizontal: 10, alignSelf:'flex-end' }}
                >   
                    <View style={{flexDirection:'row'}}>
                        <Text style = {{fontSize: 15, color: "#fff"}}>{this.state.city}</Text>
                        <Icon name="arrow-down"  color='#fff' size={26} />
                    </View>
                </TouchableHighlight>
                </View>
                <View style={{alignItems:'center', marginVertical: 20}}>
                    <Text style={{fontSize: 20}}>Выберите ресторан</Text>
                    <FlatList showsVerticalScrollIndicator={false}
                      data={this.state.dataRestaurant}
                      renderItem={({ item }) => this._renderRestautants(item)}
                      keyExtractor = { (item,index) => index.toString() }
                      style = {{height:windowHeight/1.3}}
                    />
                </View>
              </View>
              <BottomSheet
                ref={this.sheetRef}
                snapPoints={[windowHeight/1.15,0]}
                borderRadius={10}
                initialSnap={1}
                renderContent={this.renderContent}
              />
            </>
          );
    }
    
    
}

