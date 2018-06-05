import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
console.disableYellowBox = true;

import Login from './login.js'

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  } // Note that there is no comma after the method completion

  render() {
    return (

<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

      <View style={styles.container}>

        <Image
        source={require('../my-icon.png')}
        style={{resizeMode: 'contain',width:220}}
        />

        <View>
          <TextInput
          ref={(el) => { this.username = el; }}
          style={styles.input}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          placeholder="Digite seu username"
          />

          <TextInput
          ref={(el) => { this.email = el; }}
          style={styles.input}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder="Digite seu email"
          />

          <TextInput
          secureTextEntry={true}
          ref={(el) => { this.senha = el; }}
          style={styles.input}
          onChangeText={(senha) => this.setState({senha})}
          value={this.state.senha}
          placeholder="Digite sua senha"
          />

          <Button
            onPress={this.addUser.bind(this)}
            title="Cadastrar"
            color="#7920FF"
          />

        </View>

        <Text style={styles.link} onPress={() => this.props.navigation.navigate('Login')}>
          Fazer Login
        </Text>

      </View>
</KeyboardAvoidingView>

    );
  }

  addUser() {

    //this.props.navigation.navigate('Home');

    this.username.clear();
    this.email.clear();
    this.senha.clear();

    var data = {
        "username":this.state.username,
        "email":this.state.email,
        "senha":this.state.senha,
    }

      fetch("http://192.168.88.186:3000/usuarios/add", {
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
        console.log(res);
      });
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
  input:{
    height: 40,
    width: 300,
    color:'#7920FF',
    marginBottom:20
  },
  link:{
    color:"#7920FF",
    marginTop:20
  },
});
