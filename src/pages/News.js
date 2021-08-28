import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const News = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ left: 15, borderRadius: 100 }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} activeOpacity={0.8}>
            <Icon name='menu-outline' size={33} color='#fff' />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ right: 15, borderRadius: 100 }}>
          <TouchableOpacity onPress={() => navigation.navigate('search')} activeOpacity={0.8}>
            <Icon name='search-outline' size={33} color='#fff' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

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
