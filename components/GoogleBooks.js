import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

/* 
  **READ**
  See bottom for how to call including example code
  Functionality of each will be explained at the top of each function
  All of these require isbn to be called
  Error cases have not been handled yet! I will add those later
*/

const BookTitle = ({ isbn }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchBookTitle = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setTitle(bookData.title);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookTitle();
  }, [isbn]);

  return title;
};

const BookAuthor = ({ isbn }) => {
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchBookAuthor = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setAuthor(bookData.authors[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookAuthor();
  }, [isbn]);

  return author;
};

const BookPages = ({ isbn }) => {
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchBookTitle = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setAuthor(bookData.pageCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookTitle();
  }, [isbn]);

  return author;
};

const BookRating = ({ isbn }) => {
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchBookTitle = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setAuthor(bookData.averageRating);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookTitle();
  }, [isbn]);

  return author;
};

const BookImageLink = ({ isbn }) => {
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchBookTitle = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookData = response.data.items[0].volumeInfo;
        setAuthor(bookData.imageLinks.thumbnail);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookTitle();
  }, [isbn]);

  return author;
};

const BookCover = ({ isbn }) => {
  const [bookCover, setBookCover] = useState('');

  useEffect(() => {
    const fetchBookCover = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
        );
        const data = await response.json();
        const bookCoverUrl =
          data.items[0].volumeInfo.imageLinks.thumbnail ||
          data.items[0].volumeInfo.imageLinks.smallThumbnail;
        setBookCover(bookCoverUrl);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookCover();
  }, [isbn]);

  return (
    <View style={styles.container}>
      {bookCover ? (
        <Image style={styles.image} source={{ uri: bookCover }} />
      ) : null}
    </View>
  );
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
  BookTitle,
  BookAuthor,
  BookPages,
  BookRating,
  BookImageLink,
  BookCover
}

/* 
  BookTitle
  <Text>Title is {<BookTitle isbn="9780451524935" />}</Text>

  BookAuthor
  <Text>Author is {<BookAuthor isbn="9780451524935" />}</Text>

  BookPages
  <Text>Rating is {<BookRating isbn="9780451524935" />}</Text>

  BookRating
  <Text>Page count is {<BookPages isbn="9780451524935" />}</Text>

  BookImageLink
  <Text>Book cover link is {<BookImageLink isbn="9780451524935" />}</Text>

  BookCover
  <BookCover isbn="9780451524935"/>
*/