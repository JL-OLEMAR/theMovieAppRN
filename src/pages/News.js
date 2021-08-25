import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'

export const News = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <IconButton icon='menu' onPress={() => navigation.toggleDrawer()} />,
      headerRight: () => <IconButton icon='magnify' onPress={() => navigation.navigate('search')} />
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>News</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})