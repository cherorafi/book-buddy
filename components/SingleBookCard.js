import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import { BookAuthor, BookTitle, BookCover } from './GoogleBooks';
import { DeleteBook } from './Firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SingleBookCard = ({ listName, isbn }) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const deleteBook = () => {
    DeleteBook(listName, isbn);
    setConfirmModalVisible(false);
  }

  const navigation = useNavigation();

  const fetchBookAndNavigate = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      const bookData = response.data.items[0];
      navigation.navigate('BookView', { isbn: bookData.volumeInfo.industryIdentifiers.find((identifier) => identifier.type === 'ISBN_13').identifier });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
       <Ionicons name="trash-outline" size={25} style={styles.deleteListButton} onPress={() => setConfirmModalVisible(true)} />
      <Modal
      animationType="slide"
      transparent={true}
      visible={confirmModalVisible}
>
  <View style={styles.modalContainer}>
    <View style={styles.boxModal}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Are you sure you want to delete this book?</Text>
      </View>
      <View style={styles.modalButtons}>
        <Pressable style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={deleteBook}>
          <Text style={[styles.modalButtonText, { color: 'white' }]}>Delete</Text>
        </Pressable>
        <Pressable style={[styles.modalButton, { backgroundColor: 'blue' }]} onPress={() => setConfirmModalVisible(false)}>
          <Text style={[styles.modalButtonText, { color: 'white' }]}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>

      
   <TouchableOpacity onPress={() => fetchBookAndNavigate()}>  
        <View style={styles.bookContainer} >
          <BookCover isbn={isbn}></BookCover>
          <View style={styles.bookDetails}>
            <Text style={styles.title}><BookTitle isbn={isbn}></BookTitle></Text>
            <Text style={styles.author}><BookAuthor isbn={isbn}></BookAuthor></Text>
          </View>
        </View>
      </TouchableOpacity>
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
  deleteListButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    color: 'red',
    marginRight: 8,
    marginTop: 8,
    
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '70%'
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  modalButton: {
    borderRadius: 5,
    padding: 8,
    width: '45%',
    alignItems: 'center'
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
  
})
