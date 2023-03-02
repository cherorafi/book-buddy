import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { firebase } from '../config'
import {examplecover} from '../assets/examplecover.jpg'

const BookView = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('This Is The Title')
  const [author, setAuthor] = useState('Jane Smith')
  const [score, setScore] = useState(4)
  const [review, setReview] = useState('')


  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: '50%'}}>
        <Image source={require('../assets/examplecover.jpg')} style={{width: 40, height: 90}}/>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlignVertical: "top"}}>
          {title}
        </Text>
        <Text style={{fontSize: 15, textAlignVertical: "top"}}>{author}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddToList')}
        style={styles.button}
      >
        <Text style={{fontsize: 20, fontWeight: 'bold'}}>
          AddToList
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default BookView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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