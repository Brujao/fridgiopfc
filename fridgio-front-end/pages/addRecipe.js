import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, ScrollView,TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
console.disableYellowBox = true;
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import FormData from 'form-data';
import axios from 'axios';



import Login from './login.js'

const options = {
  title: 'Select Avatar',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from library',
  quality: 1
};

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      ingredientes: [],
      modoPreparo: '',
      username: '',
      favoritos: '',
      porcoes: '',
      tempoPreparo: '',
      imageSource: null,
      data: null
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
<ScrollView>
      <Image style={styles.image}
      source={this.state.imageSource}
      />

        <TouchableOpacity style={styles.button} onPress={this.selectPhoto.bind(this)}>
            <Text style={styles.text}>Select photo</Text>
        </TouchableOpacity>

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

          <TextInput
          ref={(el) => { this.tempoPreparo = el; }}
          style={styles.input}
          onChangeText={(tempoPreparo) => this.setState({tempoPreparo})}
          value={this.state.tempoPreparo}
          placeholder="Tempo de Preparo"
          />

          <TextInput
          ref={(el) => { this.porcoes = el; }}
          style={styles.input}
          onChangeText={(porcoes) => this.setState({porcoes})}
          value={this.state.porcoes}
          placeholder="Número de porções"
          />

          <Button
            onPress={this.addRecipe.bind(this)}
            title="Enviar para Aprovação"
            color="#C198FF"
          />
        </View>
</ScrollView>
      </View>

    );
  }

  selectPhoto(){
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.uri };
          const filename = {filename: response.fileName};

          this.setState({
            imageSource: source,
            data: filename
          });
        }
      });
  }

  upload(){
    var data = new FormData();
    data.append('titulo', this.state.titulo);
    data.append('ingredientes', this.state.ingredientes.split(','));
    data.append('favoritos', this.state.favoritos);
    data.append('autor', this.state.username);
    data.append('modoPreparo', this.state.modoPreparo);
    data.append('foto', {
                  uri:  this.state.imageSource,
                  type: 'image/jpeg',
                  name: 'foto.jpg'
                });
    data.append('tempoPreparo', this.state.tempoPreparo);
    data.append('porcoes', this.state.porcoes);

      axios.post('http://192.168.41.220:3000/api/receitas/add',JSON.stringify(data),{
        headers: {
          'accept': 'application/json',
          'Content-Type': `multipart/formadata; boundary=${data._boundary}`,
        }
      }).then((res)=>{
        console.log(res);
      }).catch((e)=>{
        console.log(e);
      });

    // fetch('http://192.168.15.2:3000/api/receitas/add', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // }).then((res) => {
    //   console.log(res);
    // });
  }

  addRecipe() {

    this.props.navigation.navigate('Home');

    this.titulo.clear();
    this.ingredientes.clear();
    this.modoPreparo.clear();

    var data = {
        "titulo":this.state.titulo,
        "ingredientes":this.state.ingredientes.split(','),
        "modoPreparo":this.state.modoPreparo,
        "status": 0,
        "autor": this.state.username,
        "favoritos": this.state.favoritos,
        "porcoes": this.state.porcoes,
        "tempoPreparo": this.state.tempoPreparo
    }

      fetch("http://192.168.41.220:3000/api/receitas/add", {
         method: "POST",
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
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
    width:300,
    color:'#C198FF',
    marginBottom:20,
  },
  link:{
    color:"#C198FF",
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
  },
  button:{
    width: 250,
    height: 25,
    marginTop: 15,
    backgroundColor: "#C198FF"
  },
  text:{
    color: "white",
    textAlign: 'center',
    fontSize: 18
  },
  image:{
    width: 200,
    height:200,
    marginTop: 30
  }
});
