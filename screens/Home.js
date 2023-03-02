import { Text, StyleSheet, SafeAreaView } from 'react-native'
import CreateList from '../components/MakeListButton'
import ShowReadingLists from '../components/ShowReadingLists'

// Added unstyled functional components to make lists and show them
// w/ real time changes

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            My Books
        </Text>
        <CreateList/>
        <ShowReadingLists/>
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