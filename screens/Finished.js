import { Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import SingleBookCard from '../components/SingleBookCard';

const bookList = [
  {
    id: 1,
    title: 'Sejarah Al Qur-an',
    author: 'JAboebakar Atjeh',
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
    // add more books here
];

const Finished = () => {
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

export default Finished

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      width: '100%',
    }
})