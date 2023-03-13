import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AddBook from '../components/AddBook.js'
//import { firebase } from '../config'
//import {examplecover} from '../assets/examplecover.jpg'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';


const BookView = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('This Is The Title')
  const [author, setAuthor] = useState('Jane Smith')
  const [score, setScore] = useState(4)
  const [summary, setSummary] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
  const [review, setReview] = useState('')
  //get number of stars

  let stars = [];
  let emptystars = [];
  for (let i = 0; i < score; i++){
    stars.push(<AntDesign name="star" key={i} size={24} color="#FFE75C" />)
  }

  for (let j = 0; j < 5-score; j++){
    emptystars.push(<AntDesign name="star" key={j} size={24} color="gray" />)
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: '50%', justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/examplecover.jpg')} style={{width: 134, height: 213}}/>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlignVertical: "top", textAlign: "center"}}>
          {title}
        </Text>
        <Text style={{fontSize: 15, textAlignVertical: "top"}}>{author}</Text>
        <View style={{flexDirection: "row", paddingVertical: 10,}}>
          <View style={{flexDirection: "row"}}>{stars}</View>
          <View style={{flexDirection: "row"}}>{emptystars}</View>
          <Text> ({score.toFixed(1)})</Text>
        </View>
        <AddBook/>
      </View>

      <View style={styles.summary}>
        <Text style={{fontFamily: 17}}>{summary}</Text>
      </View>
      
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('AddToList')}
        style={styles.button}
      >
        <Text style={{fontsize: 20, fontWeight: 'bold'}}>
          AddToList
        </Text>
      </TouchableOpacity> */}
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
  },
  summary: {
    flex: 1,
    backgroundColor: "white"
  }
})