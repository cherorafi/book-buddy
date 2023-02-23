import { Text, StyleSheet, SafeAreaView } from 'react-native'

const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            My Profile
        </Text>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100,
    }
})