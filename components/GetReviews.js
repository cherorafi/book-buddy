import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';


const GetReviews = ({ isbn }) => {
  const [reviews, setReviews] = useState('');

  useEffect(() => {
    const fetchBookTitle = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items.volumeInfo;
        const reviewsResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookData}/reviews`);
        setReviews(reviewsResponse.data.items);
        
      } catch (error) {
        //console.error(error);
      }
    };
    fetchBookTitle();
  }, [isbn]);
  console.log('heyyy')
  
  console.log(reviews)
  return reviews;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 200,
  },
});

export {
  GetReviews}