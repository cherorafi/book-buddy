import { Text, StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { GetBooks } from '../components/Firestore';
import SingleBookCard from '../components/SingleBookCard';

const BookListPage = ({ route }) => {
  const { listName } = route.params;
  let bookList = GetBooks(listName);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bookList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SingleBookCard isbn={item}></SingleBookCard>
        )}
      />
    </SafeAreaView>
  )
}

export default BookListPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  }
})