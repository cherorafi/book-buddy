import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';


const BookRatingToStar = ({ isbn } = null, score = 5) => {
  const [score, setScore] = useState(5);

  useEffect(() => {
    const fetchBookTitle = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setScore(bookData.averageRating);
      } catch (error) {
        //console.error(error);
      }
    };
    if (isbn != null){
      fetchBookTitle();
    }
  }, [isbn]);
  let stars = [];
  let scorefloor = Math.floor(score)
  // console.log(scorefloor)
  for (let i = 0; i < scorefloor; i++){
    stars.push(<AntDesign name="star" key={i} size={24} color="#FFE75C" />)
  }
  for (let j = 0; j < 5-scorefloor; j++){
    stars.push(<AntDesign name="star" key={(j+1)*-1} size={24} color="gray" />)
  }

  return stars;
};

const UserRatingToStar = ({starClicked}) => {
  let stars = [];
  let scorefloor = Math.floor(starClicked)
  // console.log(scorefloor)
  for (let i = 0; i < scorefloor; i++){
    stars.push(<AntDesign name="star" key={i} size={12} color="#FFE75C" />)
  }
  for (let j = 0; j < 5-scorefloor; j++){
    stars.push(<AntDesign name="star" key={(j+1)*-1} size={12} color="gray" />)
  }

  return stars;
};

const ClickableStars = () => {
  let stars = [];
  for (let j = 0; j < 5; j++){
    stars.push(
      <TouchableOpacity onPress={() => handleStarSelection()}>
        <AntDesign name="star" key={j} size={12} color="gray" />
      </TouchableOpacity>
      )
  }

  return stars;
}

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
  BookRatingToStar, UserRatingToStar, ClickableStars}