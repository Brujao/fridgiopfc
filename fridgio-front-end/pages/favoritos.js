import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, FlatList,
	ListView, AsyncStorage} from 'react-native';
import { Button,Card } from 'react-native-elements';
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

				<FlatList style={{paddingLeft:10,paddingRight:10}}
					data={this.state.receitas}
					keyExtractor={(item, index) => index}
					renderItem={({ item }) =>
					<Card
						image={{uri:("http://192.168.41.220:3000" + item.foto)}}>
						<Text style={styles.titulo} onPress={() => this.props.navigation.navigate('Recipe',{id: item._id, titulo: item.titulo,
							 ingredientes:item.ingredientes, modoPreparo: item.modoPreparo, autor: item.autor,foto: item.foto,
						 porcoes: item.porcoes, tempoPreparo: item.tempoPreparo}) }>{item.titulo}</Text>
					</Card>}
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

        fetch("http://192.168.41.220:3000/api/receitas/getFavoritesProfile", {
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
    color:'#C198FF',
    marginBottom:20
  },
  link:{
    color:"#C198FF",
    marginTop:20
  },
	titulo:{
    textAlign: 'left',
    paddingLeft:5,
    fontSize: 20,
  },
  card:{
  }
});
