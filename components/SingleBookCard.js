import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { BookAuthor, BookTitle, BookCover } from './GoogleBooks';
const SingleBookCard = ({ isbn }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bookContainer}>
        <BookCover isbn={isbn}></BookCover>
        <View style={styles.bookDetails}>
          <Text style={styles.title}><BookTitle isbn={isbn}></BookTitle></Text>
          <Text style={styles.author}><BookAuthor isbn={isbn}></BookAuthor></Text>
        </View>
      </View>
    </View>
  );
};

export default SingleBookCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  navBar: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  icon: {
    padding: 8,
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  coverImage: {
    width: 64,
    height: 96,
    marginRight: 16,
  },
  bookDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 8,
  },
  author: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
    marginLeft: 8,
  },
})
