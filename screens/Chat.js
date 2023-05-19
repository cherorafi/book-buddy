/*
This file handles the front-end for the Chat screen
Allowing the user to communicate with a Dialogflow Agent

This file was created using https://www.youtube.com/watch?v=mXPp6t7yflA
Most of the code is from the video
*/

import React, { Component } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';  

// Sets up the chat profile for the Chatbot, with the ID and an image
const BookBuddy = {
  _id: 2,
  name: 'Book Buddy',
  avatar: 'https://st3.depositphotos.com/8950810/17657/v/600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg'
}

// Few errors messages to give to the user, if that Chatbot is unable to respond
const HandleErrors = [
  "Sorry I haven't learned that yet!",
  "Sorry, I don't know how to respond to that yet!",
  "Apologies, I'm not sure what that means right now!",
  "I can't respond to that yet, ask again at a later time?"
]

class Chat extends Component{
  // Creates the first 2 starter chats for the Chatbot at the beginning of every conversation
  state = {
    messages: [
      {_id: 2, text: 'My name is Book Buddy', createdAt: new Date(),
    user: BookBuddy},
      {_id: 1, text: 'Hi!', createdAt: new Date(),
    user: BookBuddy}
    ],
    id: 1,
    name: '',
  }

  // Uses a hook to check that the configuration settings to communicate with the Dialogflow agent is set up
  componentDidMount(){
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  // Parses the data sent by the Dialogflow agent
  handleGoogleResponse(result){
    // If a proper response is given then parses the JSON data to pass just the Agent Response
    try {
      let text = result.queryResult.fulfillmentMessages[0].
      text.text[0];
      this.sendBotResponse(text);
    // If the response given is not adequate, then picks a random error message to give to the user
    } catch (error) {
      let num = Math.floor(Math.random()*10)%4
      this.sendBotResponse(HandleErrors[num])
    }
    
  }

  // Adds the agent's response to the existing chat by appending it and shows it on the screen
  sendBotResponse(text){
    let msg = {
      _id: this.state.messages.length + 1,
      text, 
      createAt: new Date(),
      user: BookBuddy
    }

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.
      messages, [msg]),
    }));
  }

  // Handles the users responses by taking the chat sent by the user
  // And requesting a response from Dialogflow
  onSend(messages = []){
    // First adds the user's response to the existing chat
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.
      messages, messages)
    }))

    let message = messages[0].text;
    // API call
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => this.handleGoogleResponse(console.log(error))
    )
  }

  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {/* Utilizies the Gifted Chat Component which can take an array of messages
        And render the UI to show the messages in the form of a Chat Screen */}

        {/* At the bottom of the screen, has an input field to send messages */}
        <GiftedChat messages={this.state.messages}
        onSend={(message) => this.onSend(message)}
        user={{_id: 1}}/>
      </View>
    )
  }
}

export default Chat;