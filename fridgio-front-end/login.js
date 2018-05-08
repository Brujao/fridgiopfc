import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
console.disableYellowBox = true;

import Register from './register.js'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  } // Note that there is no comma after the method completion

  render() {
    return (

<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>


      <View style={styles.container}>

        <Image
          source={require('./my-icon.png')}
          style={{resizeMode: 'contain',width:220}}
        />

        <View>
          <TextInput
            style={styles.input}
            ref={(el) => { this.username = el; }}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            placeholder="Digite seu Login"
          />

          <TextInput
            style={styles.input}
            ref={(el) => { this.senha = el; }}
            onChangeText={(senha) => this.setState({senha})}
            value={this.state.senha}
            placeholder="Digite sua Senha"
          />

          <Button
            //onPress={this.login.bind(this)}
            title="Login"
            color="#7920FF"
          />
        </View>

        <Text style={styles.link} onPress={() => this.props.navigation.navigate('Register')}>
          Criar conta
        </Text>

      </View>
</KeyboardAvoidingView>
    );
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
