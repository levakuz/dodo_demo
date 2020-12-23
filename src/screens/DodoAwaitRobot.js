import React, { Component }  from 'react';
import {

  Dimensions,
  View,
  Text,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class DodoAwaitRobot extends Component {

    constructor(props)
    {
        super(props);
        this.sheetRef = React.createRef(null);
        
        this.state = {
        order:'',
        city : 'Санкт-Петербург',
        scanned: 1,
        scannered: false
      
        }
    }
    componentDidMount(){
      const storage = async()=>{
        let items = await AsyncStorage.getItem('order');
        let items2 = await AsyncStorage.getItem('status');
        let newstatus =''
        if (items2 == '1') {
             newstatus = "Принят"
            
        }else if (items2 == '2') {
             newstatus = "Готовится"
        }else if (items2 == '3') {
             newstatus = "Приготовлен"
        }else if (items2 == '4') {
             newstatus = "В доставке"
        }
        this.setState({status: newstatus,order: items, scanned: 1})
      }
      
      storage()
        
      console.log(this.state.order)
      console.log(this.state.status)
      console.log(this.state.scanned)
      
       
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({scanned: 2, scannered: true})
    console.log(this.state.scanned)
    try {
        console.log(JSON.parse(data)['robot'])
        const url_add_table = "http://95.181.230.223:5000/checkrobot/" + this.state.order + "/"  + JSON.parse(data)['robot'].toString()
        console.log(url_add_table)
        var render_again = this.state.scanned
        fetch(url_add_table)
        .then((response) => response.text())
        .then((responseJson) => {
        if (responseJson == 'error') {
        Alert.alert(
            "Alert Title",
            "Ошибка повторите попытку",
            [
              {
                text: "Ок",
                onPress: () =>   [console.log('failed'),this.setState({scanned: 2})],
                
              },
            ],
            { cancelable: false }
          );
          console.log(this.state.scanned)
          this.setState({scanned: 2})
        }
        else{
      
      Alert.alert(
        "Alert Title",
        "Ваш код успешно отсканирован",
        [
          {
            text: "Ок",
            onPress: () =>  this.props.navigation.navigate('Додо Пицца Благодарность'),
            
          },
        ],
        { cancelable: false }
      );
        }
      
    })
    .catch((error) =>{
      console.error(error);
      Alert.alert(
        "Alert Title",
        "Ваш код не может быть отсканирован",
        [
          {
            text: "Ок",
            onPress: () =>   [console.log('failed'),this.setState({scanned: 2})],
            
          },
        ],
        { cancelable: false }
      );
      this.setState({scanned: 2})
    });
    } catch (error) {
        Alert.alert(
            "Alert Title",
            "Ваш код не может быть отсканирован",
            [
              {
                text: "Ок",
                onPress: () =>  [console.log('failed'),this.setState({scanned: 2})],
                
              },
            ],
            { cancelable: false }
          );
          this.setState({scanned: 2})
    }
    this.setState({scanned: 2})
    console.log(this.state.scanned)
    

  }
    render(){
        
          
        
          return (
            
            <View style={{backgroundColor:'#ff5a00' , height:windowHeight}}>
            <Text style={{fontSize:20, margin:10}}>Ваш заказ №: </Text>
            <View style={{alignItems:'center'}}>
              <View style={{alignItems:'center',borderWidth:5, borderRadius:10, alignItems:'center', justifyContent:'center', width: windowWidth/2}}>
                <Text style={{fontSize:20, textAlign:'center'}}>{this.state.order}</Text>
              </View>
            </View>
            <View style={{alignItems:'center', margin:2}}>
              <View style={{alignItems:'center',borderWidth:5, borderRadius:10, alignItems:'center', justifyContent:'center', width: windowWidth/2}}>
                <Text style={{fontSize:20, textAlign:'center'}}>{this.state.status}</Text>
              </View>
            </View>
            <Text style={{fontSize:20, textAlign:'center', marginTop:5}}>По прибытии робота, пожалуйста, отсканируйте QR код, расположенный на нем.</Text>
            <View style={{alignItems:'center'}}>
            <BarCodeScanner
                onBarCodeScanned={this.state.scannered ? false : this.handleBarCodeScanned}
                style={{width:windowWidth/2,height:windowHeight/2, }}
            />
            </View>
      
          </View>
        );
            
          
    }
    
    
}

