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
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';
import {BookRatingToStar, UserRatingToStar} from '../components/BookRatingToStar.js';
import {ScrollView } from 'react-native-gesture-handler';
import {AddReview, GetReviews, DeleteReview} from '../components/Firestore.js';
import { BookRating, BookAuthor, BookTitle } from '../components/GoogleBooks.js';
import {firebase} from '../config.js';
// import { ClickableStars } from '../components/BookRatingToStar.js';



const Reviews = ({route}) => {
  const isbn13 = route.params.isbn;
  const reviewlist = GetReviews(isbn13);
  let boo = Object.keys(reviewlist).includes(firebase.auth().currentUser.uid);
  
  const [showField, setShowField] = useState(false);
  const [showEditField, setShowEditField] = useState(false);
  const [newuserReview, setnewUserReview] = useState('');
  const [reviewExists, setReviewExists] = useState(boo);
  const [check, setCheck] = useState();
  // const [userScore, setUserScore] = useState();
  const [currId, setCurrId] = useState(firebase.auth().currentUser.uid);

 
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
                       <Text>{reviewlist[val]}</Text>
                    </View>
                : null}
            </View>
        )}     
      </View>
    );
  };

  const handleSubmit = (isbn13, review) => {
    AddReview(isbn13, review);
    setShowField(false);
    setCurrId(firebase.auth().currentUser.uid)
    setReviewExists(true);
  };
  const handleEdit = (isbn13, review) => {
    AddReview(isbn13, review);
    setReviewExists(true);
    setShowEditField(false);
  };
  const handleDelete = (isbn13) => {
    DeleteReview(isbn13);
    setReviewExists(false);
  }

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
      {reviewExists != true ? 
        <TouchableOpacity 
        style={{
          borderRadius: 12,
          padding: 5,
          margin: 10,
          backgroundColor: 'lightgrey'}}
        onPressIn={() => setShowField(true)}>
        <Text>Write a Review</Text>
      </TouchableOpacity> :
        null
      }
      

     {/* brand new review */}
      <Modal visible={showField} >
        <View> 
          <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {"Review for "}
            <BookTitle isbn={isbn13}></BookTitle>
          </Text>
          </View>
          
          <View style={{flexDirection: "row"}}>
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
            <View style={{alignContent: "center"}}>
          <TouchableOpacity 
              style={{
                        alignSelf: "center",
                        borderRadius: 12,
                        padding: 5,
                        margin: 10,
                        backgroundColor: 'lightgrey' }} 
              onPress={() => handleSubmit(isbn13, newuserReview)}>
            <Text>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showEditField} >
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
        <View style={{width: "100%"}}> 
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
  // modalContent: {
  //   backgroundColor: '#ffffff',
  //   borderRadius: 10,
  // },
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
