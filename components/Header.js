import { View, Text } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={{marginLeft:15}}>
      <Text style={{fontWeight:'bold', fontSize: 20, textAlignVertical: 'center'}}>
        {props.name}
      </Text>
    </View>
  )
}

export default Header