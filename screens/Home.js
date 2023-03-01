import { Text, StyleSheet, SafeAreaView } from 'react-native'
import CreateList from '../components/CreateReadingList'

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            My Books
        </Text>
        <CreateList/>
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