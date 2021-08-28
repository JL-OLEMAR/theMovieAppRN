import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { map } from 'lodash'

import { getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi } from '../api/movies'
import { Carousel } from '../components/Carousel'
import { CarouselMulti } from '../components/CarouselMulti'

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
      headerLeft: () => (
        <View style={[styles.icon, { left: 10 }]}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} activeOpacity={0.8}>
            <Icon name='menu-outline' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={[styles.icon, { right: 10 }]}>
          <TouchableOpacity onPress={() => navigation.navigate('search')} activeOpacity={0.8}>
            <Icon name='search-outline' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

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

        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    borderRadius: 100,
    width: 50
  },
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
