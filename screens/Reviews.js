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
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';
import {BookRatingToStar, UserRatingToStar} from '../components/BookRatingToStar.js';
import { ScrollView } from 'react-native-gesture-handler';
import { BookRating, BookAuthor, BookTitle } from '../components/GoogleBooks.js';
// import { ClickableStars } from '../components/BookRatingToStar.js';

const Reviews = ({isbn}) => {
  console.log("hi");
  // const isbn13 = isbn_.route.params.isbn
  console.log(isbn);
  
  const [showField, setShowField] = useState(false);
  const [showEditField, setShowEditField] = useState(false);
  const [newuserReview, setnewUserReview] = useState('');
  const [userScore, setUserScore] = useState();
  const [review1, setReview1] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis vulputate enim nulla aliquet porttitor lacus. Dignissim sodales ut eu sem integer. Nunc sed velit dignissim sodales ut. At tellus at urna condimentum mattis pellentesque id nibh. Nisi porta lorem mollis aliquam ut porttitor leo. '
  );
  const [review2, setReview2] = useState(
    'Volutpat maecenas volutpat blandit aliquam etiam erat. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Libero id faucibus nisl tincidunt eget nullam non. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Aliquam id diam maecenas ultricies mi eget.'
  );
  const [review3, setReview3] = useState(
    'Molestie at elementum eu facilisis sed odio morbi. Egestas diam in arcu cursus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Sit amet venenatis urna cursus eget nunc scelerisque. Venenatis urna cursus eget nunc scelerisque viverra. Neque vitae tempus quam pellentesque nec nam aliquam sem et. Aliquet nec ullamcorper sit amet. Ac feugiat sed lectus vestibulum mattis ullamcorper. Mattis rhoncus urna neque viverra justo nec ultrices dui. Bibendum arcu vitae elementum curabitur vitae. '
  );
  const [review4, setReview4] = useState(
    'A lacus vestibulum sed arcu non odio. Turpis egestas sed tempus urna et pharetra pharetra. Imperdiet sed euismod nisi porta. Cras ornare arcu dui vivamus arcu felis. Egestas diam in arcu cursus euismod quis viverra. Sapien faucibus et molestie ac feugiat. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Aliquet nibh praesent tristique magna sit amet purus gravida. Sit amet porttitor eget dolor morbi non arcu risus. '
  );
  const [review5, setReview5] = useState(
    'Ac orci phasellus egestas tellus rutrum tellus pellentesque. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Donec et odio pellentesque diam volutpat commodo. Turpis massa tincidunt dui ut ornare lectus sit amet est. Sit amet venenatis urna cursus eget. Volutpat maecenas volutpat blandit aliquam etiam. Semper auctor neque vitae tempus. Sit amet massa vitae tortor condimentum lacinia quis vel.'
  );
  const [review6, setReview6] = useState(
    'Donec massa sapien faucibus et molestie ac. Diam vel quam elementum pulvinar etiam. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Tellus id interdum velit laoreet id donec ultrices tincidunt arcu. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Faucibus vitae aliquet nec ullamcorper sit. Id diam vel quam elementum pulvinar etiam. Dignissim cras tincidunt lobortis feugiat vivamus at augue. Sagittis orci a scelerisque purus semper eget duis. Ornare lectus sit amet est. In fermentum et sollicitudin ac orci phasellus. Proin libero nunc consequat interdum varius sit. '
  );
  const score1 = 5;
  const score2 = 3.4;
  const score3 = 4;
  const score4 = 1;
  const score5 = 0;
  const score6 = 2.5;
  //const [value, onChangeText] = useState('Useless Multiline Placeholder');

  const handleSubmit = () => {
   // setnewUserReview();
    setShowField(false);
  };
  const handleEdit = () => {
    setShowEditField(false);
  };
  // const handleStarClick = (starClicked) => {
  //   setUserScore()
  // }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.bookTitle}>
        <BookTitle isbn={isbn}></BookTitle>
      </Text>
      <Text style={styles.bookAuthor}>
        <BookAuthor isbn={isbn}></BookAuthor>
      </Text>
      <View style={{marginTop: 7, flexDirection: "row"}}>
        <BookRatingToStar isbn={isbn}></BookRatingToStar>
        <Text style={{marginLeft: 5, marginTop: .5 }} >
          <BookRating isbn={isbn}></BookRating>
        </Text>
        <TouchableOpacity onPress={() => setShowField(true)}>
          <Text>Write a Review</Text>
        </TouchableOpacity>
      </View>

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
          <TouchableOpacity onPress={() => handleSubmit()}>
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
            <TouchableOpacity onPress={() => handleEdit()}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      {newuserReview != '' ? 
        <View>
          <View style={{flexDirection: "row"}}>
            <Text style={styles.bookTitle}></Text>
            <UserRatingToStar _score={3}></UserRatingToStar> 
          </View>
          <Text style={styles.reviewBox}>{newuserReview}</Text>
          <TouchableOpacity style={{flexDirection: "row"}} onPress={() => setShowEditField(true)}>
            <Text style={{color: "gray", fontSize: 10, textDecorationLine: "underline" }}>Edit your review</Text>
            <MaterialCommunityIcons name="lead-pencil" size={10} color="gray" />
          </TouchableOpacity>
        </View>
      : null}
      <View style={styles.reviewBox}>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.reviewTitle}>Loved it!</Text>
        <UserRatingToStar _score={score1}></UserRatingToStar>
      </View>
      <Text style={{fontSize: 15, alignItems: 'center'}}>{review1}</Text>
      </View>

      <View style={styles.reviewBox}>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.reviewTitle}>My review on book</Text>
        <UserRatingToStar _score={score2}></UserRatingToStar>
      </View>
      <Text style={{fontSize: 15, alignItems: 'center'}}>{review2}</Text>
      </View>

      <View style={styles.reviewBox}>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.reviewTitle}>Hated it!</Text>
        <UserRatingToStar _score={score3}></UserRatingToStar>
      </View>
      <Text style={{fontSize: 15, alignItems: 'center'}}>{review3}</Text>
      </View>

      <View style={styles.reviewBox}>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.reviewTitle}>Thoughts so far...</Text>
        <UserRatingToStar _score={score4}></UserRatingToStar>
      </View>
      <Text style={{fontSize: 15, alignItems: 'center'}}>{review4}</Text>
      </View>

      <View style={styles.reviewBox}>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.reviewTitle}>Suzanne Slays</Text>
        <UserRatingToStar _score={score5}></UserRatingToStar>
      </View>
      <Text style={{fontSize: 15, alignItems: 'center'}}>{review5}</Text>
      </View>

      <View style={styles.reviewBox}>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.reviewTitle}>Really good</Text>
        <UserRatingToStar _score={score6}></UserRatingToStar>
      </View>
      <Text style={{fontSize: 15, alignItems: 'center'}}>{review6}</Text>
      </View>
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
    
    shadowColor: '#000'
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '80%',
    maxHeight: '80%',
  }
});
