import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../config'

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
      if (email.length < 4){
        alert("Invalid email")
        setPart(1);
      } else if (password != confirm){
        alert("Passwords do not match, please check again.")
        setPart(1);
      } else if (user.length <= 3){
        alert("Username must be longer than 3 characters.")
        setPart(1);
      } else if (password.length < 1){
        alert("Password must be at least 1 character.")
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
      } else if (state.length < 1){
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
        // email, password, firstName, lastName, username, age, loc, phoneNum, likedGenres 
        const loc = city+", "+state;
        const number = "+"+countryCode+phoneNum;
        registerUser(email, password, name, lastName, user, age, loc, number, genreList);
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>

      {part === 1 && (
        <View>

          <ScrollView vertical={true} showsVerticalScrollIndicator={true}>

            <Text style={{ fontSize: 18, marginBottom: 10 }}>Part 1: Sign Up</Text>

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Email"
              autoCapitalize='none'
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
              onChangeText={(text) => setUser(text)}
              value={user}
              placeholder="Unique Username"
              autoCapitalize='none'
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Password"
              secureTextEntry
              autoCapitalize='none'
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
              onChangeText={(text) => setConfirm(text)}
              value={confirm}
              placeholder="Confirm Password"
              secureTextEntry
              autoCapitalize='none'
            />

            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10 }} onPress={handleNext}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Next</Text>
            </TouchableOpacity>

          </ScrollView>

        </View>
      )}

      {part === 2 && (
        <View>
          <ScrollView vertical={true} showsVerticalScrollIndicator={true}>

            <Text style={{ fontSize: 18, marginBottom: 10 }}>Part 2: Personal Information</Text>

            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder="First Name"
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
              onChangeText={(text) => setLastName(text)}
              value={lastName}
              placeholder="Last Name"
            />

            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
                onChangeText={(text) => setAge(text)}
                value={age}
                placeholder="Age"
                keyboardType="numeric"
            />

            <View style={{flexDirection: "row"}}>
              <TextInput
                style={{ height: 40, flex: 1, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 2, textAlign: 'center' }}
                onChangeText={(text) => setCity(text)}
                value={city}
                placeholder="City"
              />

              <TextInput
                style={{ height: 40, flex: 1, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
                onChangeText={(text) => setStates(text)}
                value={state}
                placeholder="State"
                autoCapitalize={"characters"}
              />
            </View>

            <View style={{flexDirection: "row"}}>
              <Text style={{height: 40, width: 20, backgroundColor: '#999', fontSize: 15, textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold'}}>+</Text>
              <TextInput
                style={{ height: 40, width: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 4, textAlign: 'center' }}
                onChangeText={(text) => setCountryCode(text)}
                value={countryCode}
                placeholder="1"
                keyboardType="numeric"
              />

              <TextInput
                style={{ height: 40, flex: 1, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
                onChangeText={(text) => setPhoneNum(text)}
                value={phoneNum}
                placeholder="Phone Number (Optional)"
                keyboardType="numeric"
              />
            </View>    

            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10 }} onPress={handleNext}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Next</Text>
            </TouchableOpacity>

          </ScrollView>
          
        </View>
      )}

      {part === 3 && (
          <View style={styles.container}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Part 3: Pick some genres you enjoy</Text>

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

            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginTop: 25, width: 100 }} onPress={handleNext}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Finish</Text>
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
  },
  selectedGenreButton: {
    backgroundColor: '#B9B9B9',
  },
  genreButtonText: {
    fontSize: 16,
  },
});