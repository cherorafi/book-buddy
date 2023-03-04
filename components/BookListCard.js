import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const BookListCard = ({ heading, bookList, nextScreen }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.navBar}>
        <Text style={styles.heading}>{heading}</Text>
        <Ionicons name="arrow-forward-outline" size={28} style={styles.icon} 
                  onPress={() => navigation.navigate(nextScreen)}/>
      </View>
      {/* <TouchableOpacity style={styles.headingContainer} onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.heading}>{heading}</Text>
        <Ionicons name="menu-outline" size={28} color="#fff" style={styles.icon} />
        <Icon name="arrow-right" size={20} color="black" type="entypo" style={styles.arrow}/>
      </TouchableOpacity> */}
      {/* <View style={styles.imageContainer}>
        {imageKeys.map((image, index) => (
          <Image key={index} source={images[image]} style={styles.image} />
        ))}
      </View> */}
      <FlatList
        data={bookList}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item.coverImage} style={styles.image} />
          </View>
        )}
      />
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
});

export default BookListCard;
// import React from 'react';
/*import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const MyCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Want to Read</Text>
        <View style={styles.bookList}>
          <TouchableOpacity style={styles.book}>
            <Image source={require('../assets/book1.jpg')} style={styles.bookCover} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.book}>
            <Image source={require('../assets/book2.jpg')} style={styles.bookCover} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.book}>
            <Image source={require('../assets/book3.jpg')} style={styles.bookCover} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Currently Reading</Text>
        <View style={styles.bookList}>
          <TouchableOpacity style={styles.book}>
            <Image source={require('../assets/book4.jpg')} style={styles.bookCover} />
            <View style={styles.progress}>
              <View style={styles.progressBar} />
            </View>
            <Text style={styles.bookTitle}>Book Title</Text>
            <Text style={styles.bookAuthor}>Author Name</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Finished</Text>
        <View style={styles.bookList}>
          <TouchableOpacity style={styles.book}>
            <Image source={require('../assets/book5.jpg')} style={styles.bookCover} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.book}>
            <Image source={require('../assets/book3.jpg')} style={styles.bookCover} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.book}>
            <Image source={require('../assets/book1.jpg')} style={styles.bookCover} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  book: {
    marginRight: 10,
    alignItems: 'center',
  },
  bookCover: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  progress: {
    width: 120,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EEEEEE',
    marginTop: 5,
  },
  progressBar: {
    width: '50%',
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00BFFF',
  },
  bookTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default MyCard;*/
