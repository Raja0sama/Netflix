import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';
import {Avatar,ListItem } from 'react-native-elements';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  constructor(props){
super(props);
this.state = {
  Name : ""
}
  }
  componentDidMount(){
    
    var db = firestore();
    var user = firebase.auth().currentUser
    if (user) {
      var docRef = db.collection("users").doc(user.uid)
      docRef.get().then((doc)=> {
        if (doc.exists) {
         this.setState({Name : doc.data().Name})
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      }).catch(function(error) {
        console.log("Error getting document:", error)
      })
    } else {
      // No user is signed in.
    }
     

   
  }

  render () {
    const list = [
      {
        title: 'Profile',
        icon: 'face'
      },
      {
        title: 'Subscription',
        icon: 'flight-takeoff'
      },
      {
        title: 'Setting',
        icon: 'build'
      },
  
    ]
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{backgroundColor:'#b71c1c'}}>
          <View style={styles.image_view}>
          <Avatar
            size="xlarge"
            rounded
            source={{uri:       'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'          }}>
          </Avatar>
          <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
          {this.state.Name}
            </Text>
        </View>

    
            
          </View>
          <View>
          {
    list.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        titleStyle={{color:'white'}}
        containerStyle={{backgroundColor:'transparent'}}
        leftIcon={{ name: item.icon,color:'white' }}
      />
    ))
  }

          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={{color:'white'}} onPress={()=> {
            firebase.auth().signOut().then(()=> {
            this.props.navigation.navigate('Login')
            }).catch(function(error) {
              // An error happened.
            });
          }}>Log Out</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;