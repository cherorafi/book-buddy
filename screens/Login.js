/* 
This file handles the front and back end for logging in/authentication
*/

import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Login = () => {
  const navigation = useNavigation();
  
  // Creates the 2 variables needed to login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Function to handle the backend 
  loginUser = async(email, password) => {
    try {
      // Built in Firebase Auth Function to login
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error){
      // Handles different kinds of errors (wrong password/email)
      alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <Image style={styles.image} source={require("../assets/logo.png")} /> 
      <Text style={{fontWeight: 'bold', fontSize:25, }}>
        Login to BookBuddy
      </Text>
      
      {/* Text fields to enter the email and password for authentication */}
      <View style={{}}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>

      {/* Calls the function to handle log in */}
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{fontWeight: 'bold', fontSize: 22}}>Login</Text>
      </TouchableOpacity>

      {/* If the user doesn't already have an account, navigates them to Registration */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={{marginTop:20}}
      >
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding:70,
    backgroundColor: 'white',
  },
  textInput: {
    fontSize: 20,
    marginTop: 35,
    height: 50,
    width: 300,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    
    padding: 12,
  
  },
  image: {
      marginBottom:40,
      height:150,
      width:150,

      },
  button: {
    marginTop: 50,
    height: 70,
    width: 200,
    backgroundColor: '#C2B7C8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    opacity: .9,
  }
})