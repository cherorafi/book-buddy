import { Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { BookRatingToStar, RatingToStar } from '../components/BookRatingToStar';
import { BookAuthor, BookTitle, BookCover, BookRating, BookDescription } from '../components/GoogleBooks';
import AddBook from '../components/AddBook.js'
import { ScrollView } from 'react-native-gesture-handler';
import { useContext } from 'react';
import ColorSchemeContext from './../ColorSchemeContext';
import { GetAverage, BookCreation } from '../components/Firestore';

const BookView = (isbn_) => {
  const isbn13 = isbn_.route.params.isbn
  const navigation = useNavigation();
  const { colorScheme } = useContext(ColorSchemeContext);
  BookCreation(isbn13);  
  const avg = GetAverage(isbn13);

  return (
    <ScrollView>
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5' }]}>
    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'dark' ? '#333' : 'white', borderRadius: 10, padding: 15, minWidth: '100%' }}>
      <BookCover isbn={isbn13} />
      <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', textAlignVertical: "top", textAlign: "center", color: colorScheme === 'dark' ? 'white' : 'black' }}>
        <BookTitle isbn={isbn13}></BookTitle>
      </Text>
      <Text style={[{fontSize: 15, textAlignVertical: "top"}, { color: colorScheme === 'dark' ? 'white' : 'black'  }]}><BookAuthor isbn={isbn13}></BookAuthor></Text>
        <TouchableOpacity onPress={() => navigation.navigate('Reviews', {isbn: isbn13})} style={{flexDirection: 'row'}}>
          <RatingToStar _score={avg}></RatingToStar>
          <Text style={{marginTop: 2, marginLeft: 5, color: colorScheme === 'dark' ? 'white' : 'black' }}>{Number(avg).toFixed(1)}</Text>
        </TouchableOpacity>
        <AddBook bookName={isbn13}/>
      </View>

      <View style={[styles.summary, { backgroundColor: colorScheme === 'dark' ? '#333' : 'white', shadowColor: colorScheme === 'dark' ? '#ddd' : '#000' }]}>
        <Text style={{fontSize: 17, color: colorScheme === 'dark' ? 'white' : 'black' }}><BookDescription isbn={isbn13}></BookDescription></Text>
        <View style={{flexDirection: "row"}}>
        <Text style={{fontSize: 17, color: colorScheme === 'dark' ? 'white' : 'black' }}>Google rating: </Text>
        <BookRatingToStar isbn={isbn13}></BookRatingToStar> 
        <Text style={{marginTop: 2, marginLeft: 5, color: colorScheme === 'dark' ? 'white' : 'black' }}><BookRating isbn={isbn13}></BookRating></Text>
        </View>
      </View>
      </View>
    </ScrollView>
  )
}

export default BookView

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 17,
    alignItems: 'center',
    shadowColor: '#000'
  }
})
