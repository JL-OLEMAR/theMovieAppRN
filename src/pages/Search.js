import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'

export const Search = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <IconButton icon='arrow-left' onPress={() => navigation.goBack()} />
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})
