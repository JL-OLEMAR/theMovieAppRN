import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const Search = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ left: 15, borderRadius: 100 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Icon name='arrow-back-outline' size={33} color='#fff' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

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
