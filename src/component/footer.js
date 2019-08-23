
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';


export default class Footer extends React.Component {
    constructor() {
      super();
    }

        render() {
            const {pramas} = this.props;
        return (<View style={{height:50,backgroundColor:'#b71c1c',flexDirection:'row'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity>
        <Text style={{color:'white'}}>
        {pramas.left.Text}
        </Text>
        </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={pramas.right.func}>
        <Text style={{color:'white'}}>
        {pramas.right.Text}
        </Text>
        </TouchableOpacity>     
           </View>
        
        </View>   
 )}
}


