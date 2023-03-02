import { View, Text, StyleSheet, Alert } from 'react-native'
import { GetAllLists } from './Firestore'
import React, { Component, useState, useEffect } from 'react';
 

const ShowReadingLists = () => {

    const myList = GetAllLists();

    const SampleFunction = (item) => {
      Alert.alert(item);
   
    }
   
     return (
   
        <View style={styles.MainContainer}>
 
        { myList.map((item, key)=>(
        <Text key={key} style={styles.TextStyle} onPress={ SampleFunction.bind(this, item) }> { item } </Text>)
        )}

        </View>
   
     );
   
  }

export default ShowReadingLists;

 
const styles = StyleSheet.create({
 
 MainContainer: {
   flex: 1,
   margin: 10
   
 },
 
 TextStyle:{
   fontSize : 25,
    textAlign: 'center'
 }
 
});