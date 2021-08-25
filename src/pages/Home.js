import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { IconButton, Title } from 'react-native-paper'

import { getNewsMoviesApi } from '../api/movies'
import { Carousel } from '../components/Carousel'

export const Home = ({ navigation }) => {
  const [newMovies, setNewMovies] = useState(null)

  useEffect(() => {
    getNewsMoviesApi().then((response) => {
      setNewMovies(response.results)
    })
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <IconButton icon='menu' onPress={() => navigation.toggleDrawer()} />,
      headerRight: () => <IconButton icon='magnify' onPress={() => navigation.navigate('search')} />
    })
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas películas</Title>
          <Carousel data={newMovies} />
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22
  }
})
