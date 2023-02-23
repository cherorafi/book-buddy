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
import Header from "./components/Header";
//import { Stack } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}
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
            <Tab.Screen name="Profile" component={Profile} 
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