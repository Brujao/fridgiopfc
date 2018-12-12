import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage, } from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import { Button,Avatar,Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


console.disableYellowBox = true;

import Register from './register.js'
import Login from './login.js'
import AddRecipe from './addRecipe.js'
import Favoritos from './favoritos.js'
import {SignedOut,SignedIn,RootNavigator} from '../router/router.js'

export default class Profile extends React.Component {
  static navigationOptions = ({navigation})=> ({
    headerRight: (
     <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <Text style={{color:'#ffffff',fontSize:16,fontWeight:'bold',paddingRight:10}}>EDITAR</Text>
    </TouchableOpacity>
   )
 });
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      receitas: []
    }
  } // Note that there is no comma after the method completion

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
    return (
      <View style={styles.container}>
        <View style={styles.divisor}>
          <Text style={styles.usernameProfile}>
            {this.state.username}
          </Text>
          <Image
            style={styles.image}
            source={require('../chef.png')}
          />
        </View>

        <View style={styles.divisor2}>
          <Text style={styles.subtitulo}>
            Meus Favoritos
          </Text>

          <FlatList style={styles.list}
  					data={this.state.receitas}
  					keyExtractor={(item, index) => index}
  					renderItem={({ item }) =>
  					<Card
  						image={{uri:('https://via.placeholder.com/150')}}>
  						<Text style={styles.titulo} onPress={() => this.props.navigation.navigate('Recipe',{id: item._id, titulo: item.titulo,
  							 ingredientes:item.ingredientes, modoPreparo: item.modoPreparo, autor: item.autor}) }>{item.titulo}</Text>
  					</Card>}
  				/>


          <Button
            style={styles.button}
            onPress={()=> this.openFavorites()}
            title="Ver favoritos"
            backgroundColor="#C198FF"
            containerViewStyle={{width: '100%'}}
          />

          <Button
            style={styles.button}
            onPress={()=> this.addRecipe()}
            title="Submeter Receita"
            backgroundColor="#C198FF"
            containerViewStyle={{width: '100%'}}
          />

          <Button
            style={styles.button}
            onPress={() => this.signOut()}
            title="Logout"
            backgroundColor="#C198FF"
            containerViewStyle={{width: '100%'}}
          />
        </View>

      </View>
    );
  }

  signOut(){
   AsyncStorage.removeItem('ACCESS_TOKEN');
   AsyncStorage.removeItem('username');
   this.props.navigation.navigate('SignedOut');
  }

  query(){

    var data = {
      "usuario": "marcela"
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

  openFavorites(){
    this.props.navigation.navigate('Favoritos',{username: this.state.username});
  }

  addRecipe(){
    this.props.navigation.navigate('AddRecipe');
  }

  editProfile(){
    this.props.navigation.navigate('EditProfile');
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list:{
    flex:1,
    alignSelf:'stretch',
  },
  divisor:{
    flex:1,
    flexDirection:'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#C198FF',
    maxHeight:150
  },
  divisor2:{
    flex:1,
    flexDirection:'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  usernameProfile:{
    color: "#ffffff",
    fontWeight: 'bold',
    fontSize:20,
    marginTop:10
  },
  button:{
    borderRadius:10,
    fontSize:20,
    fontWeight:'bold',
  },
  ola:{
    fontSize:20,
    color: "#000000"
  },
  message:{
    color:"#19b72e",
  },
  image:{
    marginTop:10
  },
  subtitulo:{
    fontSize:20,
    color:'#434343',
    fontWeight:'bold',
    marginTop:10
  },
  verTodos:{
    fontSize:16,
    color:'#434343',
    marginBottom: 10
  }
});
