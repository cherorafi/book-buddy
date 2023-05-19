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
          reviews: {},
          scores: {},
          total: 0,
          average: 0
        });
        // firebase.firestore().collection('books')
        // .doc(bookId)
        // .set({
        //   scores: {}
        // }, {merge:true});

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
        }, {merge: true});
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
    try{
      setData(docSnapshot.data().reviews);
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
// Delete review of the book
const DeleteReview = (bookId) => {
  firebase.firestore().collection('books')
  .doc(bookId)
  .update({
    [`reviews.${firebase.auth().currentUser.uid}`] : firebase.firestore.FieldValue.delete()
  });
}

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
        }, {merge: true});
    }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
}

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

const BookCreation = (bookId) => {
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
    docRef.get().then((doc) => {
    if (doc.exists) {
      console.log("Document already exists.")
    } else {
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

const GetAuthor = (id) => {
  const docRef = firebase.firestore().collection('users')
  .doc(id);
  // console.log("docRef: ", docRef);

  const [myData, setData] = useState("");
  
  const observer = docRef.onSnapshot(docSnapshot => {
    setData(docSnapshot.data().firstName);
  }, err => {
    console.log(`Encountered error: ${err}`);
    setData("Error");
  });

  if (myData != ""){
    observer()
    return(myData);
  }
  
  // return(
  //   "Loading"
  //   );;
}
const GetAverage = (bookId) => {
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
  // console.log("docRef: ", docRef);

  const [myData, setData] = useState("");
  
  const observer = docRef.onSnapshot(docSnapshot => {
    try{
      setData(docSnapshot.data().average);
    } catch(error){
      return(0);
    }
    
  }, err => {
    console.log(`Encountered error: ${err}`);
    setData(0);
  });
  console.log("get: ", myData)
  if (myData != ""){
    observer()
    return(myData);
  }
}

const UpdateAverage = (bookId, type, newScore, oldScore) => {
  newScore = Number(newScore);
  const docRef = firebase.firestore().collection('books')
  .doc(bookId);
  // console.log( "TOTALLLLLLLL++++++++++++++++: ",firebase.firestore().collection('books')
  // .doc(bookId).total)
    docRef.get().then((doc) => {
      console.log("-----------------------------", doc.data(), "-----------------------------");
    if(type == "submission" && doc.exists){
      const newTotal =  doc.data().total +1;
      console.log("NewTL ", newTotal)
      const newAverage = (( doc.data().average * (newTotal-1))+newScore)/newTotal;
      console.log("AVGGGGGGGL ", newAverage)
        firebase.firestore().collection('books')
        .doc(bookId)
        .update({
          total: newTotal,
          average: newAverage
          });
    } else if (type == "edit" && doc.exists){
      const newAverage = (( doc.data().average * ( doc.data().total)) - oldScore +newScore)/ doc.data().total;

        firebase.firestore().collection('books')
        .doc(bookId)
        .update({
          average: newAverage
          });
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
    console.log("------------update:", doc.data().average);
    }).catch((error) => {
      console.log("--------------------------Error getting document:", error);
    });
}


// const GetUserReview = (bookId, id) => {
//   const docRef = firebase.firestore().collection('books')
//   .doc(bookId);
//   // console.log("docRef: ", docRef);

//   const [myData, setData] = useState("");
  
//   const observer = docRef.onSnapshot(docSnapshot => {
//     setData(docSnapshot.data().reviews.data(id));
//   }, err => {
//     console.log(`Encountered error: ${err}`);
//     setData("Error");
//   });

//   if (myData != ""){
//     observer()
//     console.log("myData:",myData)
//     return(myData);
//   }
  
  // return(
  //   "Loading"
  //   );;
// }

export {
  // All Get Funcs
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