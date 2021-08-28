import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const Popular = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ left: 10 }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} activeOpacity={0.8}>
            <Icon name='menu-outline' size={29} color='#fff' />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ right: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('search')} activeOpacity={0.8}>
            <Icon name='search-outline' size={29} color='#fff' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Popular</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})
