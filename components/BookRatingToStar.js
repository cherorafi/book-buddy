import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';


// Takes in an ISBN, fetches data from the GoogleBooksAPI
const BookRatingToStar = ({ isbn } = null) => {
  const [score, setScore] = useState();
  // If book has no ratings
  if(typeof(score) == 'undefined'){
    setScore(0);
  }

  // SOURCE: Used for getting data from API
  // Section: Calling Styles: REST JavaScript
  // https://developers.google.com/books/docs/v1/getting_started
  
  // Fetches book data from API, takes averageRating and sets score to it. 
  useEffect(() => {
    const fetchBookTitle = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setScore(bookData.averageRating);
      } catch (error) {
        console.error(error);
      }
    };
    if(isbn != null){
      fetchBookTitle();
    }
  }, [isbn]);

  let _stars = [];
  let _scorefloor = Math.floor(score)     // Taking floor of number to display intuitive amount of stars

  // Pushing filled in stars
  for (let i = 0; i < _scorefloor; i++){
    _stars.push(<AntDesign name="star" key={i} size={24} color="#FFE75C" />)
  }

  // Pushing unfilled stars
  for (let j = 0; j < 5 - _scorefloor; j++){
    _stars.push(<AntDesign name="star" key={(j+1)*-1} size={24} color="gray" />)
  }

  // Returns stars for displaying rating
  return _stars;
};

// Takes in a score, fills array with star icons and returns smaller display of rating
const UserRatingToStar = ({_score}) => {
  
  let _stars = [];
  let _scorefloor = Math.floor(_score)    // Taking floor of number to display intuitive amount of stars
  
  // Pushing filled in stars
  for (let i = 0; i < _scorefloor; i++){
    _stars.push(<AntDesign name="star" key={i} size={20} color="#FFE75C" />)
  }

  // Pushing unfilled stars
  for (let j = 0; j < 5-_scorefloor; j++){
    _stars.push(<AntDesign name="star" key={(j+1)*-1} size={20} color="gray" />)
  }

  // Returns stars for displaying rating
  return _stars;
};

// Same as UserRatingToStar, with larger stars
const RatingToStar = ({_score}) => {
  if(typeof(_score) == 'undefined'){
    _score = 0;
  }

  let _stars = [];
  let _scorefloor = Math.floor(_score)
  
  for (let i = 0; i < _scorefloor; i++){
    _stars.push(<AntDesign name="star" key={i} size={24} color="#FFE75C" />)
  }
  for (let j = 0; j < 5-_scorefloor; j++){
    _stars.push(<AntDesign name="star" key={(j+1)*-1} size={24} color="gray" />)
  }

  return _stars;
};

export {
  BookRatingToStar, UserRatingToStar, RatingToStar}