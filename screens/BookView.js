import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { BookRatingToStar } from '../components/BookRatingToStar';
import { BookAuthor, BookTitle, BookCover, BookRating, BookDescription } from '../components/GoogleBooks';
import AddBook from '../components/AddBook.js'
import Reviews from './Reviews.js'
import { ScrollView } from 'react-native-gesture-handler';
import { useContext } from 'react';
import ColorSchemeContext from './../ColorSchemeContext';

const BookView = (isbn_) => {
  const isbn13 = isbn_.route.params.isbn
  // console.log(isbn13)
  // console.log('hi')
  
 
  
  const navigation = useNavigation();
  const [title, setTitle] = useState('This Is The Title')
  const [author, setAuthor] = useState('Jane Smith')
  const [score, setScore] = useState(4)
  const [summary, setSummary] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
  const [review, setReview] = useState('')
  const { colorScheme } = useContext(ColorSchemeContext);

  //get number of stars

  // let stars = [];
  // let emptystars = [];
  // for (let i = 0; i < score; i++){
  //   stars.push(<AntDesign name="star" key={i} size={24} color="#FFE75C" />)
  // }

  // for (let j = 0; j < 5-score; j++){
  //   emptystars.push(<AntDesign name="star" key={j} size={24} color="gray" />)
  // }
// style={{width: 134, height: 213}
// height: '50%'

// console.log()
  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5' }] }>
      <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 15, minWidth: '100%' }}>
        <BookCover isbn={isbn13} />
        <Text style={{marginTop: 10, fontSize: 20, fontWeight: 'bold', textAlignVertical: "top", textAlign: "center"}}>
          <BookTitle isbn={isbn13}></BookTitle>
        </Text>
        <Text style={{fontSize: 15, textAlignVertical: "top"}}><BookAuthor isbn={isbn13}></BookAuthor></Text>
        {/* <View style={{flexDirection: "row", paddingVertical: 10}}>
          <View style={{flexDirection: "row"}}>{stars}</View>
          <View style={{flexDirection: "row"}}>{emptystars}</View>
          <Text> ({score.toFixed(1)})</Text>
        </View> */}
        <TouchableOpacity onPress={() => navigation.navigate('Reviews', isbn13)} style={{flexDirection: 'row'}}>
          <BookRatingToStar isbn={isbn13}></BookRatingToStar> 
          <Text style={{marginTop: 2, marginLeft: 5}}><BookRating isbn={isbn13}></BookRating></Text>
        </TouchableOpacity>
        <AddBook bookName={isbn13}/>
      </View>

      <View style={styles.summary}>
        <Text style={{fontSize: 17}}><BookDescription isbn={isbn13}></BookDescription></Text>
      </View>
      
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('AddToList')}
        style={styles.button}
      >
        <Text style={{fontsize: 20, fontWeight: 'bold'}}>
          AddToList
        </Text>
      </TouchableOpacity> */}
      </View>
    </ScrollView>
  )
}

export default BookView

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    shadowColor: '#000'
    
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
    // flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 17,
    alignItems: 'center',
    shadowColor: '#000'
  }
})
