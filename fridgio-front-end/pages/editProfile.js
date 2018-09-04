import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
console.disableYellowBox = true;

import Login from './login.js'

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      message: ''
    }
  } // Note that there is no comma after the method completion

  componentWillMount(){

    AsyncStorage.getItem('email', (e,value) => {
      if (!e) {
        this.setState({email:value});
      }
    });

    AsyncStorage.getItem('username', (e,value) => {
        if (!e) {
          this.setState({username:value});
        }
    });



  }

  render() {
    return (

      <View style={styles.container}>

          <TextInput
          ref={(el) => { this.username = el; }}
          style={styles.input}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          placeholder={this.state.username}
          />

          <TextInput
          ref={(el) => { this.email = el; }}
          style={styles.input}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder={this.state.email}
          />

          <Text style={styles.message}>
            {this.state.message}
          </Text>

          <Button
            onPress={this.editProfile.bind(this)}
            title="Editar"
            color="#7920FF"
          />

        <Text style={styles.link} onPress={() => this.props.navigation.navigate('Profile')}>
          Voltar para o perfil
        </Text>

      </View>

    );
  }

  editProfile() {

    var data = {
        "username":this.state.username,
        "email":this.state.email
    }

      fetch("https://cursed.studio/api/usuarios/edit", {
         method: "POST",
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body:  JSON.stringify(data)
      })
      .then((response)=>{
         return response.json();
      })
      .then((res)=>{
        this.setState({message: res.message});
        AsyncStorage.setItem('username', res.username);
        AsyncStorage.setItem('message', res.message);
        this.props.navigation.navigate('Profile');
      });
  }

}



const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderColor: '#a8a8a8',
    width: 300,
    color:'#7920FF',
    marginBottom:10,
  },
  link:{
    color:"#7920FF",
    marginTop:10
  },
  textAreaContainer: {
    borderColor: '#a8a8a8',
    padding: 5,
    marginBottom: 10
  },
  textArea: {
    color:'#7920FF',
    height: 150,
    textAlignVertical: 'top'
  },
  message:{
    color:"#19b72e",
  }
});
