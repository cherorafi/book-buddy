/* 
This file contains a handful of CRUD functions
that can be used to communicate with the Firestore database
involving the 2 collections users and books 
*/
import { useState } from 'react'
import { firebase } from '../config'

/* 
Returns the logged in user's entire document
from the users collection in the form of a map
with each field being accessible through dot notation
*/
const GetUserData = () => {
  // Sets the name reference with the current user's user ID
  const nameRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  // Utilizing hooks to store changing data
  const [myData, setData] = useState("");
  
  // Fetches the data from Firestore using a subscriber
  const observer = nameRef.onSnapshot(docSnapshot => {
    setData(docSnapshot.data());
  }, err => {
    console.log(`Encountered error: ${err}`);
    setData("Error");
  });

  // Checks if the data isn't empty, if not unsubscribes and returns
  if (myData != ""){
    observer()
    return(myData);
  }
  
  // Until data is found, a default map is sent to the View with preloaded data
  return({
    age: "Loading",
    bookLists: {"Loading": 0, "Finished": 0},
    email: "Loading",
    firstName: "Loading",
    lastName: "",
    loc: "Loading",
    phoneNum: "Loading",
    username: "Loading",
    Loading: ["Loading"],
    });;
}

// Takes in a string and updates the User's first Name
const ChangeFirstName = (newName) => {
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
      firstName: newName
  })
}

// Takes in a string and updates the User's last name
const ChangeLastName = (newName) => {
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
      lastName: newName
  })
}

// Takes in a string and updates the user's email
const ChangeEmail = (newEmail) => {
  // Updates Firebase auth before updating Firestore
  firebase.auth().currentUser.updateEmail(newEmail)
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
      email: newEmail
  })
}

// Takes in a string and updates the user's password
// Only updates Firebase auth as passwords are not stored in Firestore
const ChangePass = (newPass) => {
  firebase.auth().currentUser.updatePassword(newPass)
}

// Takes in a string and creates a reading list with that name
const CreateBookList = (listName) => {
  // Updates the bookLists field with a new key-value pair
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
    [`bookLists.${listName}`]: 0
  })

  // Creates a new document field of a map type
  // with the list name given and a default value
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
    [`${listName}`]: {"Initialize":"List"}
  })

}

// Takes in 2 strings, a list name and a isbn of a book
// Adds the book of that isbn to that list
const AddBooks = (listName, isbn) => {
  const bookId = isbn.bookName
  const docRef = firebase.firestore().collection('books').doc(bookId);

  // Tries to get the document from reference
  docRef.get().then((doc) => {
    // If the book document exists in the book collections 
    // Only updates the user's personal data
    if (doc.exists) {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
            [`${listName}.${bookId}`]: firebase.firestore.FieldValue.serverTimestamp(),
            [`bookLists.${listName}`]: firebase.firestore.FieldValue.increment(1)
        })

    // The book document does not exist in the books collection
    // Creates a book document first then updates the user's information
    } else {
        firebase.firestore().collection('books')
        .doc(bookId)
        .set({
          reviews: {},
          scores: {},
          total: 0,
          average: 0
        });

        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
            [`${listName}.${bookId}`]: firebase.firestore.FieldValue.serverTimestamp(),
            [`bookLists.${listName}`]: firebase.firestore.FieldValue.increment(1) 
        })


    }
  // Handles other errors
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

