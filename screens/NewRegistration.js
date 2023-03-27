/*
same screens buttons to nav to dif parts
Quick what is app about page?

// Part 1
Google singup
Email signup
Phone # (not sign up but info, optional)
Name
Password


// Part 2
Set up profile,
avatar
location
gender
age

// Part 3
likes which genres button format
*/


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const RegistrationScreen = () => {
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
  const [phoneNum, setPhoneNum] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loc, setLoc] = useState('');

  const handleNext = () => {
    if (part < 3) {
      setPart(part + 1);
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
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
              onChangeText={(text) => setUser(text)}
              value={user}
              placeholder="Unique Username"
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Password"
              secureTextEntry
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
              onChangeText={(text) => setConfirm(text)}
              value={confirm}
              placeholder="Confirm Password"
              secureTextEntry
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
              onChangeText={(text) => setPhoneNum(text)}
              value={phoneNum}
              placeholder="Phone Number (Optional)"
            />

            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10 }} onPress={handleNext}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Next</Text>
            </TouchableOpacity>

          </ScrollView>
          
        </View>
      )}

      {part === 3 && (
        <View>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Part 3: Genres</Text>
          
          <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10 }} onPress={handleNext}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Finish</Text>
          </TouchableOpacity>

        </View>
      )}

    </View>
  );
};

export default RegistrationScreen;