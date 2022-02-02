import axios from 'axios';
import * as React from 'react';
import { View, Text, Pressable, ImageBackground, TextInput, StyleSheet } from 'react-native';

function Register({ navigation }) {
    const [uname, setUname] = React.useState("");
    const [pword, setPword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const apiKey = "";
    function createNewUser() {
        axios({
            method: "POST",
            url: "https://us-central1-travel-mobile-app-f207d.cloudfunctions.net/signUp",
            body: {
                "username": uname,
                "password": pword,
                "email": email,
                "apikey": apiKey
            }
        }).then((res) => {
            navigation.navigate("Home");
        })
    }
    return (
        <ImageBackground 
            style={styles.background}
            source ={require("../assets/bg-login-register.png")}>
            <View style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'  }}>
                <TextInput 
                style={{width: "50%", padding: 20}}
                value={uname} 
                onChangeText={(text) => {
                    setUname(text);
                }}
                placeholder='Enter Username' placeholderTextColor= 'black'/>
                <TextInput 
                style={{width: "50%", padding: 20}}
                secureTextEntry
                value={pword} 
                onChangeText={(text) => {
                    setPword(text);
                }}
                placeholder='Enter Password' placeholderTextColor= 'black'/>
                <TextInput 
                style={{width: "50%", padding: 20}}
                value={email} 
                onChangeText={(text) => {
                    setEmail(text);
                }}
                placeholder='Enter Email' placeholderTextColor= 'black'/>
                <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("Home")}
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
    button: {
        backgroundColor: '#C5A7A0',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        height: 40,
        width: 120,
        margin: 10
    },
})

export default Register;