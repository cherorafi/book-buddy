import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

const SingleBookCard = ({book}) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.navBar}>
        <Text style={styles.heading}>Want To Read</Text>
      </View> */}
      <View style={styles.bookContainer}>
        <Image source={book.coverImage} style={styles.coverImage} />
        <View style={styles.bookDetails}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
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
  },
  author: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
  },
})
