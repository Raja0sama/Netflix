
import React from 'react';
import {View} from 'react-native';
import { Input,Button } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation'


export default class Search extends React.Component {
    constructor() {
      super();
      this.state = {
        search:null
      }
    }
    resetStack = () => {
      this.props
        .navigation
        .dispatch(StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({
              routeName: 'Haiflix',
            }),
            NavigationActions.navigate({
              routeName: 'Lvideio',
              params: { search:this.state.search},
            }),
          ],
        }))
     }
        render() {
        return (<View style={{flex:1,margin:20,justifyContent:"center",itemAlign:'center'}}>
<Input
inputStyle={{fontSize:22}}
  placeholder='Search For the Movie'
onChangeText={(Text) => this.setState({search:Text})}
/>
<Button buttonStyle={{borderColor:'transparent'}}
  title=" Search NOW "
  type="outline"
  onPress={()=> this.resetStack()}
/>
    </View>
 )}
}


