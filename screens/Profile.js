import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Title, Caption, Text, TouchableRipple, TouchableOpacity }  from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { GetUserData } from '../components/Database.js';
import { useContext } from 'react';
import ColorSchemeContext from './../ColorSchemeContext';
import { firebase } from '../config';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = () => {
const userInfo = GetUserData();
const name = userInfo.firstName;
const lastName = userInfo.lastName;
const email = userInfo.email;
const location = userInfo.loc;
const phoneNumber = userInfo.phoneNum;

const map = new Map(Object.entries(userInfo.bookLists));
const booksFinished = map.get("Finished");
const { colorScheme } = useContext(ColorSchemeContext);

const navigation = useNavigation();
 // Function to sign out
 const handleSignOut = () => {
  firebase.auth().signOut();
};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5' }] }>
      <ScrollView>
      <View style={[styles.userInfoSection, {backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5'}]}>
        <View style={{flexDirection: 'column', marginTop: 15, alignItems:'center'}}>
          <Avatar.Image
            source={{
            
            }}
            size={150}
          />
          <View style={{marginLeft: 25} } >
          <Title style={[styles.title, {
            marginTop:15,
            marginBottom: 5,
            fontSize:30,
            color: colorScheme === 'dark' ? 'white' : 'black'
          }]}>{name} {lastName} </Title>
        </View>
        </View>
      </View>
    <View style={styles.userInfoSection}>
      <View style={styles.row}>
        <Icon name="map-marker-radius" color="#777777" size={30}/>
        <Text style={{color:"#777777", marginLeft: 20, fontSize:20}}>{location}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="phone" color="#777777" size={30}/>
        <Text style={{color:"#777777", marginLeft: 20, fontSize:20}}>{phoneNumber}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="email" color="#777777" size={30}/>
        <Text style={{color:"#777777", marginLeft: 20, fontSize:20}}>{email}</Text>
      </View>
    </View>

    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
          flex: 1,
        }]}>
        <Icon name="book" color="#997d9a" size={35}/>
        <Title style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>{booksFinished}</Title>
       <Caption style={{color: colorScheme === 'dark' ? 'white' : 'black'}}>Books Finished</Caption>
        </View>
    </View>

    <View style={styles.menuWrapper}>
      <TouchableRipple onPress={() => navigation.navigate('Home')}>
        <View style={styles.menuItem}>
          <Icon name="heart" color="#997d9a" size={30}/>
          <Text style={styles.menuItemText}>My Lists</Text>
        </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('Edit Your Profile')}>
  <View style={styles.menuItem}>
    <Icon name="account-edit" color="#997d9a" size={30}/>
    <Text style={styles.menuItemText}>Edit Your Profile</Text>
  </View>
</TouchableRipple>


<TouchableRipple onPress={() => navigation.navigate('Settings')}>
   <View style={styles.menuItem}>
     <Icon name="cog" color="#997d9a" size={30}/>
     <Text style={styles.menuItemText}>Settings</Text>
   </View>
 </TouchableRipple>

 {/* Sign out */}
<TouchableRipple onPress={handleSignOut} style={styles.button}>   
 <Text style={[styles.buttonText]}>Sign Out</Text>
</TouchableRipple>
</View>
</ScrollView>
  </SafeAreaView>
);
};

export default Profile;

const styles = StyleSheet.create({
container: {
  flex: 1,
justifyContent:'center',
padding:10,
  
},
userInfoSection: {
  paddingHorizontal: 30,
  marginBottom: 25,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
},
caption: {
  fontSize: 25,
  lineHeight: 14,
  fontWeight: '500',
},
row: {
  flexDirection: 'row',
  marginBottom: 10,
},
infoBoxWrapper: {
  borderBottomColor: '#dddddd',
  borderBottomWidth: 1,
  borderTopColor: '#dddddd',
  borderTopWidth: 1,
  flexDirection: 'row',
  height: 100,
},
infoBox: {
  width: '50%',
  alignItems: 'center',
  justifyContent: 'center',
},
menuWrapper: {
  marginTop: 10,
},
menuItem: {
  flexDirection: 'row',
  paddingVertical: 15,
  paddingHorizontal: 30,

},
menuItemText: {
  color: '#777777',
  marginLeft: 20,
  fontWeight: '600',
  fontSize: 20,
  lineHeight: 26,
},
buttonText: {
  color: '#76666',
  fontSize: 20,
  fontWeight: 'bold',
},
button: {

  marginTop: 50,
  marginBottom: 50,
  height: 45,
  width: 390,
  backgroundColor: '#C2B7C8',
  alignItems: 'center',
  justifyContent: 'center',
 
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
});

