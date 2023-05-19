import { Text, StyleSheet, SafeAreaView, ScrollView, Button, Modal, TextInput, View } from 'react-native';
import BookListCard from '../components/BookListCard';
import React, { useState, useEffect } from 'react';
import { Ionicons, Entypo  } from '@expo/vector-icons';
import { CreateBookList } from '../components/Firestore';
import { useContext } from 'react';
import ColorSchemeContext from './../ColorSchemeContext';

import { firebase } from '../config'

//setter function
const Home = () => {
  const [bookLists, setBookLists] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid) 
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        try{
        if (data && data.bookLists) {
         {/* organizes book lists and its books} /> */}
          const bookListsData = Object.entries(data.bookLists).map(([bookListName, books]) => ({
            bookListName,
            books: Object.entries(data[bookListName]).map(([isbn, timestamp]) => ({
              isbn,
              timestamp,
            })),
          })
          );
          setBookLists(bookListsData);
        } else {
          setBookLists([]);
        }
      }catch(error){}
      });

    return () => {
      unsubscribe();
    };
  }, []);


//declares state variables
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const { colorScheme } = useContext(ColorSchemeContext);

  //functions to open,close,text input and submit form
  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onTextInputChange = (text) => {
    setTextInputValue(text);
  };

  const onFormSubmit = () => {
    CreateBookList(textInputValue);

    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
      [`${textInputValue}.Initialize`] : firebase.firestore.FieldValue.delete(),
    });

    onModalClose();
    setTextInputValue('');
  };

  return (
//renders the add list button
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5' }]}>
      <View>
      <View style={[styles.addListButton, {backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5'}]}>
      <Ionicons name="add" size={25} style={[{color: colorScheme === 'dark' ? 'white' : 'black'}]}
            onPress={onModalOpen} />
          <Text style={[styles.addListText, {color: colorScheme === 'dark' ? 'white' : 'black'}]} onPress={onModalOpen}>Create List</Text>
      </View>
      {/* displays a list of book list} /> */}
      <ScrollView vertical showsVerticalScrollIndicator={false} style={{marginBottom: 45}}>
        {bookLists.map(bookList => (
          <BookListCard key={bookList.bookListName} bookListName={bookList.bookListName} books={bookList.books} />
        ))}
      </ScrollView>

      </View>

     {/* renders the create list text box} /> */} 
      {isModalVisible && (
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <Entypo  name="cross" size={28} style={styles.icon}
              onPress={onModalClose} />
            <TextInput
              style={styles.textInput}
              value={textInputValue}
              onChangeText={onTextInputChange}
              placeholder="List name"
            />

            <Button title="Create List" onPress={onFormSubmit} />
          </View>

          <View style={styles.modalOverlay} onTouchEnd={onModalClose} />
        </View>
      )}
      
      
    </SafeAreaView>

  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    width: '100%',
  },
  addListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#f5f5f0',
    padding: 10,
    borderRadius: 5,
  },
  addListText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 1,
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'black',
  },
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalInner: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
    zIndex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 60,
    color: 'black'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#7d7d78',
    opacity: 0.5,
  },
  icon: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  }
})

