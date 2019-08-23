import React from "react";
import PropTypes from "prop-types";
import { Tile, Button } from "react-native-elements";
import {
  View,
  StatusBar,
  Text,
  FlatList,
  Dimensions,
  Platform
} from "react-native";
import Head from "../component/header.js";
import Cards from "../component/card.js";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import Secret from "../Constant.json";

export default class Haiflix extends React.Component {
  constructor() {
    super();
    this.state = {
      datas: [
        {
          title: "TV Shows",
          subtitle: "Series",
          url: require("../assets/Series.jpg"),
          action: () =>
            this.props.navigation.navigate("Lvideio", { type: "series" })
        },
        {
          title: "Movies",
          subtitle: "Movies",
          url: require("../assets/Movies.jpg"),
          action: () =>
            this.props.navigation.navigate("Lvideio", { type: "movie" })
        }
      ],
     page: 1,
      List: null
    };
  }
  _renderItem({ item, index }) {
    return (
      <View>
        <Tile
          imageSrc={item.url}
          title={item.title}
          featured
          caption={item.subtitle}
          onPress={item.action}
        />
      </View>
    );
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    axios
      .get(
        "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew30-!1900,2018-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=all&st=adv&ob=FilmYear&p=" +
          this.state.page +
          "&sa=and",
        {
          headers: {
            "X-RapidAPI-Host": Secret[0].value,
            "X-RapidAPI-Key": Secret[1].value
          }
        }
      )
      .then(response => {
        console.log(response.data.ITEMS);
        this.setState({ List: response.data.ITEMS });
      })
      .catch(function(error) {
        console.error(error)
      });
  }

  loadDataPage() {
    axios
      .get(
        "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew30-!1900,2018-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=all&st=adv&ob=FilmYear&p=" +
          this.state.page +
          "&sa=and",
        {
          headers: {
            "X-RapidAPI-Host": Secret[0].value,
            "X-RapidAPI-Key": Secret[1].value
          }
        }
      )
      .then(response => {
        console.log(response.data.ITEMS);

        this.setState({ List: this.state.List.concat(response.data.ITEMS) });
      })
      .catch(function(error) {
        //  console.log(error);
      });
  }
  render() {
    //   console.log(this.state.List)
    return (
      <View style={{ flex: 1, backgroundColor: "#212121" }}>
        <StatusBar backgroundColor="#b71c1c" barStyle="light-content" />
        <Head navigation={this.props.navigation} title="HAIFLIX" />
        {this.state.List === null ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Button
              buttonStyle={{
                borderColor: "transparent",
                backgroundColor: "#212121"
              }}
              loading
            />
          </View>
        ) : (
          <ScrollView>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.datas}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width}
            />

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "white", fontSize: 30, margin: 10 }}>
                  POPULAR
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  onPress={() => this.props.navigation.navigate("Lvideio")}
                  style={{
                    color: "white",
                    textAlign: "right",
                    fontSize: 18,
                    margin: 10
                  }}
                >
                  More
                </Text>
              </View>
            </View>

            <View>
              <FlatList
                data={this.state.List}
                renderItem={({ item }) => (
                  <Cards
                    navigation={this.props.navigation}
                    moreInfo={item}
                    desc={item.synopsis}
                    title={item.title}
                    url={item.image}
                  />
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
              />
              <View style={{ justifyContent: "center", alignItem: "center" }}>
                <Button
                  buttonStyle={{ borderColor: "#b71c1c" }}
                  title="Load More"
                  type="outline"
                  onPress={() => {
                    this.setState({ page: this.state.page + 1 });
                    this.loadDataPage();
                  }}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
