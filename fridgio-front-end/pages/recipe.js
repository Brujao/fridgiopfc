import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage, ScrollView} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import { Button,CheckBox,Icon } from 'react-native-elements';

console.disableYellowBox = true;

import Register from './register.js'
import Login from './login.js'
import AddRecipe from './addRecipe.js'
import {SignedOut,SignedIn,RootNavigator} from '../router/router.js'

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      ingredientes: [],
      modoPreparo: '',
      favoritos: '',
      username: '',
      teste: ''
    }
  } // Note that there is no comma after the method completion

  componentWillMount(){
    AsyncStorage.getItem('username', (e,value) => {
        if (!e) {
          this.setState({username:value});
        }
    });



  }

  componentDidMount(){
    this.getFavorites();
  }


  render() {
    const {goBack} = this.props.navigation;
    const ingredientes = this.props.navigation.getParam('ingredientes', '');
    return (
      <View style={styles.container}>


        <Image
          source={{uri:("http://192.168.15.2:3000" + this.props.navigation.getParam('foto', ''))}}
          style={styles.imagem}
        />
        <View style={styles.div}>
          <Text style={styles.titulo}>
            {this.props.navigation.getParam('titulo', '')}
          </Text>
          <Text style={styles.ingredientes}>
            <Text style={{fontWeight:"bold"}}>Ingredientes:</Text>{"\n"}
            {
              ingredientes.map((x)=>{
                return (<Text>{x}{"\n"}</Text>);
              })
            }
          </Text>
          <Text style={styles.modoPreparo}>
            <Text style={{fontWeight:"bold"}}>Modo de Preparo:</Text>{"\n"}
            {this.props.navigation.getParam('modoPreparo', '')}
          </Text>

          <Text style={styles.modoPreparo}>
            <Text style={{fontWeight:"bold"}}>Tempo de Preparo:</Text>{"\n"}
            {this.props.navigation.getParam('tempoPreparo', '')}
          </Text>

          <Text style={styles.modoPreparo}>
            <Text style={{fontWeight:"bold"}}>Número de porções:</Text>{"\n"}
            {this.props.navigation.getParam('porcoes', '')}
          </Text>
          <Text style={styles.autor}>
            <Text style={{fontWeight:"bold"}}>Autor:</Text>{"\n"}
            {this.props.navigation.getParam('autor', '')}
          </Text>
        </View>

        <Button
        onPress={() => this.addToFavorites()}
        title={this.state.favoritos ? "REMOVER DOS " : "ADICIONAR AOS " + "FAVORITOS"}
        />





        <Text style={styles.link} onPress={() => goBack()}>
          Voltar
        </Text>

      </View>
    );
  }

  getFavorites(){

    var data = {
      "id": this.props.navigation.getParam('id',''),
      "usuario": this.state.username
    }

    fetch("http://192.168.15.2:3000/api/receitas/getFavorites", {
       method: "POST",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body:  JSON.stringify(data)
    })
    .then((response)=> response.json())
    .then((res) =>{

      if (res.sucess == true){
        if (res.favoritos.includes(this.state.username)){
            this.setState({favoritos: true});
          }

      }else{
        //console.log(res.sucess);
        //console.log(res.message);
        this.setState({error: res.message});
      }
    });
  }

  addToFavorites(){


    var data = {
      "id": this.props.navigation.getParam('id',''),
      "usuario": this.state.username
    }

    fetch("http://192.168.15.2:3000/api/receitas/edit", {
       method: "POST",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body:  JSON.stringify(data)
    })
    .then((response)=> response.json())
    .then((res) =>{

      if (res.sucess == true){
        this.setState({favoritos: true});
      }else{
        //console.log(res.sucess);
        //console.log(res.message);
        this.setState({error: res.message});
      }
    });

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  imagem:{
    alignSelf: 'stretch',
    flex:1,
    maxHeight:200,
  },
  div:{
    paddingLeft:10,
  },
  titulo:{
    color: "#000000",
    fontWeight: 'bold',
    fontSize:30,
    marginTop:5
  },
  ingredientes:{
    fontSize:22,
    color: "#000000",
    marginTop:5,
  },
  modoPreparo:{
    fontSize:22,
    color: "#000000",
    marginTop:5,
  },
  autor:{
    fontSize:22,
    color: "#000000",
    marginTop:5,
  },
  message:{
    color:"#19b72e",
  },
  link:{
    color:"#C198FF",
    marginTop:2
  }
});
