import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, FlatList,
	ListView} from 'react-native';
import { Button,Card } from 'react-native-elements';
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
      message: '',
			message2: '',
			recomend: []
    }
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  componentWillMount(){

      fetch("http://192.168.41.220:3000/api/ingredientes", {
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
          colors={{primary: '#C198FF'}}
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



        <FlatList style={{paddingLeft:10,paddingRight:10}}
          data={this.state.receitas}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) =>
					<Card
						image={{uri:("http://192.168.15.2:3000" + item.foto)}}>
            <Text style={styles.titulo} onPress={() => this.props.navigation.navigate('Recipe',{id: item._id, titulo: item.titulo,
							 ingredientes:item.ingredientes, modoPreparo: item.modoPreparo, autor: item.autor, foto: item.foto,
						 porcoes: item.porcoes, tempoPreparo: item.tempoPreparo}) }>{item.titulo}</Text>
          </Card>}
        />
				<Text style={styles.divisor}>
					{this.state.message2}
				</Text>

				<FlatList style={styles.lista2}
					data={this.state.recomend}
					keyExtractor={(item, index) => index}
					renderItem={({ item }) =>
					<Card
						image={{uri:("http://192.168.15.2:3000" + item.foto)}}>
						<View style={styles.div}>
							<Text style={styles.titulo} onPress={() => this.props.navigation.navigate('Recipe',{id: item._id, titulo: item.titulo,
								 ingredientes:item.ingredientes, modoPreparo: item.modoPreparo, autor: item.autor, foto: item.foto,
							 porcoes: item.porcoes, tempoPreparo: item.tempoPreparo}) }>{item.titulo}</Text>
						</View>
					</Card>
					}
				/>



      </View>
    );
  }

  query(){

    var items = this.state.selectedItems;

    var data = {
      "query": items
    }

        fetch("http://192.168.41.220:3000/api/query", {
           method: "POST",
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body:  JSON.stringify(data)
        })
        .then((response)=> response.json())
        .then((res)=>{
					if (res.sucess == true) {
						this.setState({receitas: res.receitas});
						this.setState({message: res.message});
						this.setState({recomend: res.recomend});
					}
					if (res.rec == true) {
						this.setState({recomend: res.recomend});
						this.setState({message2: res.message2});
					}


          console.log(res);
        });
  }

	openRecipe(){
		this.props.navigation.navigate('Recipe')
	}

}


const styles = StyleSheet.create({
	div:{
		flex:1,
		flexDirection:'row'
	},
  container: {
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
	divisor:{
		textAlign: 'center',
		paddingTop:10,
		paddingRight:30,
		paddingLeft:30,
		paddingBottom:10,
    fontSize: 20,
		fontWeight: 'bold',
	},
  card:{
		backgroundColor:'#ffffff',
		shadowOffset:{  width: 10,  height: 10,  },
		shadowColor: 'black',
		shadowOpacity: 1.0,
		alignSelf: 'stretch',
		padding:5,
		marginBottom:20,
  },
	lista2:{
		paddingRight:10,
		paddingLeft:10,
		maxHeight:650,
	}
});
