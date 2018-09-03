import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
console.disableYellowBox = true;

import Login from './login.js'

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      ingredientes: [],
      modoPreparo: '',
      username: ''
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

        <View>
          <TextInput
          ref={(el) => { this.titulo = el; }}
          style={styles.input}
          onChangeText={(titulo) => this.setState({titulo})}
          value={this.state.titulo}
          placeholder="Título da receita"
          />

          <TextInput
            multiline={true}
            numberOfLines={10}
            ref={(el) => { this.ingredientes = el; }}
            style={styles.textArea}
            onChangeText={(ingredientes) => this.setState({ingredientes})}
            value={this.state.ingredientes}
            placeholder="Digite ingredientes, separados por virgula"
          />

          <TextInput
            multiline={true}
            numberOfLines={10}
            ref={(el) => { this.modoPreparo = el; }}
            style={styles.textArea}
            onChangeText={(modoPreparo) => this.setState({modoPreparo})}
            value={this.state.modoPreparo}
            placeholder="Digite o modo de preparo"
          />

          <Button
            onPress={this.addRecipe.bind(this)}
            title="Publicar"
            color="#7920FF"
          />
        </View>

        <Text style={styles.link} onPress={() => this.props.navigation.navigate('Profile')}>
          Voltar para o perfil
        </Text>

      </View>

    );
  }

  addRecipe() {

    //this.props.navigation.navigate('Home');

    this.titulo.clear();
    this.ingredientes.clear();
    this.modoPreparo.clear();




    var data = {
        "titulo":this.state.titulo,
        "ingredientes":this.state.ingredientes.split(','),
        "modoPreparo":this.state.modoPreparo,
        "status": 0,
        "autor": this.state.username
    }

      fetch("https://cursed.studio/api/receitas/add", {
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
        this.props.navigation.navigate('Profile');
      });
  }

}



const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  input:{
    height: 35,
    width:400,
    color:'#7920FF',
    marginBottom:20,
  },
  link:{
    color:"#7920FF",
    marginTop:10
  },
  textAreaContainer: {
    padding: 5,
    marginBottom: 10
  },
  textArea: {
    color:'#7920FF',
    height: 150,
    textAlignVertical: 'top'
  }
});
