import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import BookListCard from '../components/BookListCard';
import { useNavigation } from '@react-navigation/native';
import ContinueReading from '../components/CurrentlyReading';

const wantToReadBookList = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      coverImage: require('../assets/book1.jpg'),
    },
    {
      id: 2,
      title: 'The Lean Startup',
      author: 'Eric Ries',
      coverImage: require('../assets/book2.jpg'),
    },
    {
        id: 3,
        title: 'The Lean Startup',
        author: 'Eric Ries',
        coverImage: require('../assets/book3.jpg'),
      },
  ];

  const finishedBookList = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      coverImage: require('../assets/book4.jpg'),
    },
    {
      id: 2,
      title: 'The Lean Startup',
      author: 'Eric Ries',
      coverImage: require('../assets/book5.jpg'),
    },
    {
        id: 3,
        title: 'The Lean Startup',
        author: 'Eric Ries',
        coverImage: require('../assets/book2.jpg'),
      },
  ];

const Home = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <BookListCard bookList={wantToReadBookList} heading="Want to read" nextScreen="WantToRead"></BookListCard>
                <BookListCard bookList={finishedBookList} heading="Finished" nextScreen="Finished"></BookListCard>
                <ContinueReading></ContinueReading>
            </ScrollView>
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