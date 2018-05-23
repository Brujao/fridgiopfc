import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
console.disableYellowBox = true;

import Register from './register.js'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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

        <Text>
          PROFILE
        </Text>

      </View>
</KeyboardAvoidingView>
    );
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
