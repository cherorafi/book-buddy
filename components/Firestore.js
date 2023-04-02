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

// Provides a string of the current user's first name
const GetFirstName = () => {
  const nameRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myFirstName, setFirstName] = useState("");

  const observer = nameRef.onSnapshot(docSnapshot => {
    setFirstName(docSnapshot.data().firstName);
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
    setFirstName("Error");
  });

  if (myFirstName != ""){
    observer()
    return(myFirstName);
  }
  
  return ("Loading...");
  
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

  if (myLastName != ""){
    observer()
    return(myLastName);
  }
  
  return ("");
}

// Provides a string of current user's email
const GetEmail = () => {
  const emailRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myEmail, setEmail] = useState("");

  const observer = emailRef.onSnapshot(docSnapshot => {
    setEmail(docSnapshot.data().email)
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
    setEmail("Error")
  });

  if (myEmail != ""){
    observer()
    return(myEmail);
  }
  
  return ("Loading...");
}

// Provides an array of all reading lists by the user
const GetAllLists = () => {
  const listRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myBookList, setBookList] = useState("");

  const observer = listRef.onSnapshot(docSnapshot => {
    setBookList(Object.keys(docSnapshot.data().bookLists))
    // ...
  }, err => {
    setBookList(["Error"])
    console.log('Encountered error: ${err}');
  });

  
  if (myBookList != ""){
    observer()
    return(myBookList);
  }
  
  return (["Loading"]);
  
}

// @Param takes a listName, returns # of books in list
const GetNumOfBooksInList = (listName) => {
  const listRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [bookCount, setBookCount] = useState("");

  const observer = listRef.onSnapshot(docSnapshot => {
    const map = docSnapshot.data().bookLists
    const map2 = new Map(Object.entries(map));

    setBookCount(map2.get(listName))
    // ...
  }, err => {
    setBookCount(["Error"])
    console.log('Encountered error: ${err}');
  });

  
  if (bookCount != ""){
    observer()
    return(bookCount);
  }
  
  return ("Loading");
}

// Provides a map of names of reading lists and keys as the
// Number of books in that reading list
const GetBookListMap = () => {
  const listRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [BookList, setBookList] = useState ("");

  const observer = listRef.onSnapshot(docSnapshot => {
    setBookList(docSnapshot.data().bookLists)
  }, err => {
    setBookList({"Error" : 0})
    console.log('Encountered error: ${err}');
  })

  if (BookList != ""){
    observer();
    return(BookList);
  }

  return({"Loading": 0})
}

// @Param takes a string, changes the user's first name
const ChangeFirstName = (newName) => {
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
      firstName: newName
  })
}

// @Param takes a string, changes the user's last name
const ChangeLastName = (newName) => {
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
      lastName: newName
  })
}

// @Param takes a string, changes the user's email
const ChangeEmail = (newEmail) => {
  firebase.auth().currentUser.updateEmail(newEmail)
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
      email: newEmail
  })
}

// @Param takes a string, changes the user's pass
const ChangePass = (newPass) => {
  firebase.auth().currentUser.updatePassword(newPass)
}

// @Param takes a string list name, and makes a new list
const CreateBookList = (listName) => {
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
    [`bookLists.${listName}`]: 0
  })

  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
    [`${listName}`]: {"Initialize":"List"}
  })
}

// @Param takes a book list name, and a bookID (used to find info from Google Books API)
// Adds the book to the user's book list
// Adds the book to the book collections if it already didnt exist b4
const AddBooks = (listName, isbn) => {
  const bookId = isbn.bookName
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
    docRef.get().then((doc) => {
    if (doc.exists) {
        // Exists
        // Add book ref into book list
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
            [`${listName}.${bookId}`]: firebase.firestore.FieldValue.serverTimestamp(),
            [`bookLists.${listName}`]: firebase.firestore.FieldValue.increment(1)
        })
    } else {
        // doc.data() will be undefined in this case
        // create the new book doc
        // which will hold empty reviews
        firebase.firestore().collection('books')
        .doc(bookId)
        .set({
          reviews: {}
        });

        // Add book ref into book list
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
            [`${listName}.${bookId}`]: firebase.firestore.FieldValue.serverTimestamp(),
            [`bookLists.${listName}`]: firebase.firestore.FieldValue.increment(1) 
        })


    }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
}

const GetBooks = (bookListName) => {
  const listRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myBookList, setBookList] = useState("");

  const observer = listRef.onSnapshot(docSnapshot => {
    const map = docSnapshot.data()[bookListName];
    try {
      const mapKeys = Object.keys(map);
      setBookList(mapKeys);
    } catch(error){

    }
    // ...
  }, err => {
    setBookList(["Error"])
    console.log('Encountered error: ${err}');
  });

  
  if (myBookList != ""){
    observer()
    return(myBookList);
  } 
  return (["Loading"]);
}

export {
  // All Get Funcs
  GetAllUserData,
  GetLastName,
  GetEmail,
  GetAllLists,
  GetFirstName,
  GetBookListMap,
  GetNumOfBooksInList,
  GetBooks,

  // All Update Funcs
  ChangeFirstName,
  ChangeLastName,
  ChangeEmail,
  ChangePass,

  // All Create Funcs
  CreateBookList,
  AddBooks,

  // Future
  /*
  DeleteList
  ChangeListName
  DeleteBook
  AddReview
  EditReview
  DeleteReview
  AddSummary
  EditSummary
  DeleteSummary
  */
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
