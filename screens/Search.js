import { Text, StyleSheet, SafeAreaView } from 'react-native'

const Search = () => {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Search
        </Text>
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100,
    }
})