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
  const isbn13 = route.params.isbn;
  const reviewlist = GetReviews(isbn13);
  const scoreList = GetScores(isbn13);
  const avg = GetAverage(isbn13);

  var rev;
  var sco;
 
  const userid = firebase.auth().currentUser.uid;
  if(Object.keys(reviewlist).includes(userid) && Object.keys(scoreList).includes(userid)){
    rev = reviewlist[userid];
    sco = scoreList[userid];
  }
  
  const [showField, setShowField] = useState(false);
  const [showEditField, setShowEditField] = useState(false);
  const [newUserReview, setNewUserReview] = useState('');
  const [newUserScore, setNewUserScore] = useState('');

  useEffect(() => {
    setNewUserReview(rev );
    setNewUserScore(sco );
  }, [showEditField]);
  
  const Author = ({id}) => {
    const author = GetAuthor(id);
    return (<Text style={{color: "gray"}}>{author}</Text>);
  };

  const UserScore = ({scoreList}) => {
    return (
      <View >
        {Object.keys(scoreList).map((val,k) => 
            <View key={k} >
                {val == firebase.auth().currentUser.uid ? 
                  <View key={k} style={{flexDirection: "row", paddingTop: 10}}>                  
                  {/* score mapping */}
                    <UserRatingToStar _score={scoreList[val]} style={{paddingTop: 10, paddingBottom: 10}}></UserRatingToStar>
                  </View>
                : null
                }
            </View>
        )}     
      </View>
    );
  };
 
  const TopReview = ({ reviewlist }) => {
    return (
      <View >
        {Object.keys(reviewlist).map((val,k) => 
            <View key={k} >
                {val == firebase.auth().currentUser.uid ? 
                  <View key={k} style={styles.reviewBox} >
                    <View style={styles.header}>
                      <Text style={{fontSize: 18}}>Your review:</Text>
                          <TouchableOpacity style={{marginTop: 8}} onPress={() => handleDelete(isbn13)}>
                          <FontAwesome name="trash-o" size={20} color="gray" />
                          </TouchableOpacity>
                    </View>

                  {/* score mapping */}
                    <UserScore scoreList={scoreList}></UserScore>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{color:"gray"}}>by </Text> 
                      <Author id={val}></Author>
                      </View>
                    <Text style={{paddingTop: 10, paddingBottom: 10}}>{reviewlist[val]}</Text>
                    <TouchableOpacity style={{flexDirection: "row"}} onPress={() => setShowEditField(true)}>
                        <Text style={{color: "gray", fontSize: 10, textDecorationLine: "underline" }}>Edit your review</Text>
                        <MaterialCommunityIcons style={{padding: 3}} name="lead-pencil" size={10} color="gray" />
                    </TouchableOpacity>
                  </View>
                : null
                }
            </View>
        )}     
      </View>
    );
  };

  const OtherReviews = ({ reviewlist }) => {
    return (
      <View>
        {Object.keys(reviewlist).map((val,k) => 
            <View key={k}>
                {val != firebase.auth().currentUser.uid ?
                    <View style={styles.reviewBox}>
                      <View style={{flexDirection: "row"}}>
                      <UserRatingToStar _score={scoreList[val]}></UserRatingToStar>
                      </View>
                      <View style={{flexDirection:"row"}}>
                      <Text style={{color: "gray"}}>by </Text> 
                      <Author id={val}></Author>
                      </View>
                       <Text>{reviewlist[val]}</Text>
                    </View>
                    
                : null}
            </View>
        )}     
      </View>
    );
  };

  const handleSubmit = (isbn13, review, score) => {
    UpdateAverage(isbn13, "submission", score, 0);
    AddReview(isbn13, review);
    AddScore(isbn13, score);
    setShowField(false);
  };
  const handleEdit = (isbn13, review, score) => {
    UpdateAverage(isbn13, "edit", score, sco);
    AddReview(isbn13, review);
    AddScore(isbn13, score);
    setShowEditField(false);
  };
  const handleDelete = (isbn13) => {
    UpdateAverage(isbn13, "delete", 0, sco);
    DeleteReview(isbn13);
    DeleteScore(isbn13);
  };

 console.log(Object.keys(reviewlist))
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
      <RatingToStar _score={avg}></RatingToStar>
        <Text style={{marginLeft: 5, marginTop: .5 }} >
          {Number(avg).toFixed(1)}
        </Text>
       
      </View>
      {Object.keys(reviewlist).includes(firebase.auth().currentUser.uid) != true ? 
        <TouchableOpacity 
        style={{
          borderRadius: 12,
          padding: 5,
          margin: 10,
          backgroundColor: 'lightgrey'}}
          // onPress={()=> handleDocCreation(isbn13)}
        onPressIn={() => setShowField(true)}>
        <Text>Write a Review</Text>
      </TouchableOpacity> :
        null
      }
      

     {/* brand new review */}
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
            <View style={{alignContent: "center"}}>
          <TouchableOpacity 
              style={{
                        alignSelf: "center",
                        borderRadius: 12,
                        padding: 5,
                        margin: 10,
                        backgroundColor: 'lightgrey' }} 
              onPress={() => handleSubmit(isbn13, newUserReview, newUserScore)}>
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
              onPress={() => handleEdit(isbn13, newUserReview, newUserScore)}>
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
      { Object.keys(reviewlist)[0] === "Loading" || Object.keys(reviewlist).length === 0  ?
        <View><Text>No reviews.</Text></View>
        
        :
        <View style={{width: "95%", }}> 
          <TopReview  reviewlist={reviewlist}/>
          <OtherReviews  reviewlist={reviewlist}/>
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