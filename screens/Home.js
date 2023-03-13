import { Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import BookListCard from '../components/BookListCard';
import { useNavigation } from '@react-navigation/native';
import ContinueReading from '../components/CurrentlyReading';

const wantToReadBookList = [
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
  ];

  const finishedBookList = [
    {
      id: 1,
      title: 'Sejarah Al Qur-an',
      author: 'Aboebakar Atjeh',
      coverImage: require('../assets/book7.jpg'),
    },
    {
      id: 2,
      title: 'The Book Thief',
      author: 'Markus Zusak',
      coverImage: require('../assets/book5.jpg'),
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverImage: require('../assets/book6.jpg'),
    },
  ];

const Home = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={[
              {key: 'WantToRead', title: 'Want to read', bookList: wantToReadBookList},
              {key: 'Finished', title: 'Finished', bookList: finishedBookList},
            ]}
            renderItem={({ item }) => <BookListCard heading={item.title} bookList={item.bookList} nextScreen={item.key} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<ContinueReading />}
          />
        </SafeAreaView>

    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      width: '100%',
    }
})