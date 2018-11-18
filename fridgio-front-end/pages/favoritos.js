import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, ScrollView, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, FlatList,
	ListView, AsyncStorage} from 'react-native';
console.disableYellowBox = true;
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import Register from './register.js'

export default class Favoritos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      receitas: [],
      selectedItems: [],
      items: [],
      teste: ''
    }
  }

  componentWillMount(){

    AsyncStorage.getItem('username', (e,value) => {
        if (!e) {
          this.setState({username:value});
        }
    });

    }

		componentDidMount(){
			this.query();
		}

  render() {
		const {goBack} = this.props.navigation;
    return (

      <View style={{flex:1}}>

        <FlatList style={{padding:20}}
          data={this.state.receitas}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <View style={styles.card}>
            <Text style={styles.titulo} onPress={() => this.props.navigation.navigate('Recipe',{id: item._id, titulo: item.titulo,
							 ingredientes:item.ingredientes, modoPreparo: item.modoPreparo, autor: item.autor}) }>{item.titulo}</Text>
          </View>}
        />

				<Text style={styles.link} onPress={() => goBack()}>
          Voltar
        </Text>

      </View>
    );
  }

  query(){

    var data = {
      "usuario": this.props.navigation.getParam('username', '')
    }

        fetch("https://cursed.studio/api/receitas/getFavoritesProfile", {
           method: "POST",
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body:  JSON.stringify(data)
        })
        .then((response)=> response.json())
        .then((res)=>{
          this.setState({receitas: res});
          console.log(res);
        });
  }

	openRecipe(){
		this.props.navigation.navigate('Recipe')
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
  titulo:{
    textAlign: 'left',
    paddingLeft:5,
    fontSize: 20,
    height: 35,
    marginBottom: 10,
    borderBottomWidth:1,
    borderBottomColor:'#2a2a2a'
  },
  card:{
  }
});
