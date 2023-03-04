import { Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import SingleBookCard from '../components/SingleBookCard';

const bookList = [
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