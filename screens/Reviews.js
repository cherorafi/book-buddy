import {
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Modal
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';
import {BookRatingToStar, UserRatingToStar} from '../components/BookRatingToStar.js';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {AddReview, GetReviews, DeleteReview} from '../components/Firestore.js';
import { BookRating, BookAuthor, BookTitle } from '../components/GoogleBooks.js';
import {firebase} from '../config.js';
// import { ClickableStars } from '../components/BookRatingToStar.js';



const Reviews = ({route}) => {
  const isbn13 = route.params.isbn;
  // console.log("review isbn13")
  // console.log(isbn13);

  const reviewlist = GetReviews(isbn13);

  // console.log(typeof(reviewlist));

  // console.log("Object.keys(reviewlist)[0]", Object.keys(reviewlist)[0]);

  // console.log("Object.keys(reviewlist)", Object.keys(reviewlist))
  // console.log("Object.values(reviewlist)", Object.values(reviewlist))

  console.log(reviewlist)
  
  const [showField, setShowField] = useState(false);
  const [showEditField, setShowEditField] = useState(false);
  const [newuserReview, setnewUserReview] = useState('');
  const [reviewExists, setReviewExists] = useState(false);
  const [userScore, setUserScore] = useState();
  const [currId, setCurrId] = useState(firebase.auth().currentUser.uid);
 

  const handleSubmit = (isbn13, review) => {
   // setnewUserReview();
    AddReview(isbn13, review);
    setShowField(false);
    setCurrId(firebase.auth().currentUser.uid)
    setReviewExists(true);
  };
  const handleEdit = (isbn13, review) => {
    AddReview(isbn13, review);
    setShowEditField(false);
  };
  const handleDelete = (isbn13) => {
    DeleteReview(isbn13);
    setReviewExists(false);
  }
  // const handleStarClick = (starClicked) => {
  //   setUserScore()
  // }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.bookTitle}>
        <BookTitle isbn={isbn13}></BookTitle>
      </Text>
      <Text style={styles.bookAuthor}>
        <BookAuthor isbn={isbn13}></BookAuthor>
      </Text>
      <View style={{marginTop: 7, flexDirection: "row"}}>
        <BookRatingToStar isbn={isbn13}></BookRatingToStar>
        <Text style={{marginLeft: 5, marginTop: .5 }} >
          <BookRating isbn={isbn13}></BookRating>
        </Text>
       
      </View>
      {reviewExists == true ? 
        null :
        <TouchableOpacity 
          style={{
            borderRadius: 12,
            padding: 5,
            margin: 10,
            backgroundColor: 'lightgrey'}}
          onPress={() => setShowField(true)}>
          <Text>Write a Review</Text>
        </TouchableOpacity>
      }
      

     {/* brand new review */}
      <Modal visible={showField} style={styles.modalContent}>
        <View>
          <Text style={styles.bookTitle}>
            <BookTitle></BookTitle>
          </Text>
          <View style={{flexDirection: "row"}}>
          <Text>Rating: </Text>
          {/* <ClickableStars></ClickableStars> */}
          </View>
          
          <TextInput
            style={styles.input}
            editable
            multiline
            numberOfLines={5}
            maxLength={1500}
            onChangeText={setnewUserReview}
            ></TextInput>
          <TouchableOpacity 
              style={{
                        borderRadius: 12,
                        padding: 5,
                        margin: 10,
                        backgroundColor: 'lightgrey' }} 
              onPress={() => handleSubmit(isbn13, newuserReview)}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>



      <Modal visible={showEditField} style={styles.modalContent}>
          <View>
            <TextInput
              style={styles.input}
              editable
              multiline
              numberOfLines={5}
              value={newuserReview}
              onChangeText={setnewUserReview}
              ></TextInput>
            <TouchableOpacity 
              style={{
                borderRadius: 12,
                padding: 5,
                margin: 10,
                backgroundColor: 'lightgrey'}}
              onPress={() => handleEdit(isbn13, newuserReview)}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      
      {/* reviews */}
      { Object.keys(reviewlist)[0] === "Loading" ?
        <View><Text>No reviews.</Text></View>

        :
        //getting users review at the top 
          Object.keys(reviewlist).map((val, k) => 
          
            <View key={k} style={styles.reviewBox}>
              {val === currId ? 
                <View>
                  <View style={styles.header}>
                    <Text style={{fontSize: 20}}>Your review:</Text>
                    <TouchableOpacity style={{marginTop: 8}} onPress={() => handleDelete(isbn13)}>
                      <FontAwesome name="trash-o" size={20} color="gray" />
                    </TouchableOpacity>
                  </View>
                  <Text>{reviewlist[val]}</Text>
                  <Text>{val}</Text>
                  <TouchableOpacity style={{flexDirection: "row"}} onPress={() => setShowEditField(true)}>
                    <Text style={{color: "gray", fontSize: 10, textDecorationLine: "underline" }}>Edit your review</Text>
                    <MaterialCommunityIcons name="lead-pencil" size={10} color="gray" />
                  </TouchableOpacity>
                </View>
                :
                <View style={styles.reviewBox}>
                <Text>{reviewlist[val]}</Text>
                <Text>{val}</Text>
                {/* <Text>heyi</Text> */}
                </View>
              }
              </View>
            )
      } 
      {/* end reviews */}
    </View>
    </ScrollView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  input: {
    backgroundColor: 'pink',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  bookTitle: {
    // textAlign: "center",
    // fontFamily: "Hind",
    textAlign: 'center',
    fontSize: 25,
    marginTop: 20,

  },
  reviewTitle: {
    fontSize: 18,
    
  },
  bookAuthor: {
    // textAlign: "center",
    // fontFamily: "Hind",
    fontSize: 17,
    color: 'gray'
    
  },
  titleText: {
    // fontFamily: "Hind",
    fontSize: 30,
    marginTop: 20,

  },
  button: {
    backgroundColor: '#C2B7C8',
  borderRadius: 5,
  paddingHorizontal: 15,
  paddingVertical: 10,
  // marginRight: 0,
  },
  reviewBox: {
    // fontFamily: "Hind",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 17,
    width: '100%',
    
    shadowColor: '#000'
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '80%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: "row", 
    justifyContent: "space-between",

  }
});
