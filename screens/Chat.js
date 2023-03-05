import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';



class Chat extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi, I’m BookBuddy! How can I help you?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'bookbuddy',
          avatar: ''
        }
      }
    ]
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#D2D6E4' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
    );
  }
}

export default Chat;