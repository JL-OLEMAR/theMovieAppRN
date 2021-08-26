import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { IconButton, Title } from 'react-native-paper'
import { map } from 'lodash'

import { getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi } from '../api/movies'
import { Carousel } from '../components/Carousel'

export const Home = ({ navigation }) => {
  const [newMovies, setNewMovies] = useState(null)
  const [genreList, setGenreList] = useState([])
  const [genreSelected, setGenreSelected] = useState(28)
  const [genreMovies, setGenreMovies] = useState(null)

  useEffect(() => {
    getNewsMoviesApi().then((response) => {
      setNewMovies(response.results)
    })
  }, [])

  useEffect(() => {
    getAllGenresApi().then((response) => {
      setGenreList(response.genres)
    })
  }, [])

  useEffect(() => {
    getGenreMoviesApi(genreSelected).then((response) => {
      setGenreMovies(response.results)
    })
  }, [genreSelected])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <IconButton icon='menu' onPress={() => navigation.toggleDrawer()} />,
      headerRight: () => <IconButton icon='magnify' onPress={() => navigation.navigate('search')} />
    })
  }, [])

  const onChangeGenre = (newGenreId) => {
    setGenreSelected(newGenreId)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas películas</Title>
          <Carousel data={newMovies} navigation={navigation} />
        </View>
      )}

      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Películas por género</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}
        >
          {map(genreList, (genre) => (
            <Text
              key={genre.id}
              onPress={() => onChangeGenre(genre.id)}
              style={[
                styles.genreName,
                { color: genre.id !== genreSelected ? '#8697a5' : '#fff' }
              ]}
            >
              {genre.name}
            </Text>
          ))}
        </ScrollView>
      </View>
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
  },
  genres: {
    marginBottom: 40
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10
  },
  genreName: {
    marginRight: 20,
    fontSize: 16
  }
})
