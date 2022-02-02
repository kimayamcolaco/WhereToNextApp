import * as React from 'react';
import { View, Text, Pressable, TextInput, ImageBackground, StyleSheet } from 'react-native';

function Login({ navigation }) {
    const [uname, setUname] = React.useState("");
    const [pword, setPword] = React.useState("");
    return (
        <ImageBackground 
            style={styles.background}
            source ={require("../assets/bg-login-register.png")}>
            <View style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
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
                <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.textStyle}>Log In</Text>
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
        margin: 10,
    },
})

export default Login;