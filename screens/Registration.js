//This file handles the front and back end for registering a new user

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../config'

// Prededined list of genres for the user to select in part 3 of registration
const genreList = [
  { id: 1, name: 'Fiction' },
  { id: 2, name: 'Romance' },
  { id: 3, name: 'Horror' },
  { id: 4, name: 'Mystery' },
  { id: 5, name: 'Nonfiction' },
  { id: 6, name: 'Fantasy' },
  { id: 7, name: 'Science Fiction' },
  { id: 13, name: 'Manga' },
  { id: 8, name: "Children's Literature" },
  { id: 9, name: 'Thriller' },
  { id: 10, name: 'Humor' },
  { id: 11, name: 'Action' },
  { id: 12, name: 'Poetry' },
];

const Registration = () => {
  // Handles each part
  const [part, setPart] = useState(1);

  // First Part
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // Second Part
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [state, setStates] = useState('');

  // Third Part
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Registers user
  registerUser = async (
    email, password, firstName, lastName, username, age, loc, phoneNum, likedGenres 
    ) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
          age,
          loc,
          phoneNum,
          likedGenres,
          username,
          bookLists: {"Want to Read":0, "Finished":0, "Currently Reading":0},
          "Want to Read": {"Initialize":"List"},
          "Finished": {"Initialize":"List"},
          "Currently Reading": {"Initialize":"List"}
        })
      })
      .catch((error) => {
        alert(error.message)
      })
    //})
    .catch((error => {
      alert(error.message)
    }))
  }

  // Button rendering with genre selection
  const handleGenreSelect = (genreName) => {
    if (selectedGenres.includes(genreName)) {
      setSelectedGenres(selectedGenres.filter((f) => f !== genreName));
    } else {
      setSelectedGenres([...selectedGenres, genreName]);
    }
  };

  // Screen handling
  const handleNext = () => {
    if (part < 3) {
      setPart(part + 1);
    }

    // Checks for part 1
    if (part == 1){
      if (email.length < 7){
        alert("Invalid email")
        setPart(1);
      } else if (password != confirm){
        alert("Passwords do not match, please check again.")
        setPart(1);
      } else if (user.length <= 3){
        alert("Username must be longer than 3 characters.")
        setPart(1);
      } else if (password.length < 6){
        alert("Password must be at least 6 characters.")
        setPart(1);
      }
    }

    // Checks for part 2
    if (part == 2){
      if (name.length < 1){
        alert("First name must be at least 1 character.")
        setPart(2);
      } else if (lastName.length < 1){
        alert("Last name must be at least 1 character.")
        setPart(2);
      } else if (age.length < 1){
        alert("Please enter a valid age.")
        setPart(2);
      } else if (city.length < 1){
        alert("Please enter a valid city.")
        setPart(2);
      } else if (state.length < 2){
        alert("Please enter a valid state.")
        setPart(2);
      } else if (state.length >= 3){
        alert("Please limit the state to 2 characters.")
        setPart(2);
      }
    }

    // Checks for part 3 and registration
    if (part == 3){
      if (selectedGenres.length < 1){
        alert("Please select at least 1 genre")
        setPart(3);
      } else {
        const loc = city+", "+state;
        const number = "+"+countryCode+phoneNum;
        registerUser(email, password, name, lastName, user, age, loc, number, genreList);
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Handles the view for part one
      Email, Username, and Password */}
      {part === 1 && (
        <View>
          <ScrollView vertical={true} showsVerticalScrollIndicator={true}>

            <Text style={{ marginBottom: 10, fontSize:30, fontWeight: 'bold',textAlign:'center'}}>Part 1: Sign Up</Text>

            <TextInput
              style={styles.partOneTextInput}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Email"
              autoCapitalize='none'
            />

            <TextInput
              style={styles.partOneTextInput}
              onChangeText={(text) => setUser(text)}
              value={user}
              placeholder="Unique Username"
              autoCapitalize='none'
            />

            <TextInput
              style={styles.partOneTextInput}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Password"
              secureTextEntry
              autoCapitalize='none'
            />

            <TextInput
              style={styles.partOneTextInput}
              onChangeText={(text) => setConfirm(text)}
              value={confirm}
              placeholder="Confirm Password"
              secureTextEntry
              autoCapitalize='none'
            />

            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={{fontWeight: 'bold', fontSize: 22, textAlign: 'center'}}>Next</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      )}

      {/* Handles the view for part two, Name, Age
      Location, and Phone Number */}
      {part === 2 && (
        <View>
          <ScrollView vertical={true} showsVerticalScrollIndicator={true}>

            <Text style={{ marginBottom: 10, fontSize:30, fontWeight: 'bold',textAlign:'center'}}>Part 2: Personal Information</Text>

            <TextInput
                style={styles.partTwoTextInput}
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder="First Name"
            />

            <TextInput
              style={styles.partTwoTextInput}
              onChangeText={(text) => setLastName(text)}
              value={lastName}
              placeholder="Last Name"
            />

            <TextInput
                style={styles.partTwoTextInput}
                onChangeText={(text) => setAge(text)}
                value={age}
                placeholder="Age"
                keyboardType="numeric"
            />

            <View style={{flexDirection: "row", justifyContent:'center', padding:15}}>
              <TextInput
                style={styles.locationTextInput}
                onChangeText={(text) => setCity(text)}
                value={city}
                placeholder="City"
              />

              <TextInput
                style={styles.locationTextInput}
                onChangeText={(text) => setStates(text)}
                value={state}
                placeholder="State"
                autoCapitalize={"characters"}
              />
            </View>

            <View style={{flexDirection: "row", alignSelf: 'center'}}>
              <TextInput style={{fontSize: 20, marginTop: 20, height: 50, width: 40, backgroundColor: '#D8D8D8', borderRadius: 100, padding: 12, textAlign:'center'}}>+</TextInput>
              <TextInput
                style={{ fontSize: 20, marginTop: 20, height: 50, width: 40, backgroundColor: '#D8D8D8', borderRadius: 50, padding: 12, textAlign:'center'}}
                onChangeText={(text) => setCountryCode(text)}
                value={countryCode}
                placeholder="1"
                keyboardType="numeric"
              />

              <TextInput
                style={{fontSize: 20, marginTop: 20, height: 50, width: 250, backgroundColor: '#D8D8D8', borderRadius: 50, padding: 12, textAlign:'center'}}
                onChangeText={(text) => setPhoneNum(text)}
                value={phoneNum}
                placeholder="Phone Number (Optional)"
                keyboardType="numeric"
              />
            </View>    

            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={{fontWeight: 'bold', fontSize: 22, textAlign: 'center'}}>Next</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      )}

      {/* Handles the view for part 3
      Allows the user to select genres they like */}
      {part === 3 && (
          <View style={styles.container}>
            <Text style={{ fontSize: 18, marginBottom: 10, fontSize:20, fontWeight: 'bold',textAlign:'center'}}>Part 3: Pick some genres you enjoy</Text>

            {/* Maps each element of the genres list as a pressable filter button 
            Once a button is selected, the view of the button becomes darker */}
            {genreList.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={[
                  styles.genreButton,
                  selectedGenres.includes(genre.name) && styles.selectedGenreButton,
                ]}
                onPress={() => handleGenreSelect(genre.name)}
              >
                <Text style={styles.genreButtonText}>{genre.name}</Text>
                
              </TouchableOpacity>
            ))}

            {/* Registers the user */}
            <TouchableOpacity style={{ backgroundColor: '#C2B7C8', padding: 10, marginTop: 25, width: 100 }} onPress={handleNext}>
              <Text style={{ color: 'black', textAlign: 'center' }}>Finish</Text>
            </TouchableOpacity>
          </View>
      )}

    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  genreButton: {
    backgroundColor: '#E9E9E9',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    minWidth: 100,
    alignItems: 'center',
   
    fontWeight: 'Bold',
  },

  selectedGenreButton: {
    backgroundColor: '#B9B9B9',
  },

  genreButtonText: {
    fontSize: 16,
  },

  partOneTextInput: { 
    fontSize: 20,
    marginTop: 25,
    height: 50,
    width: 320,
    backgroundColor: '#D8D8D8',
    borderRadius: 50,
    padding: 12,
    textAlign:'center',
    alignSelf: 'center'
  },

  partTwoTextInput: {
      fontSize: 20,
      marginTop: 20,
      height: 50,
      width: 320,
      backgroundColor: '#D8D8D8',
      borderRadius: 50,
      padding: 12,
      textAlign:'center',
      alignSelf: 'center' 
  },

  locationTextInput: {
    fontSize: 20,
    marginTop: 20,
    height: 50,
    width: 160,
    backgroundColor: '#D8D8D8',
    borderRadius: 50,
    padding: 12, 
    textAlign:'center'
  },

  nextButton: {
    marginTop: 30,
    height: 50,
    width: 320,
    backgroundColor: '#C2B7C8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    textAlign:'center',
    alignSelf: 'center'
  }
});