
import React from 'react';
import {View,StatusBar} from 'react-native';
import { Button } from 'react-native-elements';
import { firebase } from '@react-native-firebase/auth';


export default class Haimus extends React.Component {
    constructor() {
      super();
      //console.log(firebase.auth().currentUser)
    }
    Logout(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });}
        render() {
        return (
            <View style={{flex:1,}}>
            <StatusBar backgroundColor="white" barStyle="dark-content"></StatusBar>
  
            </View>
        )}
}


