import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, ScrollView, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
console.disableYellowBox = true;

import Register from './register.js'

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      receitas: [],
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

          <ScrollView>
            {this.listar()}
          </ScrollView>

        <Button
          onPress={this.receitas.bind(this)}
          title="Mostrar Receitas"
          color="#7920FF"
        />


      </View>
</KeyboardAvoidingView>
    );
  }

  receitas() {

    fetch("http://192.168.15.2:3000/receitas", {
       method: "GET",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body:  ''
    })
    .then((response)=> response.json())
    .then((res) =>{
      this.setState({receitas: res});
      console.log(res);
    });
  }

  listar(){
    return this.state.receitas.map((receita) => {
      return (
        <View>
            <Text style={{fontWeight: "bold"}}>Título:</Text>
            <Text>{receita.titulo}</Text>
            <Text style={{fontWeight: "bold"}}>Ingredientes:</Text>
            <Text>{receita.ingredientes}</Text>
            <Text style={{fontWeight: "bold"}}>Como fazer:</Text>
            <Text>{receita.modoPreparo}</Text>
        </View>
      )
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
