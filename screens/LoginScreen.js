import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Image,
    Alert
} from 'react-native'

import firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            emailId: '',
            password: ''
        }
    }

    login = async (email, password) => {
        if(email && password) {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(email, password)

                if(response) {
                    this.props.navigation.navigate('Transaction')
                }
            } catch(err) {
                console.log(err)
                switch(err.code) {
                    case 'Auth-User Not Found':
                        Alert.alert("User doesn't exist")
                        console.log("user doesn't exist")
                    break;

                    case 'Auth-Invalid Email':
                        Alert.alert("Invalid email/password")
                        console.log("Invalid email/password")
                    break;
                }
            }
        } else {
            Alert.alert('Enter Email and Password')
        }
    }   

    render() {
        return(
            <KeyboardAvoidingView style={{alignItems: 'center', marginTop: 30}}>
                <View>
                    <Image 
                        source={require('../assets/booklogo.jpg')}
                        style={{width: 200, height: 200}}
                    />
                    <Text style={{fontSize: 30, textAlign: 'center'}}>Wireless Library App</Text>
                </View>
                <View>
                    <TextInput 
                        style={styles.loginBox}
                        placeholder="john.doe@example.com"
                        keyboardType="email-address"
                        onChangeText = {text => {
                            this.setState({
                                emailId: text
                            })
                        }}
                    />

                    <TextInput 
                        style={styles.loginBox}
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText = {text => {
                            this.setState({
                                password: text
                            })
                        }}
                    />
                </View>
                <View>
                    <TouchableOpacity 
                        style={{height: 40, width: 100, borderWidth: 2, marginTop: 20, paddingTop: 5, borderRadius: 5}}
                        onPress={()=>{
                            this.login(this.state.emailId, this.state.password)
                        }}
                    >
                        <Text style={{textAlign: 'center'}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 2, 
        fontSize: 20,
        margin: 10,
        padding: 10
    }
})