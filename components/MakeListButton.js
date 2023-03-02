import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { firebase } from '../config'


const CreateList= () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [listName, setName] = useState("Default");

    const create = () => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
            bookList: firebase.firestore.FieldValue.arrayUnion(listName)
        })
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

            <TextInput 
                style={{height: 40, margin: 12, borderWidth: 1, padding: 10,}}
                placeholder="Enter reading list name"
                placeholderTextColor="lightgrey"
                onChangeText={(val) => setName(val)}
                
            />
                

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

                <Pressable
                    style={{
                        borderRadius: 12,
                        padding: 5,
                        margin: 10,
                        backgroundColor: 'lightgreen'
                    }}
                    onPress={() => create()}>
                <Text style={{alignItems: 'center', justifyContent: 'center', fontSize: 18}}>Create</Text>
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
        <Text>Create a reading list</Text>
      </Pressable>
    </View>
    )
}

export default CreateList;