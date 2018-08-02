import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, ScrollView, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
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

      <View>

        <SectionedMultiSelect
          items={this.state.items}
          colors={{primary: '#b906ce'}}
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

        <Text>
        {this.listar()}
        </Text>




      </View>
    );
  }

  // receitas() {
  //
  //   fetch("https://cursed.studio/api/receitas", {
  //      method: "GET",
  //      headers: {
  //        'Accept': 'application/json',
  //        'Content-Type': 'application/json',
  //      }
  //   })
  //   .then((response)=> response.json())
  //   .then((res) =>{
  //     this.setState({receitas: res});
  //     console.log(res);
  //   });
  // }

  query(){

    var data = '/'+this.state.selectedItems.join('/,/')+'/';




        fetch("https://cursed.studio/api/receitas", {
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
