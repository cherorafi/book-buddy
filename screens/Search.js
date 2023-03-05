import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

// import { Touchable } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const defaultImage = 'https://via.placeholder.com/64';
export default function SearchPage() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');       // making Two variables so that we can store input and display output
  const [results, setResults] = useState([]);

  const handleSearch = async () => {               //Axios library provides functions like get this library helps handle web requests 
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`,
        key='AIzaSyBlVC6WfM_KkX6ccq7HnaJ7jO8mem9rUvk',        // Making simple request to Api without preWriten functions We can add a parameter key here 
        
      );
      setResults(response.data.items);
    } catch (error) {
      console.error(error);             // preWriten functions to catch error 
    }
  };

  return (          //user input and setting the variable value 
    <View style={styles.container}>
      <Text style={styles.title}>Search Page</Text>
      {/* SEARCH bar with side by side view button and input  */}
      <View style={styles.input}>      
      <TextInput
        onChangeText={setQuery}
        placeholder="Search query"
        value={query}
      />
      <Button 
        title="Search"
        onPress={handleSearch}      // Calls our function which makes the call to the Api
      /> 
        
    </View>
     

      {/* //Scroll view helps fit the thing */}
      <ScrollView style={styles.results}> 
                 
        {results.map((result) => (
          <View key={result.id} style={styles.result}>
            <Image
              style={styles.thumbnail}
              source={{ uri: result.volumeInfo.imageLinks?.thumbnail ?? defaultImage }}      
            />

          <View style={styles.details}>   
            <TouchableOpacity onPress={() => navigation.navigate('BookView')} >
              <Text style={styles.title}>{result.volumeInfo.title}</Text>
              <Text style={styles.author}>{result.volumeInfo.authors?.[0]}</Text>
              </TouchableOpacity>
              {/* <Text style={styles.description}>{result.volumeInfo.description }</Text> */}
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// designs simple 
const styles = StyleSheet.create({
    
  container: {
   
    flex: 1,
    padding: 16,
  },
  
  image: {
    width: 20,
    height: 20,
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
    width: 64,
    height: 64,
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



//run this before npm install axios

 {/* The Output From API We have access to more info from API
            HERE IS A LIST:
             subtitle: The book's subtitle, if available.
            publisher: The name of the book's publisher.
            publishedDate: The date the book was published.
            description: A brief summary or description of the book.
            pageCount: The number of pages in the book.
            categories: An array of categories or genres that the book belongs to.
            averageRating: The average rating of the book, based on user reviews.
            ratingsCount: The number of ratings that the book has received.
            maturityRating: The book's maturity rating, which can be "NOT_MATURE", "MATURE", or "UNKNOWN".
            language: The language that the book is written in.
            previewLink: A link to a preview of the book, if available.
            infoLink: A link to more information about the book.  */}
