/*
This component handles the front and backend of adding a book to a reading list
It provides a view of a button, which opens a popup view of reading lists, 
once a list is selected, it communicates with the DB to make the changes.
*/

import React, {useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AddBooks } from './Firestore';
import { GetUserData } from './Database';


const AddBook = (bookName) => {
    // Initalizing the popup view/Modal
    const [modalVisible, setModalVisible] = useState(false);

    // Getting the user's reading lists
    const userInfo = GetUserData();
    const myList = Object.keys(userInfo.bookLists);

    // Function to handle DB communication
    const listPress = (item) => {
        AddBooks(item, bookName);
        setModalVisible(!modalVisible);
    }
  
    return (
    <View>
      {/* Creates a popup view which is hidden until button is pressed */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible);}}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                {/* Using the user's reading list, maps each element as a pressable text
                which is binded to the listPress function that handles the backend */}
                { myList.map((item, key)=>(
                  <Text key={key} style={styles.listName} onPress={listPress.bind(this, item)}>{item}</Text>
                ))}
            </View>
            
            {/* Cancel button to exit the popup view without making changes */}
            <Pressable style={styles.cancelButton} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      {/* Button to open the popup view, and the inital component view when being imported */}
      <Pressable style={styles.addToListButton} onPress={() => setModalVisible(true)}>
        <Entypo name="add-to-list" size={23} color="black" />
      </Pressable>
    </View>
    )
}

export default AddBook;

const styles = StyleSheet.create({
    modalContent: {
      flex: 1,
      margin: 20 
    },
    
    listName:{
      fontSize : 27,
      textAlign: 'center',
    },

    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },

    modalContainer: {
      marginTop: 100,
      marginBottom: 100,
      backgroundColor: '#EEEEEE',
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 10,
    },

    cancelButton: {
      borderRadius: 12,
      padding: 5,
      margin: 10,
      backgroundColor: 'lightgrey'
    },

    cancelText: {
      alignItems: 'center', 
      justifyContent: 'center', 
      fontSize: 23
    },

    addToListButton: {
      borderRadius: 25,
      padding: 12,
      elevation: 2,
  }
});
