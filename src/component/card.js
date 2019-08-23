
import React from 'react';
import {View} from 'react-native';
import { Tooltip ,Card,Text,Button,Icon} from 'react-native-elements';
import ImageOverlay from "react-native-image-overlay";


export default class Cards extends React.Component {
    constructor() {
      super();
    }

        render() {
        return (<View style={{  justifyContent: 'center',
        flex:1,
        alignItems: 'center',
        
        }}>


  <Card

    containerStyle={{backgroundColor:'transparent',borderColor:'#212121'}}
    image={{uri : this.props.url}}>

    <Text style={{marginBottom: 10,color:'white',fontSize:18,fontWeight:'bold'}}>
      {this.props.title}
    </Text>

    <Button
      icon={<Icon name='tv' color='#ffffff' />}
      backgroundColor='#03A9F4'
      onPress={()=>  this.props.navigation.navigate('Video',{id:this.props.moreInfo.netflixid})}
      buttonStyle={{borderBottomRightRadius:20,borderTopLeftRadius:20,backgroundColor:'#b71c1c',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,width:150}}
      title=' WATCH' />
  </Card>
    </View>
 )}
}