// Takes a list name and returns an array of
// All the ISBNs stored in that reading list
const GetBooks = (bookListName) => {
  const listRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myBookList, setBookList] = useState("");

  // Fetches the data from Firestore using a subscriber/listener
  const observer = listRef.onSnapshot(docSnapshot => {
    // Gets the document field with the book list name given
    const map = docSnapshot.data()[bookListName];

    // Converts the map stored to an array with just the ISBNs
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

  // Checks if the data found isn't empty, if not then unsubscribes and returns the data
  if (myBookList != ""){
    observer()
    return(myBookList);
  }

  // Until the data is found, returns a default array with the element Loading
  return (["Loading"]);
}

// Takes a reading list name and an ISBN from that list
// Deletes the book of that ISBN from the reading list
const DeleteBook = (listName, isbn) => {
  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .update({
    [`${listName}.${isbn}`] : firebase.firestore.FieldValue.delete(),
    [`bookLists.${listName}`]: firebase.firestore.FieldValue.increment(-1)
  });

}

// Takes in a ISBN of a book and a string review written by the user
// Can be used to add or update a review of the book
const AddReview = (bookId, review) => {
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
    docRef.get().then((doc) => {
    // If the book exists, updates the reviews field to add/edit the current review by the user
    if (doc.exists) {
        firebase.firestore().collection('books')
        .doc(bookId)
        .update({
          [`reviews.${firebase.auth().currentUser.uid}`] : `${review}`
          });
    
    // If the book document does not exist yet
    // Creates a book document of that ISBN in the books collection and adds the review
    } else {
        firebase.firestore().collection('books')
        .doc(bookId)
        .set({
          reviews: { [`${firebase.auth().currentUser.uid}`] : `${review}`}
        }, {merge: true});
    }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
}

// Takes in a string with a book ISBN, Returns a map of all the reviews of the book
// Each key is the user's ID and the corresponding value is the review
const GetReviews = (bookId) => {
  const nameRef = firebase.firestore().collection('books')
  .doc(bookId)

  const [myData, setData] = useState("");
  
  // Uses a subscriber/listner to fetch data
  const observer = nameRef.onSnapshot(docSnapshot => {
    try{
      setData(docSnapshot.data().reviews);
    // Handles instance where book selected in not in the books collection
    } catch (error){
      setData({
        "Loading": "Loading"
      });
    }
    
  }, err => {
    setData({
      "Loading": "Loading"
      });
  });

  // Once data is found, listener unsubscribes and the data is returned
  if (myData != ""){
    observer()
    return(myData);
  }
  
  // Until data is found returns a default map to show data is loading
  return({
    "Loading": "Loading"
    });;
}

// Takes in a string with a book ISBN
// Deletes the user's review of that book
const DeleteReview = (bookId) => {
  firebase.firestore().collection('books')
  .doc(bookId)
  .update({
    [`reviews.${firebase.auth().currentUser.uid}`] : firebase.firestore.FieldValue.delete()
  });
}


//SOURCE (*For all functions below using set() and merge:
// Section: Set a document
// https://firebase.google.com/docs/firestore/manage-data/add-data

//SOURCE (*For all functions below using update():
// Section: Update a document
// https://firebase.google.com/docs/firestore/manage-data/add-data

// Takes in book ISBN and score string
// Adds score to book's score field, as the value corresponding
// to user's ID
const AddScore = (bookId, score) => {
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
    docRef.get().then((doc) => {

    // If book document exists, and score for user exists, update value  
    if (doc.exists) {
        firebase.firestore().collection('books')
        .doc(bookId)
        .update({
          [`scores.${firebase.auth().currentUser.uid}`] : `${score}`
          });

    // If book document does not exist, score field does not exist. Creates a
    // score field with set(), with a merge set to true, so other existing fields 
    // are not replaced
    } else {
        firebase.firestore().collection('books')
        .doc(bookId)
        .set({
          scores: { [`${firebase.auth().currentUser.uid}`] : `${score}`}
        }, {merge: true});
    }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
}

//SOURCE (*For all functions below using observe/snapshot):
// https://firebase.google.com/docs/firestore/query-data/listen

// @Param takes in a book isbn
// Returns a map of all the scores of a single book, each key being the userID
// And the corresponding value is the score from the userID
const GetScores = (bookId) => {
  console.log("BOOKID: ", bookId);
  const nameRef = firebase.firestore().collection('books')
  .doc(bookId)

  const [myData, setData] = useState("");
  
  const observer = nameRef.onSnapshot(docSnapshot => {
    try{
      setData(docSnapshot.data().scores);
    } catch (error){
      setData({
        "Loading": "Loading"
        });
    }
    
  }, err => {
    setData({
      "Loading": "Loading"
      });
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
// Delete score of the book
const DeleteScore = (bookId) => {
  firebase.firestore().collection('books')
  .doc(bookId)
  .update({
    [`scores.${firebase.auth().currentUser.uid}`] : firebase.firestore.FieldValue.delete()
  });
}

// Takes in a book ISBN. If it does not have a document yet, it will
// create one, and set empty data fields for data storing
const BookCreation = (bookId) => {
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
    docRef.get().then((doc) => {
    if (doc.exists) {
      console.log("Document already exists.")
    } else {
      //if document does not exist, create one using the ISBN, and give it the necessary empty field
      firebase.firestore().collection('books')
      .doc(bookId)
      .set({
        reviews: {},
        scores: {},
        total: 0,
        average: 0
      });
    }
  }).catch((error) => {
      console.log("Error getting document:", error);
    });
}

// Takes in a user ID, gets data from the field firstName, and returns
// it.
const GetAuthor = (id) => {
  const docRef = firebase.firestore().collection('users')
  .doc(id);
  const [myData, setData] = useState("");
  
  // Listens for data
  const observer = docRef.onSnapshot(docSnapshot => {
    setData(docSnapshot.data().firstName);
  }, err => {
    console.log(`Encountered error: ${err}`);
    setData("Error");
  });

  //If data is not blank, return it
  if (myData != ""){
    observer()
    return(myData);
  }
  
  return (
    "Loading..."
    );;
}

// Takes in book ISBN, gpes into book document, and retrieves average rating 
const GetAverage = (bookId) => {
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);

  const [myData, setData] = useState("");
  
  const observer = docRef.onSnapshot(docSnapshot => {
    try{
      setData(docSnapshot.data().average);
    } catch(error){
      //  Returns 0 if average field is empty (no reviews/scores)
      return(0);
    }
    
  }, err => {
    console.log(`Encountered error: ${err}`);
    setData(0);
  });

  if (myData != ""){
    observer()
    return(myData);
  }
}

//Takes in an ISBN, type of score change, the new score (if there is one, 
// if there is not, 0 is passed), and the old score (if there is one, if
// there isn't, 0 is passed in)
const UpdateAverage = (bookId, type, newScore, oldScore) => {

  // converts new score string to integer 
  newScore = Number(newScore);

  // Goes into book's document
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
    docRef.get().then((doc) => {
    
      // If change was a submission (brand new), the total # of 
      // reviews/scores must increment, and the new average is calculated using the
      // stored average and the new score. *NOTE: oldScore does not exist for a 
      // brand new submission, and therefore 0 was passed in. 
    if(type == "submission" && doc.exists){
      const newTotal =  doc.data().total + 1;
      const newAverage = (( doc.data().average * (newTotal-1))+newScore)/newTotal;
        firebase.firestore().collection('books')
        .doc(bookId)
        .update({
          total: newTotal,
          average: newAverage
          });

      // If change was an edit of the old score, the total # of 
      // reviews/scores stays the same, and the new average is calculated using the
      // stored average, old score, and the new score.
    } else if (type == "edit" && doc.exists){
      const newAverage = (( doc.data().average * ( doc.data().total)) - oldScore +newScore)/ doc.data().total;

        firebase.firestore().collection('books')
        .doc(bookId)
        .update({
          average: newAverage
          });

      // If change was a deletion of a score, the total # of 
      // reviews/scores must decrement, and the new average is calculated using the
      // stored average and the old score. *NOTE: newScore does not exist for a 
      // deletion, and therefore 0 was passed in. 
    } else if (type == "delete"){
      const newTotal =  doc.data().total -1;
      const newAverage = (( doc.data().average * (newTotal+1)) - oldScore)/newTotal;

      firebase.firestore().collection('books')
      .doc(bookId)
      .update({
        total: newTotal,
        average: newAverage
        });
    }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
}

export {
  // All Get Funcs
  GetUserData,
  GetBooks,
  GetReviews,
  GetScores,
  GetAuthor,
  GetAverage,
  // GetUserReview,

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

  BookCreation,
  UpdateAverage
}