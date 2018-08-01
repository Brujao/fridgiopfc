import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
console.disableYellowBox = true;

import Login from './login.js'

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      ingredientes: [],
      modoPreparo: ''
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
          ref={(el) => { this.titulo = el; }}
          style={styles.input}
          onChangeText={(titulo) => this.setState({titulo})}
          value={this.state.titulo}
          placeholder="Título da receita"
          />

          <View style={styles.textAreaContainer}>
            <TextInput
              multiline={true}
              numberOfLines={10}
              ref={(el) => { this.ingredientes = el; }}
              style={styles.textArea}
              onChangeText={(ingredientes) => this.setState({ingredientes})}
              value={this.state.ingredientes}
              placeholder="Digite ingredientes, separados por virgula"
            />
          </View>

          <TextInput
          ref={(el) => { this.modoPreparo = el; }}
          style={styles.input}
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
</KeyboardAvoidingView>

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
        "status": 0
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderColor: '#a8a8a8',
    borderWidth: 0.5,
    height: 35,
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
    borderWidth: 0.5,
    padding: 5,
    marginBottom: 10
  },
  textArea: {
    color:'#7920FF',
    height: 150,
    textAlignVertical: 'top'
  }
});
