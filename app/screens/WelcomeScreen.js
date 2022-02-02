import * as React from 'react';
import { View,ImageBackground, Pressable, StyleSheet, Text, Button } from 'react-native';
import { TextInput } from 'react-native';

function WelcomeScreen({ navigation }) {
    const [uname, setUname] = React.useState("");
    const [pword, setPword] = React.useState("");
    return (
        <ImageBackground 
            style={styles.background}
            source ={require("../assets/bg-welcome.png")}>
            <Text style={styles.titleText}>Where To Next?</Text>
            <Text style={styles.subtitleText}>Look up places you want to visit and see the most popular destinations among users for inpiration on where to travel next! </Text>
            <View style={{ flexDirection:"row", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.navigate("Log In")}
            >
              <Text style={styles.textStyle}>Log In</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.textStyle}>Register</Text>
            </Pressable>
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
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        width: '88%',
        marginTop: 20,
        textAlign: 'center'
    },
    subtitleText: {
        color: '#34665A',
        fontSize: 20,
        position: 'absolute',
        top: 100,
        fontWeight: 'bold',
        width: '88%',
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        height: 40,
        width: 120,
        margin: 10
      },
})

  

export default WelcomeScreen;