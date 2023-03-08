import { Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import SingleBookCard from '../components/SingleBookCard';

const bookList = [
  {
    id: 1,
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    coverImage: require('../assets/book1.jpg'),
  },
  {
    id: 2,
    title: 'Harry Potter',
    author: 'J. K. Rowling',
    coverImage: require('../assets/book2.jpg'),
  },
  {
    id: 3,
    title: 'Secrets of Divine Love: A Spiritual Journey into the Heart of Islam',
    author: 'A. Helwa',
    coverImage: require('../assets/book3.jpg'),
  },
    // add more books here
];

const WantToRead = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={bookList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <SingleBookCard book={item}></SingleBookCard>
                )}
            />
        </SafeAreaView>
    )
}

export default WantToRead

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      width: '100%',
    }
})