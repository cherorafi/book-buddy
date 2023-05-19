import React, {useEffect} from 'react';
import { Text, StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { GetBooks } from '../components/Firestore';
import SingleBookCard from '../components/SingleBookCard';
import { useContext } from 'react';
import ColorSchemeContext from './../ColorSchemeContext';
import { useNavigation } from '@react-navigation/native'

  // displays list of books based on the list names
  const BookListPage = ({ route }) => {
  const { listName } = route.params;
  //calls getbooks function
  let bookList = GetBooks(listName);

  const { colorScheme } = useContext(ColorSchemeContext);
  const navigation = useNavigation();
  //shows the title for each list screen
  useEffect(()=>{
    navigation.setOptions({title: listName});
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5' }]}>
        <FlatList
        data={bookList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SingleBookCard listName={listName} isbn={item}></SingleBookCard>
        )}
      />
    </SafeAreaView>
  )
}//displays the flat list of books and a SingleBookCard component for each book

export default BookListPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  },
  noBooksText: {
    fontSize: 28,
    fontStyle: 'italic',
    color:'#888',
    textAlign: 'center',
  },

})
