import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';  

const BOT = {
  _id: 2,
  name: 'Book Buddy',
  avatar: 'https://st3.depositphotos.com/8950810/17657/v/600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg'
}

class Chat extends Component{
  state = {
    messages: [
      {_id: 2, text: 'My name is Book Buddy', createdAt: new Date(),
    user: BOT},
      {_id: 1, text: 'Hi!', createdAt: new Date(),
    user: BOT}
    ],
    id: 1,
    name: '',
  }

  componentDidMount(){
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result){
    let text = result.queryResult.fulfillmentMessages[0].
    text.text[0];

    this.sendBotResponse(text);
  }

  sendBotResponse(text){
    let msg = {
      _id: this.state.messages.length + 1,
      text, 
      createAt: new Date(),
      user: BOT
    }

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.
      messages, [msg]),
    }));
  }

  onSend(messages = []){
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.
      messages, messages)
    }))

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    )
  }

  onQuickReply(quickReply){
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.
      messages, quickReply)
    }))

    let message = quickReply[0].value;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    )
  }

  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <GiftedChat messages={this.state.messages}
        onSend={(message) => this.onSend(message)}
        onQuickReply={(quickReply) => this.onQuickReply
        (quickReply)}
        user={{_id: 1}}/>
      </View>
    )
  }
}

export default Chat;