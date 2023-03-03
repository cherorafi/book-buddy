import { Text, StyleSheet, SafeAreaView } from 'react-native'
import CreateList from '../components/MakeList'
import ShowReadingLists from '../components/ShowReadingLists'
import AddBook from '../components/AddBook'

// Added unstyled functional components to make lists and show them
// w/ real time changes

const Home = () => {
    /* for testing u can add in the view
    <CreateList/>                // will display a button to create a new reading list

    <ShowReadingLists/>          // will show a list of user's current reading lists

    <AddBook bookName="Hamlet"/> // should be on a book's page, 
                                 // will bring out a menuu of current lists
                                 // to pick from, pass in name of book for now
    */
    return (
        <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            My Books
        </Text>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100,
    }
})