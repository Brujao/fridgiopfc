import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, ScrollView, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, FlatList,
	ListView} from 'react-native';
console.disableYellowBox = true;
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import Register from './register.js'

export default class Feed extends React.Component {
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

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  componentWillMount(){

      fetch("https://cursed.studio/api/ingredientes", {
         method: "GET",
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         }
      })
      .then((response)=> response.json())
      .then((res) =>{
        this.setState({items: res});
        console.log(res);
      });
    }

  render() {
    return (

      <View style={{flex:1}}>

        <SectionedMultiSelect
          items={this.state.items}
          colors={{primary: '#7920FF'}}
          uniqueKey='name'
          subKey='children'
          selectText='Escolha os ingredientes'
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          onConfirm={this.query.bind(this)}
          hideSelect={false}
          searchPlaceholderText='Pesquise os ingredientes'
          confirmText= "Filtrar"
        />



        <FlatList style={{padding:20}}
          data={this.state.receitas}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <View style={styles.card}>
            <Text style={styles.titulo} onPress={() => this.props.navigation.navigate('Recipe',{titulo: item.titulo,
							 ingredientes:item.ingredientes, modoPreparo: item.modoPreparo}) }>{item.titulo}</Text>
          </View>}
        />




      </View>
    );
  }

  query(){

    var items = this.state.selectedItems;

    var data = {
      "query": items
    }

        fetch("https://cursed.studio/api/query", {
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
