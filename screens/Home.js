import { Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Button, Modal, TextInput, View } from 'react-native';
import BookListCard from '../components/BookListCard';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Ionicons, Entypo  } from '@expo/vector-icons';
import { CreateBookList } from '../components/Firestore';
import { GetUserData } from '../components/Database';


const Home = () => {
  const userInfo = GetUserData();
  const bookLists = Object.keys(userInfo.bookLists);

  const data = bookLists.map((key, index) => {
    let title = key.charAt(0).toUpperCase() + key.slice(1);
    return { key, title };
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

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
    onModalClose();
    setTextInputValue('');
  };

  const navigation = useNavigation();
  return (

    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.addListButton}>
          <Ionicons name="add" size={25}
              onPress={onModalOpen} />
          <Text style={styles.addListText} onPress={onModalOpen}>Create List</Text>
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => <BookListCard heading={item.title} identity={item.key} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      
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
