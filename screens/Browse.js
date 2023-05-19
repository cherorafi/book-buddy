/*
This file handles the front and backend 
For the Browse screen, used to search for books by genre
*/

import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ColorSchemeContext from './../ColorSchemeContext';

const Browse = () => {
  // Setting up navigation & color themes
  const navigation = useNavigation();
  const { colorScheme } = useContext(ColorSchemeContext);

  // Default image for bookCover if none are found from API
  const defaultImage = 'https://via.placeholder.com/64';
  
  // Presetting a list of genres
  const genreList = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Romance' },
    { id: 3, name: 'Horror' },
    { id: 4, name: 'Mystery' },
    { id: 5, name: 'Nonfiction' },
    { id: 6, name: 'Fantasy' },
    { id: 7, name: 'Science Fiction' },
    { id: 13, name: 'Manga' },
    { id: 8, name: "Children's Literature" },
    { id: 9, name: 'Thriller' },
    { id: 10, name: 'Humor' },
    { id: 11, name: 'Action' },
    { id: 12, name: 'Poetry' },
    { id: 14, name: 'Biography'}
  ];

  // Hooks to handle the selected genres, handle the different views (genres selection/results)
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchConducted, setSearchConducted] = useState(false);
  const [books, setBooks] = useState([]);

  // Changes the styling for the button once a genre is selected
  const handleGenreSelect = (genreName) => {
    if (selectedGenres.includes(genreName)) {
      setSelectedGenres(selectedGenres.filter((f) => f !== genreName));
    } else {
      setSelectedGenres([...selectedGenres, genreName]);
    }
  };

  // Resets screen from search back to genres
  const handleGenreUnselect = () => {
    setSelectedGenres([]);
    setSearchConducted(false);
  }

  // Handles API GET request, to get the results for genres
  const handleSearch = async () => {
    // If less than 1 genre is selected
    if (selectedGenres.length <= 0){
      alert("Select at least one genre")
    } else {
      // Concats all genres
      const genre = selectedGenres.join('+')
      // API request
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=newest&maxResults=30`,
        key='AIzaSyBlVC6WfM_KkX6ccq7HnaJ7jO8mem9rUvk',  
      );
      // Gets the list of books
      setBooks(response.data.items);
      // Sets the view to show the results of search
      setSearchConducted(true)
    }
  };
  
  return (
    <View style={[{ flex: 1, padding: 20 , backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5'}]}>
      {/* View of the genre selection screen */}
      {searchConducted == false &&(
        <ScrollView vertical>
          <Text style={{ fontSize: 24, color: colorScheme === 'dark' ? 'white' : 'black' }}>Book Genres</Text>
          {/* Maps each element of genresList as a pressable text
          on press it is added to the selectedGenres array and the style is changed */}
          {genreList.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={[
                  styles.genreButton,
                  selectedGenres.includes(genre.name) && styles.selectedGenreButton,
                ]}
                onPress={() => handleGenreSelect(genre.name)}
              >
                <Text style={styles.genreButtonText}>{genre.name}</Text>
                
              </TouchableOpacity>
            ))}
          
          {/* Search button, calls the handleSearch function and changes the view to results */}
          <TouchableOpacity onPress={() => handleSearch()} 
            style={styles.keyButtons}>
            <Text style={{fontSize: 20, alignContent: 'center'}}>Search</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      
      {/* View of the results screen if books matching the screen were found */}
      {searchConducted && books && (
        <View style={{ marginTop: 10, marginBottom: 70 }}>
          {/* Back button leading back to genre selection */}
          <TouchableOpacity style={styles.backButton} onPress={() => handleGenreUnselect()}>
            <Text style={{fontSize: 20, alignContent: 'center'}}>Back</Text>
          </TouchableOpacity>

          <Text style={[{ fontSize: 20, marginBottom: 10 }, {color: colorScheme === 'dark' ? 'white' : 'black'}]}>
           Popular Books {selectedGenres.join(" and ")}
          </Text>

          {/* Maps each book in a vertical view, makes them pressable
          If pressed, navigates to the BookView of that book */}
          <ScrollView vertical={true} showsVerticalScrollIndicator={true}>
            {/* Assigning a random key since results are read-only but returns duplicates */}
            {books.map((book) => (
              <View key={book.id+Math.random()} style={styles.result}>

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

      {/* View of the results screen if no books were found */}
      {searchConducted && (
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => handleGenreUnselect()}>
            <Text style={{fontSize: 20, alignContent: 'center'}}>Back</Text>
          </TouchableOpacity>
          <Text style={{marginTop:10, justifyContent: 'center', alignSelf:'center', fontSize: 20}}>
            No books found
          </Text>
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
  genreButton: {
    backgroundColor: '#E9E9E9',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    minWidth: 100,
    alignItems: 'center',
   
    fontWeight: 'Bold',
  },
  selectedGenreButton: {
    backgroundColor: '#B9B9B9',
  },
  genreButtonText: {
    fontSize: 16,
  },
  keyButtons: {
    alignContent: 'center', 
    alignItems: 'center',  
    backgroundColor: '#0055CC',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    minWidth: 100,
    alignItems: 'center',
    fontWeight: 'Bold', 
  },
  backButton: {
    alignContent: 'center', 
    alignItems: 'center',  
    backgroundColor: '#0055CC',
    borderRadius: 8,
    padding: 16,
    minWidth: 100,
    alignItems: 'center',
    fontWeight: 'Bold', 
  }
});