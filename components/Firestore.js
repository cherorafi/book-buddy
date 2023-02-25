import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'

// Provides a flatlist of all User Info
const GetAllUserData = () => {
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection('users');

  useEffect(() => {
    todoRef
    .onSnapshot(
      querySnapshot => {
        const users = []
        querySnapshot.forEach((doc) => {
          const { email, firstName, lastName } = doc.data()
          users.push({
            id: doc.id,
            email,
            firstName,
            lastName,
          })
        })
        setUsers(users)
      }
    )
  }, [])

  return (
    <View style = {{ flex: 1, marginTop: 100}}>
      <FlatList
        style={{height:'100%'}}
        data={users}
        numColumns={1}
        renderItem={({item}) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.email}</Text>
              <Text style={styles.itemText}>{item.firstName} {item.lastName}</Text>
              <Text style={styles.itemText}>UserId: {item.id}</Text>
            </View>
          </Pressable>
        )}
      >

      </FlatList>
    </View>
  )

}

// Provides a text of current user's first Name
const GetName = () => {
  const [name, setName] = useState('')

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data())
      }
      else {
        console.log('User does not exist')
      }
    })
  }, [])

  return (
    <Text>{name.firstName}</Text>
  )

}

// Provides a text of current user's last Name
const GetLastName = () => {
  const [name, setName] = useState('')

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data())
      }
      else {
        console.log('User does not exist')
      }
    })
  }, [])

  return (
    <Text>{name.lastName}</Text>
  )

}

// Provides a text of current user's email
const GetEmail = () => {
  const [name, setName] = useState('')

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data())
      }
      else {
        console.log('User does not exist')
      }
    })
  }, [])

  return (
    <Text>{name.email}</Text>
  )

}

export {
  GetAllUserData,
  GetName,
  GetLastName,
  GetEmail
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innerContainer:{
    alignContent: 'center',
    flexDirection: 'column',
  },
  itemHeading:{
    fontWeight: 'bold',
  },
  itemText:{
    fontWeight: '300'
  }
});