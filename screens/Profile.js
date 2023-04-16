// Whats left is profile pics **

import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Title, Caption, Text, TouchableRipple }  from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { GetUserData } from '../components/Database.js';
import { useContext } from 'react';
import ColorSchemeContext from './../ColorSchemeContext';

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


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5' }] }>
      <View style={[styles.userInfoSection, {backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5'}]}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
            
            }}
            size={80}
          />
          <View style={{marginLeft: 20} } >
          <Title style={[styles.title, {
            marginTop:15,
            marginBottom: 5,
            color: colorScheme === 'dark' ? 'white' : 'black'
          }]}>{name} {lastName} </Title>
        </View>
        </View>
      </View>
    <View style={styles.userInfoSection}>
      <View style={styles.row}>
        <Icon name="map-marker-radius" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{location}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="phone" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{phoneNumber}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="email" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{email}</Text>
      </View>
    </View>

    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
          flex: 1,
        }]}>
        <Icon name="book" color="#777777" size={20}/>
        <Title style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>{booksFinished}</Title>
       <Caption style={{color: colorScheme === 'dark' ? 'white' : 'black'}}>Books Finished</Caption>
        </View>
    </View>

    <View style={styles.menuWrapper}>
      <TouchableRipple onPress={() => navigation.navigate('Home')}>
        <View style={styles.menuItem}>
          <Icon name="heart" color="#FF6347" size={25}/>
          <Text style={styles.menuItemText}>My Lists</Text>
        </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('Edit Your Profile')}>
  <View style={styles.menuItem}>
    <Icon name="account-edit" color="#FF6347" size={25}/>
    <Text style={styles.menuItemText}>Edit Your Profile</Text>
  </View>
</TouchableRipple>
<TouchableRipple onPress={() => navigation.navigate('Settings')}>
   <View style={styles.menuItem}>
     <Icon name="cog" color="#FF6347" size={25}/>
     <Text style={styles.menuItemText}>Settings</Text>
   </View>
 </TouchableRipple>
</View>
  
  </SafeAreaView>
);
};

export default Profile;

const styles = StyleSheet.create({
container: {
  flex: 1,
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
  fontSize: 14,
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
  fontSize: 16,
  lineHeight: 26,
},
});

