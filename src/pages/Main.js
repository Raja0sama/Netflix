
import React from 'react';
import {View,Text,Image,TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import { firebase } from '@react-native-firebase/auth';


export default class Main extends React.Component {
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
            <View style={{flex:1,justifyContent: 'center',backgroundColor:'#212121',alignItems:"center",}}>
  
        <View style={{margin:30, width:300,height:300,backgroundColor:'white',borderRadius:300,justifyContent:"center",alignItems:"center"}}
        >
        <TouchableHighlight        onPress={()=> this.props.navigation.navigate('Haiflix')}
>
        <Image
           style={{width: 200, height: 200}}

          source={require('../assets/logo.png')}
        />
        </TouchableHighlight>
        </View>
        <View style={{margin:30,width:300,height:300,backgroundColor:'white',borderRadius:300,justifyContent:"center",alignItems:"center"}}>
        <TouchableHighlight        onPress={()=> this.props.navigation.navigate('Haimus')}
>
        <Image
           style={{width: 200, height: 200}}

          source={require('../assets/Haimus.png')}
        />
        </TouchableHighlight>
        </View>
            </View>
        )}
}


