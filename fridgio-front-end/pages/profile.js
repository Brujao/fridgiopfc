import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage, } from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

console.disableYellowBox = true;

import Register from './register.js'
import Login from './login.js'
import AddRecipe from './addRecipe.js'
import Favoritos from './favoritos.js'
import {SignedOut,SignedIn,RootNavigator} from '../router/router.js'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    }
  } // Note that there is no comma after the method completion

  componentWillMount(){
    AsyncStorage.getItem('username', (e,value) => {
        if (!e) {
          this.setState({username:value});
        }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.ola}>
          Olá,
        </Text>
        <Text style={styles.usernameProfile}>
          {this.state.username}
        </Text>

        <Button
          style={styles.button}
          onPress={()=> this.openFavorites()}
          title="Favoritos"
          backgroundColor="#7920FF"
          containerViewStyle={{width: '100%',padding:5,borderRadius:10}}
          buttonStyle={{height:100,borderRadius:10}}
        />

        <Button
          style={styles.button}
          onPress={()=> this.addRecipe()}
          title="Publicar receita"
          backgroundColor="#7920FF"
          containerViewStyle={{width: '100%',padding:5,borderRadius:10}}
          buttonStyle={{height:100,borderRadius:10}}
        />

        <Button
          style={styles.button}
          onPress={()=> this.editProfile()}
          title="Editar perfil"
          backgroundColor="#7920FF"
          containerViewStyle={{width: '100%',padding:5,borderRadius:10}}
          buttonStyle={{height:100,borderRadius:10}}
        />

        <Button
          style={styles.button}
          onPress={() => this.signOut()}
          title="Logout"
          backgroundColor="#7920FF"
          containerViewStyle={{width: '100%',padding:5,borderRadius:10}}
          buttonStyle={{height:100,borderRadius:10}}
        />

      </View>
    );
  }

  signOut(){
   AsyncStorage.removeItem('ACCESS_TOKEN');
   AsyncStorage.removeItem('username');
   this.props.navigation.navigate('SignedOut');
  }

  openFavorites(){
    this.props.navigation.navigate('Favoritos',{username: this.state.username});
  }

  addRecipe(){
    this.props.navigation.navigate('AddRecipe');
  }

  editProfile(){
    this.props.navigation.navigate('EditProfile');
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameProfile:{
    color: "#000000",
    fontWeight: 'bold',
    fontSize:20
  },
  ola:{
    fontSize:20,
    color: "#000000"
  },
  message:{
    color:"#19b72e",
  }
});
