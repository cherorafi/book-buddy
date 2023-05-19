/* 
A header component created towards the first few weeks of the App
To experiment with props/creating new components
Only used in Reigstration now
*/

import { View, Text } from 'react-native'
import React from 'react'

// Props passed down is the app name
const Header = (props) => {
  return (
    <View style={{marginLeft:50}}>
      <Text style={{fontWeight:'bold', fontSize:28 }}>
        {props.name}
      </Text>
    </View>
  )
}

export default Header