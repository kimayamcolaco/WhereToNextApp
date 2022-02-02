import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, Alert, Modal, Pressable, TextInput, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';

function HomeScreen({ navigation}) {
    const [placeQueried, setPlaceQueried] = React.useState("");
    const [info, setInfo] = React.useState([]);
    const [placeID, setPlaceID] = React.useState("");

    const [cities, setCities] = React.useState([]);
    const [number, onChangeNumber] = useState(null);

    const [tableHead, setTableHead] = React.useState([]);
    const [tableData, setTableData] = React.useState([]);

    const [modalVisible, setModalVisible] = React.useState(false);

    const apiKey = "AIzaSyB2WXFZeo05sEJIj8vtM8i8z9dNK3DGyXU";
    const query = placeQueried;

    console.log(query);
    getPlaceInfo(query);

    // get place ID from Google Places Search API
    function getPlaceID(query) {
        axios({
          method: 'get',
          url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`,
          headers: {}
        }).then((res) => {
          let placeID = '';
          placeID = res.data.results[0].place_id;
          setPlaceID(placeID);
        })
      }
    
    // get place information from Google Place Details API using PlaceID
      function getPlaceInfo(query) {
        getPlaceID(query);
        let url = '';
        url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeID + '&key=' + apiKey,
        axios({
          method: 'get',
          url: url,
      }).then((res) => {
          let info = ""
          info += "Address: " + res.data.result['formatted_address'] + '\n';
          info += "Coordinates: " + res.data.result['geometry']['location']['lat'] + ', ' + res.data.result['geometry']['location']['lng'] + '\n';
          info += "Website: " + res.data.result['website'];
          console.log(info);
          setInfo(info);
      })
    }

    // get popular places table from shared database
    React.useEffect(() => {
        axios({
            method: "GET",
            url: "https://us-central1-travel-mobile-app-f207d.cloudfunctions.net/getPopularCities"
        }).then((res) => {
            setTableHead([['City'], ['Country'], ['Times Visited']]);
            let tableData = [];
            res.data.forEach((data) => {
                tableData.push([data["city"], data["country"], data["num_visited"]])
            })
            setTableData(tableData);
        })
    }, [])

    function refreshData() {
        axios({
            method: "GET",
            url: "https://us-central1-travel-mobile-app-f207d.cloudfunctions.net/getPopularCities"
        }).then((res) => {
            setCities(res.data);
            setTableHead([['City'], ['Country'], ['Times Visited']]);
            let tableData = [];
            res.data.forEach((data) => {
                tableData.push([data["city"], data["country"], data["num_visited"]])
            })
            setTableData(tableData);
        })
    }

    

    return (
        <ImageBackground 
            style={styles.background}
            source ={require("../assets/background-home.jpg")}>
            <Text style={styles.titleText}>Where To Next?</Text>
            <TextInput
                style={styles.input}
                onChangeText={(placeQueried) => {
                    setPlaceQueried(placeQueried) && onChangeNumber;
                }}
                value={number}
                placeholder="Type a place you want to go"
            />

        {/* modal screen */}
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View style={styles.container}>
                    <Text style={styles.modalTextStyle}>{info}</Text>
                    </View>
                    <Pressable
                    style={[styles.modalButton, styles.modalButtonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.modalTextStyle}>Close</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.modalButton, styles.modalButtonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.modalTextStyle}>Tell Me More</Text>
            </Pressable>
            </View>
            <View style={styles.popularView}>
                <Text style={styles.text}>Popular Right Now</Text>
                <View style={styles.container}>
                    {tableHead.length > 0 && tableData.length > 0 && <Table borderStyle={{borderWidth: 2, borderColor: '#EADAD7'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.tableText} />
                        <Rows data={tableData.slice(0,5)} textStyle={styles.tableText}/>
                    </Table>}
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: '#F4F0F0',
        fontSize: 48,
        position: 'absolute',
        top: 80,
    },
    text : {
        color: '#F4F0F0' ,
        fontSize: 30,
        fontWeight: 'bold',
        margin: 12,
        textAlign: "center",
    },
    input: {
        height: 48,
        width: 220,
        margin: 20,
        borderWidth: 4,
        padding: 10,
        borderColor: '#EADAD7',
        position: 'absolute',
        top: 160
    },
    textStyle: {
        color: '#C5A7A0',
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        height: 40,
        width: 240,
        marginBottom: 120,
    },
    popularView: {
        marginBottom: 80,
    },
    container: { backgroundColor: '#fff', width:340 },
    head: { height: 40, backgroundColor: '#BC9A92'},
    tableText: { margin: 6 },

    // modal styles
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 32,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '88%'
      },
      modalButton: {
        borderRadius: 20,
        margin: 10,
      },
      modalButtonOpen: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        height: 40,
        width: 120,
        position: 'absolute',
        top: 240,
      },
      modalButtonClose: {
        backgroundColor: '#FAE7E2',
        height: 40,
        width: 120,
        padding: 10,
      },
      modalTextStyle: {
        color: '#C5A7A0',
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default HomeScreen;