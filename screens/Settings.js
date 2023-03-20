import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { firebase } from '../config'

const Settings = () => {
    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => {firebase.auth().signOut()}}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
    },
    button: {
      marginTop: 50,
      height: 50,
      width: 200,
      backgroundColor: '#026efd',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
  })
