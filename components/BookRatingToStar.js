import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';


const BookRatingToStar = ({ isbn } = null) => {
  const [score, setScore] = useState();
  if(typeof(score) == 'undefined'){
    setScore(0);
  }

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
  let _scorefloor = Math.floor(score)

  for (let i = 0; i < _scorefloor; i++){
    _stars.push(<AntDesign name="star" key={i} size={24} color="#FFE75C" />)
  }
  for (let j = 0; j < 5 - _scorefloor; j++){
    _stars.push(<AntDesign name="star" key={(j+1)*-1} size={24} color="gray" />)
  }

  return _stars;
};

const UserRatingToStar = ({_score}) => {
  console.log("Scxore: ", _score)
  let _stars = [];
  let _scorefloor = Math.floor(_score)
  
  for (let i = 0; i < _scorefloor; i++){
    _stars.push(<AntDesign name="star" key={i} size={20} color="#FFE75C" />)
  }
  for (let j = 0; j < 5-_scorefloor; j++){
    _stars.push(<AntDesign name="star" key={(j+1)*-1} size={20} color="gray" />)
  }

  return _stars;
};

const RatingToStar = ({_score}) => {
  if(typeof(_score) == 'undefined'){
    _score = 0;
  }

  let _stars = [];
  let _scorefloor = Math.floor(_score)
  // console.log(scorefloor)
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