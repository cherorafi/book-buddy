import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  loginUser = async(email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error){
      alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} /> 


      {/* <Image source={require('../assets/splash.png')} /> */}
      <Text style={{fontWeight: 'bold', fontSize:25, fontFamily:'Times New Roman'}}>
        Login to BookBuddy
      </Text>
      
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
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{fontWeight: 'bold', fontSize: 22}}>Login</Text>
      </TouchableOpacity>

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
    fontFamily:"Times New Roman",
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
