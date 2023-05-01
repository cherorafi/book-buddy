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

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchConducted, setSearchConducted] = useState(false);
  const [books, setBooks] = useState([]);

  const handleGenreSelect = (genreName) => {
    if (selectedGenres.includes(genreName)) {
      setSelectedGenres(selectedGenres.filter((f) => f !== genreName));
    } else {
      setSelectedGenres([...selectedGenres, genreName]);
    }
  };

  const handleSearch = async () => {
    if (selectedGenres.length <= 0){
      alert("Select at least one genre")
    } else {
      const genre = selectedGenres.join('+')
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=newest&maxResults=30&minResults=1`,
        key='AIzaSyBlVC6WfM_KkX6ccq7HnaJ7jO8mem9rUvk',  
      );
      setBooks(response.data.items);
      setSearchConducted(true)
    }
  };

  const handleGenreUnselect = () => {
    setSelectedGenres([]);
    setSearchConducted(false);
  }
  const { colorScheme } = useContext(ColorSchemeContext);


  return (
    <View style={[{ flex: 1, padding: 20 , backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5'}]}>
      {searchConducted == false &&(
        <ScrollView vertical>
          <Text style={{ fontSize: 24, color: colorScheme === 'dark' ? 'white' : 'black' }}>Book Genres</Text>
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
          <TouchableOpacity onPress={() => handleSearch()} 
            style={styles.keyButtons}>
            <Text style={{fontSize: 20, alignContent: 'center'}}>Search</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      
      {searchConducted && (
        <View style={{ marginTop: 10, marginBottom: 70 }}>
          <TouchableOpacity style={styles.backButton} onPress={() => handleGenreUnselect()}>
            <Text style={{fontSize: 20, alignContent: 'center'}}>Back</Text>
          </TouchableOpacity>
          <Text style={[{ fontSize: 20, marginBottom: 10 }, {color: colorScheme === 'dark' ? 'white' : 'black'}]}>
           Popular Books {selectedGenres.join(" and ")}
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
