import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

const bookList = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: require('../assets/book1.jpg'),
    progress: 0.5, // 50% read
  },
  {
    id: 2,
    title: 'The Lean Startup',
    author: 'Eric Ries',
    coverImage: require('../assets/book2.jpg'),
    progress: 0.2, // 20% read
  },
  // add more books here
];

const ContinueReading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.heading}>Continue Reading</Text>
        {/* <Ionicons name="menu-outline" size={28} color="#fff" style={styles.icon} /> */}
        {/* <Ionicons name="search-outline" size={28} color="#fff" style={styles.icon} /> */}
      </View>
      {/* <TouchableOpacity style={styles.headingContainer} >
        <Text style={styles.heading}>{heading}</Text>
        <Icon name="arrow-right" size={20} color="black" type="entypo" style={styles.arrow}/>
      </TouchableOpacity> */}
      <FlatList
        data={bookList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Image source={item.coverImage} style={styles.coverImage} />
            <View style={styles.bookDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: item.progress * 100 + '%' }]} />
                <Text style={styles.progressText}>{(item.progress * 100).toFixed(0)}%</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ContinueReading;
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
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  coverImage: {
    width: 64,
    height: 96,
    marginRight: 16,
  },
  bookDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: 8,
    backgroundColor: '#00bcd4',
  },
  progressText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#757575',
  },
})
