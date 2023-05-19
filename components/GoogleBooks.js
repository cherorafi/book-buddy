/*
This file contains a handful of components
created by using the Google Books API
It handles the backend API call and the front end view

Overall source for Google Books API: https://www.youtube.com/watch?v=rePmjVVjv4A
Shows how to make HTTP requests & how to handle the data
*/

import React, { useState, useEffect } from 'react';
import { View,  StyleSheet, Image,} from 'react-native';
import axios from 'axios';

// Takes in an ISBN of a book
// Returns a Component displaying the book title
const BookTitle = ({ isbn }) => {
  const [title, setTitle] = useState('');

  // The effect hook allows the componenet to re render after every update
  useEffect(() => {
    // Creates a function to make the API call
    const fetchBookTitle = async () => {
      // Makes the request and sets the response to the title
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setTitle(bookData.title);
      } catch (error) {}
    };
    // Calls the function at each re render
    fetchBookTitle();
  }, [isbn]);

  return title;
};

// Takes in an ISBN of a book
// Returns a Component displaying the book's author
const BookAuthor = ({ isbn }) => {
  const [author, setAuthor] = useState('');

  // The effect hook allows the componenet to re render after every update
  useEffect(() => {
    // Creates a function to make the API call
    const fetchBookAuthor = async () => {
      // Makes the request and sets the response to the (first) author
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setAuthor(bookData.authors[0]);
      } catch (error) {}
    };
    // Calls the function at each re render
    fetchBookAuthor();
  }, [isbn]);

  return author;
};

// Takes in an ISBN of a book
// Returns a Component displaying the book's page count
const BookPages = ({ isbn }) => {
  const [pages, setPages] = useState('');

  // The effect hook allows the componenet to re render after every update
  useEffect(() => {
    // Creates a function to make the API Call
    const fetchBookPages = async () => {
      // Makes the request and sets the response to the book's page count
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setPages(bookData.pageCount);
      } catch (error) {}
    };
    // Calls the function at each re render
    fetchBookPages();
  }, [isbn]);

  return pages;
};

// Takes in an ISBN of a book
// Returns a Component displaying the book's rating by readers (Scale of 5)
const BookRating = ({ isbn }) => {
  const [rating, setRating] = useState('');

  // The effect hook allows the componenet to re render after every update
  useEffect(() => {
    // Creates a function to make the API Call
    const fetchBookRating = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setRating(bookData.averageRating);
      } catch (error) {
        return 0;
      }
    };
    // Calls the function at each re render
    fetchBookRating();
  }, [isbn]);

  return rating;
};

// Takes in an ISBN of a book
// Returns a Component displaying the image of the books cover 
const BookCover = ({ isbn }) => {
  const [bookCover, setBookCover] = useState('');

  // The effect hook allows the componenet to re render after every update
  useEffect(() => {
    // Creates a function to make the API Call
    const fetchBookCover = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
        );
        const data = await response.json();
        // Takes whichever thumbnail is available
        const bookCoverUrl =
          data.items[0].volumeInfo.imageLinks.thumbnail ||
          data.items[0].volumeInfo.imageLinks.smallThumbnail;
        setBookCover(bookCoverUrl);
      } catch (error) {}
    };
    // Calls the function at each re render
    fetchBookCover();
  }, [isbn]);

  // Returns an image component with the source of the thumbnail link
  // With a default styling of width 160, height 230
  return (
    <View style={styles.imageContainer}>
      {bookCover ? (
        <Image style={styles.image} source={{uri: bookCover}}/>
      ) : null}
    </View>
  );
};

// Takes in an ISBN of a book
// Returns a Component displaying the book's description
const BookDescription = ({ isbn }) => {
  const [description, setDescription] = useState('');

  // The effect hook allows the componenet to re render after every update
  useEffect(() => {
    // Creates a function to make the API Call
    const fetchBookDescription = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setDescription(bookData.description);
      } catch (error) {}
    };
    fetchBookDescription();
  }, [isbn]);

  return description;
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 160,
    height: 230,
  },
});

export {
  BookTitle,
  BookAuthor,
  BookPages,
  BookRating,
  BookCover,
  BookDescription
}