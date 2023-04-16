import React, { useState, useContext } from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, Switch, useColorScheme } from 'react-native';
import { firebase } from '../config';
import ColorSchemeContext from './../ColorSchemeContext';


const Settings = () => {
 // Stateful variable for toggling between light and dark mode
 const { toggleColorScheme } = useContext(ColorSchemeContext);
 const { colorScheme } = useContext(ColorSchemeContext);

 // Function to toggle dark mode



 // Function to sign out
 const handleSignOut = () => {
   firebase.auth().signOut();
 };


 return (
   <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5' }]}>
     <SafeAreaView style={styles.section}>
       <Text style={[styles.sectionHeader, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Dark Mode</Text>
       <Switch
         trackColor={{ false: "#767577", true: "#007AFF" }}
         thumbColor={colorScheme === 'dark' ? "#FFFFFF" : "#FFFFFF"}
         ios_backgroundColor="#3e3e3e"
         onValueChange={toggleColorScheme}
         value={colorScheme === 'dark'}
       />
     </SafeAreaView>


     <TouchableOpacity onPress={handleSignOut} style={styles.button}>
 <Text style={[styles.buttonText]}>Sign Out</Text>




     </TouchableOpacity>
   </SafeAreaView>
 );
};


export default Settings;


const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   padding: 10,
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
 title: {
   fontSize: 30,
   fontWeight: 'bold',
   marginBottom: 30,
 },
 section: {
   marginTop: 20,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   borderBottomColor: '#ccc',
   borderBottomWidth: 1,
   paddingBottom: 10,
   width: '100%',
 },
 sectionHeader: {
   fontSize: 20,
   fontWeight: 'bold',
 },
});