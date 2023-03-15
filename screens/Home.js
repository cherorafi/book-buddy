import { Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import BookListCard from '../components/BookListCard';
import { useNavigation } from '@react-navigation/native';
//import ContinueReading from '../components/CurrentlyReading';
import { GetAllLists, GetBookListMap, GetBooks } from '../components/Firestore';

const Home = () => {
  const bookLists = GetAllLists();
  const data = bookLists.map((key, index) => {
    let title = key.charAt(0).toUpperCase() + key.slice(1);
    return { key, title };
  });
  const navigation = useNavigation();
  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <BookListCard heading={item.title} identity={item.key} />}
        keyExtractor={(item, index) => index.toString()}
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