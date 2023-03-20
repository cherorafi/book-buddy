import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { BookRatingToStar } from '../components/BookRatingToStar';
// import { GetReviews } from '../components/GetReviews';
import { BookAuthor, BookTitle, BookCover, BookRating, BookDescription } from '../components/GoogleBooks';
import { ScrollView } from 'react-native-gesture-handler';


const Reviews = (isbn_) => {
  const isbn13 = isbn_.route.params.isbn
  
  const navigation = useNavigation();
  const [reviews, setReviews] = useState('')

  
  useEffect(() => {
      const fetchReviews = async () => {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const bookId = response.data.items[0].id;
        const reviewsResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}/reviews`);
        setReviews(reviewsResponse.data.items);
      };
  
      fetchReviews();
    }, [isbn_]);

  return (
    <ScrollView>
      <View style={styles.container}>
      {reviews.map((review) => (
          <View key={review.id} style={styles.review}>

            <View style={styles.details}>   
              <TouchableOpacity onPress={() => navigation.navigate('BookView', { isbn: review.volumeInfo.industryIdentifiers.find((identifier) => identifier.type === 'ISBN_13').identifier })} >
                <Text style={styles.title}>{review}</Text>
              </TouchableOpacity>
              {/* <Text style={styles.description}>{review.volumeInfo.description }</Text> */}
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Reviews

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    shadowColor: '#000'
    
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  summary: {
    // flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 17,
    alignItems: 'center',
    shadowColor: '#000'
  }
})
