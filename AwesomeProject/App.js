import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import {StackNavigator} from 'react-navigation';
console.disableYellowBox = true;

import Login from './login.js';
import Register from './register.js'

const Application = StackNavigator(
  {
    Home: {screen: Login},Register: {screen:Register}
    },{
      navigationOptions:{
        header: false
      }
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  } // Note that there is no comma after the method completion
  //
  // addUser() {
  //   this.nome.clear();
  //   this.email.clear();
  //   this.senha.clear();
  //
  //   var data = {
  //       "nome":this.state.nome,
  //       "email":this.state.email,
  //       "senha":this.state.senha,
  //   }
  //
  //     fetch("http://192.168.15.6:3000/usuarios/add", {
  //        method: "POST",
  //        headers: {
  //          'Accept': 'application/json',
  //          'Content-Type': 'application/json',
  //        },
  //        body:  JSON.stringify(data)
  //     })
  //     .then((res)=>{
  //       res.json();
  //     })
  //     .then((data)=>{
  //     console.log(data);
  //     });
  // }
  //
  // addReceita() {
  //   this.titulo.clear();
  //   this.ingrediente.clear();
  //   this.modoPreparo.clear();
  //
  //   var data = {
  //       "titulo": this.state.titulo,
  //       "ingrediente": this.state.ingrediente,
  //       "modoPreparo": this.state.modoPreparo,
  //       "status": 0
  //   }
  //
  //     fetch("http://192.168.15.6:3000/receitas/add", {
  //        method: "POST",
  //        headers: {
  //          'Accept': 'application/json',
  //          'Content-Type': 'application/json',
  //        },
  //        body:  JSON.stringify(data)
  //     })
  //     .then((res)=>{
  //       res.json();
  //     })
  //     .then((data)=>{
  //     console.log(data);
  //     });
  // }
  //
  // componentDidMount(){
  //   return fetch("http://192.168.15.6:3000/receitas")
  //   .then((res) => res.json())
  //   .then((data)=>{
  //     this.setState({
  //       data: data
  //     });
  //   })
  //   .catch((error) => {
  //         console.error(error);
  //       });
  // }

  render() {

    return (
      <Application/>
      // <View style={styles.container}>
      //   <TextInput
      //   ref={(el) => { this.titulo = el; }}
      //   style={{height: 40, width: 300, borderColor: 'gray'}}
      //   onChangeText={(titulo) => this.setState({titulo})}
      //   value={this.state.titulo}
      //   />
      //
      //   <TextInput
      //   ref={(el) => { this.ingrediente = el; }}
      //   style={{height: 40, width: 300, borderColor: 'gray'}}
      //   onChangeText={(ingrediente) => this.setState({ingrediente})}
      //   value={this.state.ingrediente}
      //   />
      //
      //   <TextInput
      //   ref={(el) => { this.modoPreparo = el; }}
      //   style={{height: 40, width: 300, borderColor: 'gray'}}
      //   onChangeText={(modoPreparo) => this.setState({modoPreparo})}
      //   value={this.state.modoPreparo}
      //   />
      //
      //   <Button
      //     onPress={this.addReceita.bind(this)}
      //     title="Botao"
      //     color="#841584"
      //     accessibilityLabel="Learn more about this purple button"
      //   />
      //
      //   <FlatList
      //     data={this.state.data}
      //     keyExtractor={(x,i) => i}
      //     renderItem={({item}) =>
      //       <Text>{item.titulo}</Text>
      //     }
      //   />
      // </View>
    );

   // return (
   //    <View style={styles.container}>
   //        <FlatList
   //          data={this.state.data}
   //          keyExtractor={(x,i) => i}
   //          renderItem={({item}) =>
   //            <Text>{item.titulo}</Text>
   //          }
   //        />
   //    </View>
   //  );
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
});
