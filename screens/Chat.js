import { Text, StyleSheet, SafeAreaView } from 'react-native'

const Chat = () => {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            My Messages and other messages
        </Text>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100,
    }
})