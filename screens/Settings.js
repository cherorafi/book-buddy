import React, { useState, useContext } from 'react';
import { Text, SafeAreaView, StyleSheet, Switch, useColorScheme } from 'react-native';
import { firebase } from '../config';
import ColorSchemeContext from './../ColorSchemeContext';


const Settings = () => {
 // Stateful variable for toggling between light and dark mode
 const { toggleColorScheme } = useContext(ColorSchemeContext);
 const { colorScheme } = useContext(ColorSchemeContext);


 // Function to toggle dark mode
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
 title: {
   fontSize: 30,
   fontWeight: 'bold',
   marginBottom: 30,
 },
 section: {
   marginTop: 10,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingBottom: 500,
   width: '100%',
 },
 sectionHeader: {
   fontSize: 20,
   fontWeight: 'bold',
 },
});

