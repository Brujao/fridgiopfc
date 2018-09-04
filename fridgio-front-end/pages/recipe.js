import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage, } from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      modoPreparo: ''
    }
  } // Note that there is no comma after the method completion

  componentWillMount(){


  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.titulo}>
          {this.props.navigation.getParam('titulo', 'oi')}
        </Text>
        <Text style={styles.ingredientes}>
          <Text style={{fontWeight:"bold"}}>Ingredientes:</Text>{"\n"}
          {this.props.navigation.getParam('ingredientes', 'oi')}
        </Text>
        <Text style={styles.modoPreparo}>
          <Text style={{fontWeight:"bold"}}>Modo de Preparo:</Text>{"\n"}
          {this.props.navigation.getParam('modoPreparo', 'oi')}
        </Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingLeft:10
  },
  titulo:{
    color: "#000000",
    fontWeight: 'bold',
    fontSize:35,
    marginTop:10
  },
  ingredientes:{
    fontSize:15,
    color: "#000000",
    marginTop:40,
    fontSize:25
  },
  modoPreparo:{
    fontSize:15,
    color: "#000000",
    marginTop:40,
    fontSize:25
  },
  message:{
    color:"#19b72e",
  }
});
