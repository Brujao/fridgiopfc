import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, FlatList, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
console.disableYellowBox = true;

import { StackNavigator, TabNavigator, TabView, SwitchNavigator } from "react-navigation";

import Login from "../pages/login.js";
import Register from "../pages/register.js";
import Profile from '../pages/profile.js';
import Feed from '../pages/feed.js';
import AddRecipe from '../pages/addRecipe.js'
import EditProfile from '../pages/editProfile.js'
// import Buscar from '../pages/search.js'


export const SignedOut = StackNavigator({
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export const ProfileScreen = StackNavigator({
  Profile: {
    screen: Profile,
  },
  AddRecipe: {
    screen: AddRecipe,
  },
  EditProfile:{
    screen: EditProfile
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export const SignedIn = TabNavigator({
  // Buscar: {
  //   screen: Buscar,
  //   navigationOptions: {
  //     tabBarLabel: 'Buscar',
  //   }
  // },
  Feed: {
    screen: Feed,
    navigationOptions: {
      tabBarLabel: 'Feed',
    }
  },
  UserProfile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
    }
  }
},
{
  tabBarPosition: 'bottom',
  tabBarOptions:{
    indicatorStyle:{
          backgroundColor: '#b906ce',
    },
    activeTintColor: '#b906ce',
    inactiveTintColor: '#cb6fd6',
    style:{
      backgroundColor: "#fff",
    }
  }
}
);

export const RootNavigator = (hasToken = false) => {
  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: hasToken ? "SignedIn" : "SignedOut"
    }
  );
};


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
