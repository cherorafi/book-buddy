import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import ColorSchemeContext from './../ColorSchemeContext';

const Browse = () => {
  const navigation = useNavigation();
  const defaultImage = 'https://via.placeholder.com/64';
  const [genres, setGenres] = useState([
    'Fiction',
    'History',
    'Mystery',
    'Thriller',
    'Romance',
    'Horror',
    'Nonfiction',
    'Biography',
    'Fantasy',
    'Manga',

  ]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [books, setBooks] = useState([]);

  const handleGenreSelect = async (genre) => {
    setSelectedGenre(genre);
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=newest&maxResults=30`,
      key='AIzaSyBlVC6WfM_KkX6ccq7HnaJ7jO8mem9rUvk',  
    );
    setBooks(response.data.items);
  };

  const handleGenreUnselect = () => {
    setSelectedGenre(null);
  }
  const { colorScheme } = useContext(ColorSchemeContext);


  return (
    <View style={[{ flex: 1, padding: 20 , backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5'}]}>
      {selectedGenre == null &&(
          <ScrollView vertical={true} showsVerticalScrollIndicator={true}>
          <Text style={{ fontSize: 24, color: colorScheme === 'dark' ? 'white' : 'black' }}>Book Genres</Text>
          {genres.map((genre, index) => (
            <Button
              key={index}
              title={genre}
              onPress={() => handleGenreSelect(genre)}
              containerStyle={{ marginRight: 10, marginBottom: 15, padding: 10 }}
            />
          ))}
        </ScrollView>
      )}
      
      {selectedGenre && (
        <View style={{ marginTop: 10, marginBottom: 70 }}>
          <Button title="Back" onPress={() => handleGenreUnselect()}/>
          <Text style={[{ fontSize: 20, marginBottom: 10 }, {color: colorScheme === 'dark' ? 'white' : 'black'}]}>
           Popular Books in {selectedGenre}
          </Text>

          <ScrollView vertical={true} showsVerticalScrollIndicator={true}>
            {books.map((book, index) => (
              <View key={book.id} style={styles.result}>
            
              <Image
                style={styles.thumbnail}
                source={{ uri: book.volumeInfo.imageLinks?.thumbnail ?? defaultImage }}      
              />

              <View style={styles.details}>
                <TouchableOpacity onPress={() => navigation.navigate('BookView', { isbn: book.volumeInfo.industryIdentifiers.find((identifier) => identifier.type === 'ISBN_13').identifier })} >
                <Text style={[styles.title, {color: colorScheme === 'dark' ? 'white' : 'black'}]}>{book.volumeInfo.title}</Text>
                <Text style={[styles.author, {color: colorScheme === 'dark' ? 'white' : 'black'}]}>{book.volumeInfo.authors?.[0]}</Text> 
                </TouchableOpacity>
              </View>
              
              <View style={styles.separator} />
            </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Browse

const styles = StyleSheet.create({
    
  container: {
   
    flex: 1,
    padding: 16,
  },
  
  image: {
    width: 35,
    height: 45,
    marginRight: 10,
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  results: {
    //borderWidth: 5,
    flex: 1,
    marginTop: 16, 
    
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  thumbnail: {
    width: 70,
    height: 100,
    marginRight: 16,
  },
  details: {
    flex: 1,
    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
});
