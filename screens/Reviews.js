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
import React, { useState, useEffect } from 'react';
// import { GetReviews } from '../components/GetReviews';
import { ScrollView } from 'react-native-gesture-handler';

const Reviews = () => {
  const [showField, setShowField] = useState(false);
  const [newuserReview, setnewUserReview] = useState('');
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
  //const [value, onChangeText] = useState('Useless Multiline Placeholder');

  const handleSubmit = () => {
   // setnewUserReview();
    setShowField(false);
  };

  return (
    <ScrollView>
      <Text>Reviews</Text>
      <TouchableOpacity style={styles.button} onPress={() => setShowField(true)}>
        <Text>Write a Review</Text>
      </TouchableOpacity>
      <Modal visible={showField}>
        <View>
          <TextInput
            style={styles.input}
            editable
            multiline
            numberOfLines={5}
            maxLength={1000}
            onChangeText={setnewUserReview}
            ></TextInput>
          <TouchableOpacity onPress={() => handleSubmit()}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {newuserReview != '' ? <Text>{newuserReview}</Text> : null}
      <Text>{review1}</Text>
      <Text>{review2}</Text>
      <Text>{review3}</Text>
      <Text>{review4}</Text>
      <Text>{review5}</Text>
      <Text>{review6}</Text>
    </ScrollView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'pink',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: '#026efd',
  borderRadius: 5,
  paddingHorizontal: 15,
  paddingVertical: 10,
  alignSelf: 'center',
  marginTop: 20,
  }
});
