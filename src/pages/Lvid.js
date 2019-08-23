import React from "react";
import PropTypes from "prop-types";
import { Slider, Button, Icon, Overlay, Divider } from "react-native-elements";
import {
  View,
  StatusBar,
  Text,
  FlatList,
  Dimensions,
  Picker
} from "react-native";
import Head from "../component/header.js";
import Cards from "../component/card.js";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import Secret from "../Constant.json";
export default class Lvideio extends React.Component {
  constructor() {
    super();
    this.state = {
      Search: "get%3Anew7",
      List: null,
      visible: false,
      category: [],
      value: 0,
      type: "Any",
      sort: "Relevance",
      genre: 0,
      yearss: [],
      syear: 1900,
      eyear: 2019
    };
  }
  componentDidMount() {
    const a = this.props.navigation.getParam("search", null);
    if (a == null) {
    } else {
      this.setState({ Search: encodeURI(a) });
    }
    const b = this.props.navigation.getParam("type", null);
    if (b == null) {
    } else {
      this.setState({ type: b });
    }
    this.category();
    this.Date();
  }

  GetDataFiltered() {
    const a = this.state.Search;
    const b = this.state.type;
    this.setState({ List: null });
    const url =
      "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=" +
      this.state.Search +
      "-!" +
      this.state.syear +
      "," +
      this.state.eyear +
      "-!0,5-!" +
      this.state.value +
      ",10-!" +
      this.state.category[this.state.genre].data.join() +
      "-!" +
      this.state.type +
      "-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=all&st=adv&ob=" +
      this.state.sort +
      "&p=1&sa=and";

    console.log(url);

    axios
      .get(url, {
        headers: {
          "X-RapidAPI-Host": Secret[0].value,
          "X-RapidAPI-Key": Secret[1].value
        }
      })
      .then(response => {
        console.log(response.data.ITEMS);
        this.setState({ List: response.data.ITEMS });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  Date() {
    const a = 1900;
    const b = new Date().getFullYear();
    let years = [];
    for (var i = 0; i <= b - a; i++) {
      years.push(a + i);
    }
    this.setState({ yearss: years });
  }
  category() {
    axios
      .get("https://unogs-unogs-v1.p.rapidapi.com/api.cgi?t=genres", {
        headers: {
          "X-RapidAPI-Host": Secret[0].value,
          "X-RapidAPI-Key": Secret[1].value
        }
      })
      .then(response => {
        //console.log(response.data);
        let ass = [];
        ass.push({ key: "All", data: [0] });
        for (var i = 0; i < response.data.COUNT; i++) {
          const a = Object.keys(response.data.ITEMS[i]);
          // console.log(a[0])
          const b = a[0];
          const cat = response.data.ITEMS[i][b];
          ass.push({ key: b, data: cat });
        }
        this.setState({ category: ass });
        this.GetDataFiltered();
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
            <View
              style={{
                flexDirection: "row",
                heigth: 100,
                backgroundColor: "#b71c1c"
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: "white", fontSize: 20, margin: 20 }}>
                  POPULAR
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Icon
                  onPress={() => this.setState({ visible: true })}
                  iconStyle={{ alignSelf: "flex-end", margin: 20 }}
                  name="menu"
                  color="white"
                />
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
            </View>
          </ScrollView>
        )}
        {this.state.visible && (
          <Overlay isVisible>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
                onPress={() => this.setState({ visible: false })}
              >
                FILTER
              </Text>
              <View style={{ margin: 20, flex: 1, alignItems: "stretch" }}>
                <Slider
                  maximumValue={10}
                  value={this.state.value}
                  onValueChange={value =>
                    this.setState({ value: Math.round(value) })
                  }
                />
                <Text style={{ marginBottom: 10 }}>
                  Select IMDb min Rating: {this.state.value}
                </Text>
                <Divider style={{ backgroundColor: "grey" }} />
                <Picker
                  selectedValue={this.state.type}
                  style={{ height: 50 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ type: itemValue })
                  }
                >
                  <Picker.Item label="All" value="Any" />
                  <Picker.Item label="Movie" value="movie" />
                  <Picker.Item label="Series" value="series" />
                </Picker>
                <Text style={{ marginBottom: 10 }}>
                  Select Type: {this.state.type}
                </Text>
                <Divider style={{ backgroundColor: "grey" }} />
                <Picker
                  selectedValue={this.state.sort}
                  style={{ height: 50 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ sort: itemValue })
                  }
                >
                  <Picker.Item label="Relevance" value="relevance" />
                  <Picker.Item label="Date" value="date" />
                  <Picker.Item label="Rating" value="rating" />
                  <Picker.Item label="Title" value="title" />
                  <Picker.Item label="VideoType" value="videoType" />
                  <Picker.Item label="FilmYear" value="filmYear" />
                  <Picker.Item label="Runtime" value="runtime" />
                </Picker>
                <Text style={{ marginBottom: 10 }}>
                  Sort : {this.state.sort}
                </Text>
                <Divider style={{ backgroundColor: "grey" }} />
                <Picker
                  selectedValue={this.state.genre}
                  style={{ height: 50 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ genre: itemValue })
                  }
                >
                  {this.state.category.map((item, key) => (
                    <Picker.Item key={key} label={item.key} value={key} />
                  ))}
                </Picker>
                <Text style={{ marginBottom: 10 }}>
                  Genre {this.state.genre}
                </Text>
                <Divider style={{ backgroundColor: "grey" }} />
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Picker
                      selectedValue={this.state.syear}
                      style={{ height: 50 }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ syear: itemValue })
                      }
                    >
                      {this.state.yearss.map((item, key) => (
                        <Picker.Item label={" " + item} value={item} />
                      ))}
                    </Picker>
                    <Text style={{ marginBottom: 10 }}>
                      Start Year : {this.state.syear}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Picker
                      selectedValue={this.state.eyear}
                      style={{ height: 50 }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ eyear: itemValue })
                      }
                    >
                      {this.state.yearss.map((item, key) => (
                        <Picker.Item label={" " + item} value={item} />
                      ))}
                    </Picker>
                    <Text style={{ marginBottom: 10 }}>
                      End Year : {this.state.eyear}
                    </Text>
                  </View>
                  <Divider style={{ backgroundColor: "grey" }} />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Button
                      title="Filter"
                      type="outline"
                      onPress={() => this.GetDataFiltered()}
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Button
                      title="Cancel"
                      type="outline"
                      onPress={() => this.setState({ visible: false })}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Overlay>
        )}
      </View>
    );
  }
}
