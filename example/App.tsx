import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Library from 'react-native-easing-keyframes'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{Library}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
