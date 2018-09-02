import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
console.disableYellowBox = true;

import Register from './register.js'
import Login from './login.js'
import AddRecipe from './addRecipe.js'
import {SignedOut,SignedIn,RootNavigator} from '../router/router.js'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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

        <Image
          source={require('../my-icon.png')}
          style={{resizeMode: 'contain',width:220}}
        />

        <Text style={styles.usernameProfile}>
          {this.state.username}
        </Text>

        <Button
          style={styles.button}
          onPress={()=> this.addRecipe()}
          title="Publicar receita"
          color="#7920FF"
        />

        <Button
          style={styles.button}
          onPress={()=> this.editProfile()}
          title="Editar perfil"
          color="#7920FF"
        />

        <Button
          style={styles.button}
          onPress={() => this.signOut()}
          title="Logout"
          color="#7920FF"
        />

      </View>
    );
  }

  signOut(){
   AsyncStorage.removeItem('ACCESS_TOKEN');
   AsyncStorage.removeItem('username');
   this.props.navigation.navigate('SignedOut');
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
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    color:'#ffffff',
    marginBottom:20
  },
  link:{
    color:"#7920FF",
    marginTop:20
  },
  usernameProfile:{
    color: "#000000",
    fontWeight: 'bold'
  }
});
