import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import { firebase } from './config.js';


import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Home from "./screens/Home";
import Chat from "./screens/Chat";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import EditYourProfile from "./screens/EditYourProfile"
import Settings from "./screens/Settings";




import Header from "./components/Header";
import WantToRead from "./screens/WantToRead.js";
import Finished from "./screens/Finished.js";
//import { Stack } from "@react-navigation/stack";


const Stack = createStackNavigator();


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';



const Tab = createBottomTabNavigator();


const HomeStack = () => {
   return (
     <Stack.Navigator>
       <Stack.Screen name="Home" Options={{ headerShown: false }} component={Home} />
       <Stack.Screen name="WantToRead" component={WantToRead} />
       <Stack.Screen name="Finished" component={Finished} />
     </Stack.Navigator>
   );
};
const UserProfile = () => {
   return (
     <Stack.Navigator>
       <Stack.Screen name="Profile" Options={{ headerShown: false }} component={Profile} />
       <Stack.Screen name="Edit Your Profile" component={EditYourProfile} />
       <Stack.Screen name="Settings" component={Settings} />

     </Stack.Navigator>
   );
 };
 
function MyTabs() {
   return (
       <Tab.Navigator>
           <Tab.Screen name="Home " component={HomeStack}
               options={{
                   tabBarIcon: ({ color, size }) => (
                       <Ionicons name="ios-home" color={color} size={size} />
                   ),
                   headerTitle: () => <Header name="Book Buddy" />,
                   headerStyle: {
                       height: 150,
                       borderBottomLeftRadius: 50,
                       borderBottomRightRadius: 50,
                       backgroundColor: '#00e4d0',
                       shadowColor: '#000',
                       elevation: 25
                   }
               }}
           />
           <Tab.Screen name="Chat" component={Chat}
               options={{
                   tabBarIcon: ({ color, size }) => (
                       <Ionicons name="ios-chatbubble" color={color} size={size} />
                   ),
                   headerTitle: () => <Header name="Book Buddy" />,
                   headerStyle: {
                       height: 150,
                       borderBottomLeftRadius: 50,
                       borderBottomRightRadius: 50,
                       backgroundColor: '#00e4d0',
                       shadowColor: '#000',
                       elevation: 25
                   }
               }}
           />
           <Tab.Screen name="Search" component={Search}
               options={{
                   tabBarIcon: ({ color, size }) => (
                       <Ionicons name="ios-search" color={color} size={size} />
                   ),
                   headerTitle: () => <Header name="Book Buddy" />,
                   headerStyle: {
                       height: 150,
                       borderBottomLeftRadius: 50,
                       borderBottomRightRadius: 50,
                       backgroundColor: '#00e4d0',
                       shadowColor: '#000',
                       elevation: 25
                   }
               }}
           />
           <Tab.Screen name="Profile " component={UserProfile}
               options={{
                   tabBarIcon: ({ color, size }) => (
                       <Ionicons name="ios-person" color={color} size={size} />
                   ),
                   headerTitle: () => <Header name="Book Buddy" />,
                   headerStyle: {
                       height: 150,
                       borderBottomLeftRadius: 50,
                       borderBottomRightRadius: 50,
                       backgroundColor: '#00e4d0',
                       shadowColor: '#000',
                       elevation: 25
                   }
               }}
           />
   </Tab.Navigator>
 );


}




function App() {
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();


   // user state changes
   function onAuthStateChanged(user) {
       setUser(user);
       if (initializing) setInitializing(false);
   }


   useEffect(() => {
       const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
       return subscriber;
   }, []);


   if (initializing) return null;


   if (!user) {
       return (
           <Stack.Navigator>
               <Stack.Screen
                   name="Login"
                   component={Login}
                   options={{
                       headerTitle: () => <Header name="Book Buddy" />,
                       headerStyle: {
                           height: 150,
                           borderBottomLeftRadius: 50,
                           borderBottomRightRadius: 50,
                           backgroundColor: '#00e4d0',
                           shadowColor: '#000',
                           elevation: 25
                       }
                   }}
               />
               <Stack.Screen
                   name="Registration"
                   component={Registration}
                   options={{
                       headerTitle: () => <Header name="Book Buddy" />,
                       headerStyle: {
                           height: 150,
                           borderBottomLeftRadius: 50,
                           borderBottomRightRadius: 50,
                           backgroundColor: '#00e4d0',
                           shadowColor: '#000',
                           elevation: 25
                       }
                   }}
               />
           </Stack.Navigator>
       );
   }
   // else{
   //     return (
   //         <Stack.Navigator>
   //             <Stack.Screen
   //                 name="WantToRead"
   //                 component={WantToRead}
   //                 options={{
   //                     headerTitle: () => <Header name="Book Buddy" />,
   //                     headerStyle: {
   //                         height: 150,
   //                         borderBottomLeftRadius: 50,
   //                         borderBottomRightRadius: 50,
   //                         backgroundColor: '#00e4d0',
   //                         shadowColor: '#000',
   //                         elevation: 25
   //                     }
   //                 }}
   //             />
   //         </Stack.Navigator>
   //     )
   // }
   return (
       <MyTabs></MyTabs>
       // <Stack.Navigator>
       //     <MyTabs></MyTabs>
       // </Stack.Navigator>
   );
}


export default () => {
   return (
       <NavigationContainer>
           <App></App>
       </NavigationContainer>
   )
}
