import { useState } from 'react'
import { firebase } from '../config'

// Provides a map of all the data of the current user
/*
fields include
- name of reading lists
- age
- bookLists
- email
- firstName
- lastName
- likedGenres
- loc
- phoneNum
- username
*/
const GetUserData = () => {
  
  const nameRef = firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)

  const [myData, setData] = useState("");
  
  const observer = nameRef.onSnapshot(docSnapshot => {
    setData(docSnapshot.data());
  }, err => {
    console.log(`Encountered error: ${err}`);
    setData("Error");
  });

  if (myData != ""){
    observer()
    return(myData);
  }
  
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

export {
  GetUserData,
}