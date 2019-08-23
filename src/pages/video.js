import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Rating, Overlay, Button, PricingCard, Card, Icon } from 'react-native-elements';
import Footer from '../component/footer';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Secret from '../Constant.json';
import axios from 'axios';

export default class Video extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			data: [ { title: 'hey' }, { title: 'hsey' } ],
			info: null,
			Epd: null
		};
	}
	componentDidMount() {
		const a = this.props.navigation.getParam('id', 0);
		axios
			.get('https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=loadvideo&q=' + a, {
				headers: { 'X-RapidAPI-Host': Secret[0].value, 'X-RapidAPI-Key': Secret[1].value }
			})
			.then((response) => {
				// console.warn(response.data.RESULT);
				this.setState({ info: response.data.RESULT });
			})
			.catch(function(error) {
				//  console.log(error);
			});
		this.LoadEp();
	}
	LoadEp() {
		const a = this.props.navigation.getParam('id', 0);
		axios
			.get('https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=episodes&q=' + a, {
				headers: { 'X-RapidAPI-Host': Secret[0].value, 'X-RapidAPI-Key': Secret[1].value }
			})
			.then((response) => {
				console.log(response.data);
				this.setState({ Epd: response.data.RESULTS });
			})
			.catch(function(error) {
				//  console.log(error);
			});
	}
	EP() {
		if (this.state.Epd === null) {
			return <Text />;
		} else {
			console.log(this.state.Epd);
			return this.state.info.nfinfo.type === 'series' ? (
				this.state.Epd.map((item, index) => (
					<View>
						<Text
							key={index}
							style={{ color: 'white', width: 120, padding: 5, fontWeight: 'bold', fontSize: 24 }}
						>
							Season : #{item.seasnum}
						</Text>
						<Carousel
							ref={(c) => {
								this._carousel = c;
							}}
							data={item.episodes}
							renderItem={this._renderItems}
							sliderWidth={Dimensions.get('window').width}
							itemWidth={240}
						/>
					</View>
				))
			) : (
				<Text style={{ color: 'white' }}>it is not</Text>
			);
		}
	}

	_renderItem({ item, index }) {
		return (
			<Card
				containerStyle={{ backgroundColor: 'transparent', borderColor: '#212121' }}
				image={{ uri: 'http://art-2.nflximg.net/190fc/74af6d5ad30b37d026c5ab5f88d4b26d8f9190fc.jpg' }}
			>
				<Text style={{ marginBottom: 10, color: 'white' }}>
					The idea with React Native Elements is more about component structure than actual design.
				</Text>
				<Button
					icon={<Icon name="code" color="#ffffff" />}
					containerStyle={{}}
					buttonStyle={{
						borderBottomRightRadius: 20,
						borderTopLeftRadius: 20,
						backgroundColor: '#b71c1c',
						borderRadius: 0,
						marginLeft: 0,
						marginRight: 0,
						marginBottom: 0
					}}
					title="VIEW NOW"
				/>
			</Card>
		);
	}
	_renderItems({ item, index }) {
		if (item.episode.available === 'true') {
			return (
				<Card
					containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
					image={{ uri: item.episode.image }}
				>
					<Text style={{ color: 'grey', width: 120, padding: 5, fontWeight: 'bold', fontSize: 20 }}>
						{item.episode.title}
					</Text>
					<Text style={{ marginBottom: 10, color: 'white' }}>{item.episode.synopsis}</Text>
					<Button
						icon={<Icon name="code" color="#ffffff" />}
						containerStyle={{}}
						buttonStyle={{
							borderBottomRightRadius: 20,
							borderTopLeftRadius: 20,
							backgroundColor: '#b71c1c',
							borderRadius: 0,
							marginLeft: 0,
							marginRight: 0,
							marginBottom: 0
						}}
						title="Watch Now"
					/>
				</Card>
			);
		}
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#212121' }}>
				{this.state.info === null ? (
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<Button buttonStyle={{ borderColor: 'transparent', backgroundColor: '#212121' }} loading />
					</View>
				) : (
					<ScrollView>
						<View style={{ flex: 5 }}>
							<StatusBar backgroundColor="rgba(255,0,0,0.9)" barStyle="light-content" />

							<ImageBackground
								style={styles.container}
								imageStyle={{ borderBottomLeftRadius: 100 }}
								source={require('../assets/movie.jpg')}
							>
								<View style={styles.overlay}>
									<Image source={{ uri: this.state.info.nfinfo.image1 }} style={styles.avatarStyle} />
									<Text style={styles.textStyle}>{this.state.info.nfinfo.title}</Text>
									<Rating
										imageSize={20}
										readonly
										startingValue={this.state.info.imdbinfo.rating / 2}
										ratingBackgroundColor="black"
									/>
								</View>
							</ImageBackground>
							<View style={{ margin: 20 }}>
								<Text
									style={{ color: 'white', width: 120, padding: 5, fontWeight: 'bold', fontSize: 24 }}
								>
									Storyline
								</Text>
								<Text style={{ color: '#bbd4d4', fontSize: 20 }}>{this.state.info.imdbinfo.plot}</Text>

								<Text style={{ color: '#bbd4d4', fontSize: 18 }}>
									Type : {this.state.info.nfinfo.type}
								</Text>
								<Text style={{ color: '#bbd4d4', fontSize: 18 }}>
									Rating : IMDb {this.state.info.imdbinfo.rating}
								</Text>
								<Text style={{ color: '#bbd4d4', fontSize: 18 }}>
									Released : {this.state.info.nfinfo.released}
								</Text>

								{this.EP()}
								{this.state.info.nfinfo.type === 'movie' ? (
									<View>
										<Text
											style={{
												color: 'white',
												width: 120,
												padding: 5,
												fontWeight: 'bold',
												fontSize: 24
											}}
										>
											Related
										</Text>
										<Carousel
											ref={(c) => {
												this._carousel = c;
											}}
											data={this.state.data}
											renderItem={this._renderItem}
											sliderWidth={Dimensions.get('window').width}
											itemWidth={240}
										/>
									</View>
								) : (
									<Text />
								)}
							</View>
						</View>
					</ScrollView>
				)}
				<Footer
					pramas={{
						left: { Text: 'Back', func: () => console.log('hey') },
						right: { Text: 'Continue', func: () => this.setState({ visible: true }) }
					}}
				/>
				{this.state.visible && (
					<Overlay containerStyle={{ backgroundColor: 'transparent' }} isVisible>
						<View style={{ flex: 5 }}>
							<Text style={{ textAlign: 'center', color: 'black', fontSize: 20 }}>
								Hellow from the other side
							</Text>

							<ScrollView>
								<PricingCard
									color="#b71c1c"
									title="App Cost"
									price="$0"
									info={[ '1 User', 'Basic Support', 'All Core Features' ]}
									button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
								/>
								<PricingCard
									color="#b71c1c"
									title="Monthly Subscription HAIFLIX"
									price="$0"
									info={[ '1 User', 'Basic Support', 'All Core Features' ]}
									button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
								/>
								<PricingCard
									color="#b71c1c"
									title="Monthly Subscription HAIMUS"
									price="$0"
									info={[ '1 User', 'Basic Support', 'All Core Features' ]}
									button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
								/>
							</ScrollView>
						</View>
						<View style={{ height: 30 }}>
							<Button
								buttonStyle={{ backgroundColor: '#b71c1c' }}
								title="Close This pop Up"
								onPress={() => this.setState({ visible: false })}
							/>
						</View>
					</Overlay>
				)}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		borderBottomLeftRadius: 100
	},
	overlay: {
		backgroundColor: 'rgba(255,0,0,0.5)',
		height: 300,
		justifyContent: 'center',
		borderBottomLeftRadius: 100
	},
	avatarStyle: {
		width: 200,
		height: 200,
		marginTop: 10,
		borderRadius: 10,
		alignSelf: 'center',
		resizeMode: 'contain'
	},
	textStyle: {
		marginTop: 10,
		fontSize: 18,
		color: '#FFFFFF',
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	balanceContainer: {
		padding: 10
	}
});
