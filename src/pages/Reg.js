import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { firebase } from '@react-native-firebase/auth';
import { NavigationActions, StackActions } from 'react-navigation';

class Reg extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			username: '',
			password: ''
		};
	}
	componentDidMount() {
		var user = firebase.auth().currentUser;

		if (user) {
			this.resetStack();
		} else {
			// No user is signed in.
		}
	}
	resetStack = () => {
		this.props.navigation.dispatch(
			StackActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({
						routeName: 'Main'
					})
				]
			})
		);
	};
	Pressed() {
		if (this.state.username != '' && this.state.password != '' && this.state.name != '') {
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.username, this.state.password)
				.then(() => {
					var user = firebase.auth().currentUser;
					const defaultStuff = {
						Name: this.state.name,
						ProfilePic: null,
						subs: {
							HAIMUS: null,
							HAIflix: null,
							startDate: null,
							endDate: null
						}
					};
					var db = firebase.firestore();

					// console.log(data)
					var setDoc = db.collection('users').doc(user.uid).set(defaultStuff);
					this.resetStack();
				})
				.catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					//   console.log(errorMessage)
					// ...
				});
		}
	}
	render() {
		//  console.log(this.state)
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					backgroundColor: '#212121',
					alignItems: 'center',
					padding: 30
				}}
			>
				<StatusBar backgroundColor="black" barStyle="light-content" />

				<Image style={{ width: 200, height: 200 }} source={require('../assets/logo.png')} />
				<Input
					onChangeText={(e) => this.setState({ name: e })}
					containerStyle={{ marginTop: 10 }}
					leftIcon={{ type: 'font-awesome', name: 'users', color: 'white' }}
					placeholder="Name"
					inputStyle={{ color: 'white' }}
					placeholderTextColor="white"
				/>
				<Input
					onChangeText={(e) => this.setState({ username: e })}
					containerStyle={{ marginTop: 10 }}
					leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
					placeholder="UserName/Email"
					inputStyle={{ color: 'white' }}
					placeholderTextColor="white"
				/>
				<Input
					onChangeText={(e) => this.setState({ password: e })}
					containerStyle={{ marginTop: 10 }}
					placeholder="Password"
					leftIcon={{ type: 'font-awesome', name: 'key', color: 'white' }}
					placeholderTextColor="white"
					inputStyle={{ color: 'white' }}
				/>
				<Button
					containerStyle={{ marginTop: 30 }}
					buttonStyle={{ backgroundColor: '#FF3171', paddingLeft: 30, paddingRight: 30 }}
					title="Register"
					onPress={() => this.Pressed()}
				/>
				<Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: 'white', marginTop: 30 }}>
					or Sign In Now !
				</Text>
			</View>
		);
	}
}

export default withNavigation(Reg);
