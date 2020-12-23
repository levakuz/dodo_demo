import React, { Component }  from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class DodoThx extends Component {

    constructor(props)
    {
        super(props);
        this.sheetRef = React.createRef(null);
        
        this.state = {
          order:'',

      
        }
    }
    componentDidMount(){

      const storage = async()=>{
        let items = await AsyncStorage.getItem('new_order');
        console.log(items)
        this.setState({order: items})
      }
      
      storage()
      console.log(this.state.order)

       
  }
  sendRobotBack(){
    const url_rest = "http://95.181.230.223:5000/dodo/robot_go_back/" + JSON.parse(this.state.order)['order'] + '/' + JSON.parse(this.state.order)['table']
    console.log(url_rest)

    return(
      fetch(url_rest)
      .then((response) => response.text())
      .then((responseJson) => {
        if (responseJson == 'True') {
          Alert.alert(
            "Робот уезжает",
            "Спасибо!",
            [
              {
                text: "Ок",
                onPress: () =>  this.props.navigation.navigate('Выбор франшизы'),
                
              },
            ],
            { cancelable: false }
          );
          
        }
        else{
          Alert.alert(
            "Произошла ошибка",
            "Пожалуйста обратитесь к сотруднику ресторана.",
            [
              {
                text: "Ок",
                
              },
            ],
            { cancelable: false }
          );
        }
    

      })
      .catch((error) =>{
      console.error(error);
    
      })
    );



  }

    render(){
        
          
        
          return (
            
            <View style={{backgroundColor:'#ff5a00' , height:windowHeight}}>
            <Text style={{fontSize:20, margin:10}}>Спасибо, что воспользовались нашим сервисом!</Text>
            <Text style={{fontSize:20, margin:10}}>После того, как заберете заказ, пожалуйста, нажмите кнопку ниже, чтобы отправить робота назад.</Text>
            
            <TouchableHighlight
                  onPress={() => this.sendRobotBack()}
                  style={{backgroundColor:'#0000', borderRadius: 20, width:windowWidth/1.1 ,alignItems:'center', justifyContent:'center', marginHorizontal:10, borderWidth:3, alignSelf:'center', marginTop:20}}
                >   
                    <Text style = {{fontSize: 20, color: "#fff"}}>Отправить робота назад</Text>
            </TouchableHighlight>
            
            <View>
                <TouchableOpacity  underlayColor="#FF6900">
                  <Image resizeMode={"contain"} style={{width:windowWidth,height:windowHeight/3}} source ={{uri:'https://brandbook.dodopizza.info/Logo%E2%80%94Background%E2%80%94Main%E2%80%94Orange.22af795b.jpg'}}/>
                </TouchableOpacity>
              </View>
      
          </View>
        );
            
          
    }
    
    
}

