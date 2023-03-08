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
            <Text style={{fontsize: 20, fontWeight: 'bold'}}>
              Log Out
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
      marginTop: 100,
    },
    button: {
      marginTop: 50,
      height: 70,
      width: 250,
      backgroundColor: '#026efd',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    }
  })