import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
console.disableYellowBox = true;

import {SignedOut,SignedIn,RootNavigator} from './router/router.js';

// import Login from './pages/login.js';
// import Register from './pages/register.js';
// import Main from './pages/main.js';

// const Application = StackNavigator(
//   {
//     Home: {screen: Login},Register: {screen:Register},Main: {screen:Main}
//     },{
//       navigationOptions:{
//         header: false
//       }
//   }
// );

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      hasToken: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('ACCESS_TOKEN').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }

  render() {

      const { isLoaded, hasToken } = this.state;

      // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
      if (!isLoaded) {
        return null;
      }

      const Layout = RootNavigator(hasToken);
      return <Layout />;
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
});
