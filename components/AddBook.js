import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { firebase } from '../config'
import { GetAllLists } from './Firestore';


const AddBook = (bookName) => {
    const [modalVisible, setModalVisible] = useState(false);

    const myList = GetAllLists();

    const SampleFunction = (item) => {
        //console.log(item);
        //console.log(bookName);

        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection(item).add(
          bookName,
        );

        setModalVisible(!modalVisible);
    }
      

    return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        }}>
          <View style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            transparent: true,
          }}>

            <View style={styles.MainContainer}>
            
                { myList.map((item, key)=>(
                <Text key={key} style={styles.TextStyle} onPress={ SampleFunction.bind(this, item) }> { item } </Text>)
            )}

            </View>
                

            <View style={{ flexDirection:"row", margin:15 }}>
                <Pressable
                    style={{
                        borderRadius: 12,
                        padding: 5,
                        margin: 10,
                        backgroundColor: 'lightgrey'
                    }}
                    onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{alignItems: 'center', justifyContent: 'center', fontSize: 18}}>Cancel</Text>
                </Pressable>

            </View>

          </View>
        </View>
      </Modal>
      <Pressable
        style={{
            borderRadius: 25,
            padding: 10,
            elevation: 2,
        }}
        onPress={() => setModalVisible(true)}>
        <Text>Add Book</Text>
      </Pressable>
    </View>
    )
}

export default AddBook;

const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
      margin: 10
      
    },
    
    TextStyle:{
      fontSize : 25,
       textAlign: 'center'
    }
    
});