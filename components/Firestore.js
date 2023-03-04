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

const GetFirstName = () => {
  const nameRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myFirstName, setFirstName] = useState("Loading...");

  const observer = nameRef.onSnapshot(docSnapshot => {
    setFirstName(docSnapshot.data().firstName);
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
    setFirstName("Error");
  });

  return (myFirstName);
  
}

// Provides a string of current user's last Name
const GetLastName = () => {
  const nameRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myLastName, setLastName] = useState("");

  const observer = nameRef.onSnapshot(docSnapshot => {
    setLastName(docSnapshot.data().lastName)
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
    setLastName("Error")
  });

  return (myLastName);
  
}

// Provides a string of current user's email
const GetEmail = () => {
  const emailRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myEmail, setEmail] = useState("Loading...");

  const observer = emailRef.onSnapshot(docSnapshot => {
    setEmail(docSnapshot.data().email)
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
    setEmail("Error")
  });

  return (myEmail);
  
}

const GetAllLists = () => {
  const listRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myBookList, setBookList] = useState("");

  const observer = listRef.onSnapshot(docSnapshot => {
    setBookList(docSnapshot.data().bookList)
    // ...
  }, err => {
    setBookList(["Error"])
    console.log(`Encountered error: ${err}`);
  });

  
  if (myBookList != ""){
    observer()
    return(myBookList);
  }
  
  return (["Loading"]);
  
}

export {
  GetAllUserData,
  GetLastName,
  GetEmail,
  GetAllLists,
  GetFirstName,
}

// Styling for listed data
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
