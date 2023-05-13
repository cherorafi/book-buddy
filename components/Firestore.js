import React, { useState, useEffect } from 'react'
import { firebase } from '../config'

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

// @Param takes in a book list name
// Returns an array of ISBNs of the books in that book list
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

// @Param a string of the book list name, and a string of the isbn of a book
// Removes the book from that list
const DeleteBook = (listName, isbn) => {
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
    [`${listName}.${isbn}`] : firebase.firestore.FieldValue.delete(),
    [`bookLists.${listName}`]: firebase.firestore.FieldValue.increment(-1)
  });

}


/*******
        IMPORTANT READ IF FUNCTIONS BELOW ARE NOT WORKING ACCORDINGLY
        May need to be adjusted based on how the paramaters are being passed in
*******/

// @Param takes in a book isbn and a string of the user review of that book
// Can be used to add or update a review of the book
const AddReview = (bookId, review) => {
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
    docRef.get().then((doc) => {
    if (doc.exists) {
        firebase.firestore().collection('books')
        .doc(bookId)
        .update({
          [`reviews.${firebase.auth().currentUser.uid}`] : `${review}`
          });

    } else {
        firebase.firestore().collection('books')
        .doc(bookId)
        .set({
          reviews: { [`${firebase.auth().currentUser.uid}`] : `${review}`}
        });
    }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
}

// @Param takes in a book isbn
// Returns a map of all the reviews of a single book, each key being the userID
// And the corresponding value is the review from the userID
const GetReviews = (bookId) => {
  console.log("BOOKID: ", bookId);
  const nameRef = firebase.firestore().collection('books')
  .doc(bookId)

  const [myData, setData] = useState("");
  
  const observer = nameRef.onSnapshot(docSnapshot => {
    setData(docSnapshot.data().reviews);
  }, err => {
    console.log(`Encountered error: ${err}`);
    setData("Error");
  });

  if (myData != ""){
    observer()
    return(myData);
  }
  
  return({
    "Loading": "Loading"
    });;
}

// @Param takes in a book isbn
// Delete review of the book
const DeleteReview = (bookId) => {
  firebase.firestore().collection('books')
  .doc(bookId)
  .update({
    [`reviews.${firebase.auth().currentUser.uid}`] : firebase.firestore.FieldValue.delete()
  });
}

//--------------------------------In-APP SCORING----------------------

const AddScore = (bookId, score) => {
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
    docRef.get().then((doc) => {
    if (doc.exists) {
        firebase.firestore().collection('books')
        .doc(bookId)
        .update({
          [`scores.${firebase.auth().currentUser.uid}`] : `${score}`
          });

    } else {
        firebase.firestore().collection('books')
        .doc(bookId)
        .set({
          scores: { [`${firebase.auth().currentUser.uid}`] : `${score}`}
        });
    }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
}

const GetScore = (bookId) => {
  console.log("BOOKID: ", bookId);
  const nameRef = firebase.firestore().collection('books')
  .doc(bookId)

  const [myData, setData] = useState("");
  
  const observer = nameRef.onSnapshot(docSnapshot => {
    setData(docSnapshot.data().scores);
  }, err => {
    console.log(`Encountered error: ${err}`);
    setData("Error");
  });

  if (myData != ""){
    observer()
    return(myData);
  }
  
  return({
    "Loading": "Loading"
    });;
}

const DeleteScore = (bookId) => {
  firebase.firestore().collection('books')
  .doc(bookId)
  .update({
    [`scores.${firebase.auth().currentUser.uid}`] : firebase.firestore.FieldValue.delete()
  });
}

export {
  // All Get Funcs
  GetBooks,
  GetReviews,
  GetScore,

  // All Update Funcs
  ChangeFirstName,
  ChangeLastName,
  ChangeEmail,
  ChangePass,

  // All Create Funcs
  CreateBookList,
  AddBooks,
  AddReview,
  AddScore,

  // All Delete Funcs
  DeleteReview,
  DeleteBook,
  DeleteScore,
}