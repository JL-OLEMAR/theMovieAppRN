import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'

export const Movie = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <IconButton icon='arrow-left' onPress={() => navigation.goBack()} />,
      headerRight: () => <IconButton icon='magnify' onPress={() => navigation.navigate('search')} />
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Movie</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})
