import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { UserRatingToStar, RatingToStar} from '../components/BookRatingToStar.js';
import {ScrollView } from 'react-native-gesture-handler';
import { AddReview, GetReviews, DeleteReview, AddScore, GetScores, DeleteScore, GetAuthor, UpdateAverage, GetAverage} from '../components/Firestore.js';
import { BookAuthor, BookTitle } from '../components/GoogleBooks.js';
import {firebase} from '../config.js';



const Reviews = ({route}) => {
  // Obtaining current book's ISBN, reviews, score, and rating average
  const isbn13 = route.params.isbn;
  const reviewList = GetReviews(isbn13);
  const scoreList = GetScores(isbn13);
  const average = GetAverage(isbn13);

  var storedReview;
  var storedScore;
 
  const userid = firebase.auth().currentUser.uid;

  // If a user has a score and review for the current book, retrieve their values
  if(Object.keys(reviewList).includes(userid) && Object.keys(scoreList).includes(userid)){
    storedReview = reviewList[userid];
    storedScore = scoreList[userid];
  }
  
  const [showField, setShowField] = useState(false);
  const [showEditField, setShowEditField] = useState(false);
  const [newUserReview, setNewUserReview] = useState('');
  const [newUserScore, setNewUserScore] = useState('');

  // SOURCE: Used for useEffect
  // Section: Example 3, Props or State Values
  // https://www.w3schools.com/react/react_useeffect.as

  // Sets newUserScore and newUserReview to the stored values.
  // Updates them on initial render, and on change of showEditField value,
  // in order to have stored review+score show in their respective edit fields
  useEffect(() => {
    setNewUserReview(storedReview);
    setNewUserScore(storedScore);
  }, [showEditField]);
  
  // Gets first name of user given their ID.
  const Author = ({id}) => {
    const author = GetAuthor(id);
    return (<Text style={{color: "gray"}}>{author}</Text>);
  };
 
  // TopReview takes in the review map, and if current user's ID is found in the review and score
  // fields, display them at the very of the review list, with options to delete and edit.
  const TopReview = ({ reviewList }) => {
    return (
    <View>
      {Object.keys(reviewList).includes(userid) && Object.keys(scoreList).includes(userid) ?            // Check for current user's ID in score and review fields.

        <View style={styles.reviewBox}>
          <View style={styles.header}>
            <Text style={{fontSize: 18}}>Your review:</Text>
                <TouchableOpacity style={{marginTop: 8}} onPress={() => handleDelete(isbn13)}>    
              <FontAwesome name="trash-o" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Displaying Rating Stars */}
          <View style={{flexDirection: "row", paddingTop: 10}}>                  
            <UserRatingToStar _score={storedScore} style={{paddingTop: 10, paddingBottom: 10}}></UserRatingToStar>
          </View>
          
          {/* Displaying Author information */}
          <View style={{flexDirection:"row"}}>
            <Text style={{color:"gray"}}>by </Text> 
            <Author id={userid}></Author>
          </View>

          {/* Displaying review */}
          <Text style={{paddingTop: 10, paddingBottom: 10}}>{storedReview}</Text>

          {/* Edit and delete options */}
          <TouchableOpacity style={{flexDirection: "row"}} onPress={() => setShowEditField(true)}>
              <Text style={{color: "gray", fontSize: 10, textDecorationLine: "underline" }}>Edit your review</Text>
              <MaterialCommunityIcons style={{padding: 3}} name="lead-pencil" size={10} color="gray" />
          </TouchableOpacity>

        </View> 
      : null        //Review and score for user do not exist, no special display. 
      }  
      </View> 
    );
  };

  // Takes in review list, and maps them for displaying them individually, where key equals
  // a user ID. Only displays reviews not belonging to current user (reviews where key does not
  // match current user's ID).
  const OtherReviews = ({ reviewList }) => {
    return (
      <View>
        {Object.keys(reviewList).map((key) => 
            <View key={key}>
                {key != firebase.auth().currentUser.uid ?    //Displaying reviews other than current user's, displays nothing if none exist
                    <View style={styles.reviewBox}>

                      {/* Displaying rating stars */}
                      <View style={{flexDirection: "row"}}>
                        <UserRatingToStar _score={scoreList[key]}></UserRatingToStar>
                      </View>

                      {/* Displaying author information */}
                      <View style={{flexDirection:"row"}}>
                        <Text style={{color: "gray"}}>by </Text> 
                        <Author id={key}></Author>
                      </View>

                      {/* Displaying review */}
                      <Text>{reviewList[key]}</Text>

                    </View>
                : null}   
            </View>
        )}     
      </View>
    );
  };

  // Takes in ISBN, and takes in review and score from a brand new submission, 
  // and verifies that the review is not empty, and the score is a number from 1 - 5.
  // Alerts user if conditions are not met. If met, sends parameters to handleSubmit.
  const verifySubmission = (isbn13, review, score) => {
    if (review == "" || review== "undefined" || review== null){    // possible bad reviews
      alert("Review cannot be empty.")
    } else if (![1,2,3,4,5].includes(score)){
      alert("Rating must be from 1-5.")
    } else {
      handleSubmit(isbn13, review, score);   // submission occurs only when conditions are met
    }
  };

  // Takes in ISBN, and takes in review and score from an edit, 
  // and verifies that the review is not empty, and the score is a number from 1 - 5.
  // Alerts user if conditions are not met. If met, sends parameters to handleEdit.
  const verifyEdit = (isbn13, review, score) => {
    if (review == "" || review== "undefined" || review== null){
      alert("Review cannot be empty.")
    } else if (![1,2,3,4,5].includes(Number(score))){
      alert("Rating must be from 1-5.")
    } else {
      handleEdit(isbn13, review, score);
    }
  };
  
  // Takes in current book's ISBN and verified review and score, and 
  // calls functions to update the average rating, add review and score to the database
  // and close the submission fields.
  const handleSubmit = (isbn13, review, score) => {     // NOTE: 
    UpdateAverage(isbn13, "submission", score, 0);      // Params of UpdateAverage: bookISBN, type of change, new score, old score.
    AddReview(isbn13, review);                          // Old score is set to 0, as a brand new submission has no previous score.
    AddScore(isbn13, score);
    setShowField(false);
  };


  // Takes in current book's ISBN and verified review and score, and 
  // calls functions to update the average rating, update review and score in the database
  // and close the edit fields.
  const handleEdit = (isbn13, review, score) => {       
    UpdateAverage(isbn13, "edit", score, storedScore);  
    AddReview(isbn13, review);                          
    AddScore(isbn13, score);
    setShowEditField(false);
  };

  // Takes in current book's ISBN calls functions to update the average rating, 
  // and delete review and score from the database.
  const handleDelete = (isbn13) => {                    // NOTE:
    UpdateAverage(isbn13, "delete", 0, storedScore);    // Params of UpdateAverage: bookISBN, type of change, new score, old score.
    DeleteReview(isbn13);                               // New score is set to 0, as a deletion has no new score to handle.
    DeleteScore(isbn13);
  };

  // Review Screen Rendering
  return (
    <ScrollView>
      <View style={styles.container}>

        {/* Title */}
        <Text style={styles.bookTitle}>
          <BookTitle isbn={isbn13}></BookTitle>
        </Text>

        {/* Author */}
        <Text style={styles.bookAuthor}>
          <BookAuthor isbn={isbn13}></BookAuthor>
        </Text>

        {/* Average rating (with stars) */}
        <View style={{marginTop: 7, flexDirection: "row"}}>
          <RatingToStar _score={average}></RatingToStar>
          <Text style={{marginLeft: 5, marginTop: .5}}> {Number(average).toFixed(1)} </Text>
        </View>
        
        {/* Write a Review button */}
        {/* If current user has no existing review/score, button for brand new submission will display.
            No longer displays after submission. Shows submission fields when pressed. */}
        {Object.keys(reviewList).includes(firebase.auth().currentUser.uid) != true ? 
          <TouchableOpacity 
          style={{
            borderRadius: 12,
            padding: 5,
            margin: 10,
            backgroundColor: 'lightgrey'}}
          onPressIn={() => setShowField(true)}>
          <Text>Write a Review</Text>
          </TouchableOpacity> 
          : null
        }
        

      {/*Brand New Review Submission Fields*/}
        <Modal visible={showField} >
          <View style={styles.modalContent}> 
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {"Review for "}
                <BookTitle isbn={isbn13}></BookTitle>
              </Text>
            </View>

            <View style={{padding: 20}}>
              <Text style={styles.modalLabel}>Rating: </Text>

              {/* Score Field */}
              <TextInput
                style={styles.modalInput}
                maxLength={1}
                editable
                onChangeText={setNewUserScore}
                ></TextInput>

              {/* Review Field */}
              <TextInput
                style={styles.modalInput}
                editable
                multiline
                numberOfLines={5}
                maxLength={1500}
                onChangeText={setNewUserReview}
                ></TextInput>
            </View>

            {/* Submit and Cancel Buttons */}
            <View style={{alignContent: "center"}}>
              <TouchableOpacity 
                  style={{
                    alignSelf: "center",
                    borderRadius: 12,
                    padding: 5,
                    margin: 10,
                    backgroundColor: 'lightgrey' }} 
                  onPress={() => verifySubmission(isbn13, newUserReview, newUserScore)}>
                <Text>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  borderRadius: 12,
                  padding: 5,
                  margin: 10,
                  backgroundColor: 'lightgrey' }} 
                onPress={() => setShowField(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>

        <Modal visible={showEditField} >
          <View style={styles.modalContent}> 
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {"Review for "}
                <BookTitle isbn={isbn13}></BookTitle>
              </Text>
            </View>
            <View style={{padding: 20}}>
              <Text style={styles.modalLabel}>Rating: </Text>

              {/* Score Field */}
              <TextInput
                style={styles.modalInput}
                editable
                maxLength={1}
                value={newUserScore}
                onChangeText={setNewUserScore}
              ></TextInput>

              {/* Review Field */}
              <TextInput
                style={styles.modalInput}
                editable
                multiline
                numberOfLines={5}
                value={newUserReview}
                onChangeText={setNewUserReview}
                ></TextInput>
              </View>
              <View style={{alignContent: "center"}}>
                <TouchableOpacity 
                  style={{
                    alignSelf: "center",
                    borderRadius: 12,
                    padding: 5,
                    margin: 10,
                    backgroundColor: 'lightgrey'}}
                  onPress={() => verifyEdit(isbn13, newUserReview, newUserScore)}>
                  <Text>Save</Text>              
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                      alignSelf: "center",
                      borderRadius: 12,
                      padding: 5,
                      margin: 10,
                      backgroundColor: 'lightgrey' }} 
                   onPress={() => setShowEditField(false)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
        {/* reviews */}
        {Object.keys(reviewList)[0] === "Loading" || Object.keys(reviewList).length === 0  ?
          <View><Text>No reviews.</Text></View>
          :
          <View style={{ width: "95%" }}> 
            <TopReview reviewList={reviewList}/>
            <OtherReviews reviewList={reviewList}/>
          </View>
        }   
        {/* end reviews */}
      </View>
    </ScrollView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: "100%"
  },
  input: {
    backgroundColor: 'white',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  bookTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,

  },
  reviewTitle: {
    fontSize: 15,
    paddingBottom: 5
    
  },
  bookAuthor: {
    fontSize: 17,
    color: 'gray'
    
  },
  titleText: {
    fontSize: 30,
    marginTop: 20,

  },
  modalInput: {
    fontSize: 16,
    color: '#666666',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  modalHeader:{
    backgroundColor: '#f0f0f0',
  paddingVertical: 15,
  paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  button: {
    backgroundColor: '#C2B7C8',
  borderRadius: 5,
  paddingHorizontal: 15,
  paddingVertical: 10,
  },
  reviewBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 17,
    width: '100%',
    shadowColor: '#000'
  },
  modalLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 5,
      marginTop: 10,
    },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: "row", 
    justifyContent: "space-between",
  }
});