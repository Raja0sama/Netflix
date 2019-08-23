
import React from 'react';
import {} from 'react-native';
import { Header } from 'react-native-elements';


export default class Head extends React.Component {
    constructor() {
      super();
    }

        render() {

        return (
<Header
  leftComponent={{ icon: 'menu', color: '#fff',onPress: ()=> this.props.navigation.openDrawer() }}
  containerStyle={{
    backgroundColor: '#b71c1c',
    justifyContent: 'space-around',
    borderBottomColor:'black',borderBottomWidth:0 
  }}
  centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
  rightComponent={{ icon: 'search', color: '#fff', onPress: ()=> this.props.navigation.navigate('Search'), }}
/>       
 )}
}


