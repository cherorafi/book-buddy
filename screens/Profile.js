import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//new 
import {
  Avatar,
  Title,
  Caption,
  Text, 
  TouchableRipple,
}  from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';

import {GetFirstName} from "../components/Firestore.js";
import {GetLastName} from "../components/Firestore.js";
import {GetEmail} from "../components/Firestore.js";

const Profile = () => {
  
  const name = GetFirstName();
  const lastName = GetLastName();
  const email = GetEmail();
  const [city, setCity] = useState("Queens");
  const [state, setState] = useState("New York");
  const [phoneNumber, setPhoneNumber] = useState("+000-111-2222");
  const [booksFinished, setBooksFinished] = useState(10);
  const [minutesRead, setMinutesRead] = useState(12);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{name} {lastName} </Title>
           
           
           
            


           
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{city}, {state}</Text>
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
            borderRightWidth: 1
          }]}>
          <Icon name="book" color="#777777" size={20}/>
            <Title>{booksFinished}</Title>
            <Caption>Books Finished</Caption>
          </View>
          <View style={styles.infoBox}>
          <Icon name="book-clock-outline" color="#777777" size={20}/>
            <Title>{minutesRead}</Title>
            <Caption>Minutes Read</Caption>
            </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>My Favorites</Text>
          </View>
          </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
          </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("Settings")}>
          <View style={styles.menuItem}>
            <Icon name="cog" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
            </View>
          
          </TouchableRipple>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} >
          </TouchableOpacity> 
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
