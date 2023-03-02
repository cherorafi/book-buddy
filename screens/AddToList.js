import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native';


const AddToList = () => {
  const [name, setName] = useState('')
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        This is the view for adding a selected book to a list.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.dispatch(popAction)}
        style={styles.button}
      >
        <Text style={{fontsize: 20, fontWeight: 'bold'}}>
          Back/List selected
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AddToList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  }
})