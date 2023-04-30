import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { BookCover } from './GoogleBooks';

const BookListCard = ({ bookListName, books }) => {
  let nextScreen = 'BookList';
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
    {books.length > 0 ? (
      <View>
        <View style={styles.navBar}>
          <Text style={styles.heading}>{bookListName}</Text>
          <Ionicons name="arrow-forward-outline" size={28} style={styles.icon}
            onPress={() => navigation.navigate(nextScreen, { listName: bookListName })} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {books.map(book => (
              <View key={book.isbn} style={styles.imageContainer}>
                <BookCover key={book.isbn} isbn={book.isbn} style={styles.image} />
              </View>
            ))}
        </ScrollView>
      </View>  
  ) : (
    <View>
      <View style={styles.navBar}>
        <Text style={styles.heading}>{bookListName}</Text>
      </View>
      <Text style={styles.noBooksText}>No Books in List</Text>
      <Text style={{marginBottom: 10}}></Text>
    </View>    
  )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  navBar: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  icon: {
    padding: 8,
  },

  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  arrow: {
    width: 16,
    height: 16,
    tintColor: '#aaa',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  image: {
    width: 96,
    height: 144,
  },
  noBooksContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBooksText: {
    fontSize: 16,
    fontStyle: 'italic',
    color:'#888',
    textAlign: 'center',
  },
});

export default BookListCard;
