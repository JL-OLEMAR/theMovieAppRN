import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { map } from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons'

import usePreferences from '../hooks/usePreferences'
import { getNewsMoviesApi } from '../api/movies'
import { BASE_PATH_IMG } from '../utils/constants'

const { width } = Dimensions.get('window')

export const News = ({ navigation }) => {
  const [movies, setMovies] = useState(null)
  const [page, setPage] = useState(1)
  const [showBtnMore, setShowBtnMore] = useState(true)
  const { theme } = usePreferences()

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

  useEffect(() => {
    getNewsMoviesApi(page).then((response) => {
      const totalPages = response.total_pages

      if (page < totalPages) {
        if (!movies) {
          setMovies(response.results)
        } else {
          setMovies([...movies, ...response.results])
        }
      } else {
        setShowBtnMore(false)
      }
    })
  }, [page])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {movies && (
          map(movies, (movie, i) => (
            <Movie
              key={`item-${i}`}
              movie={movie}
              navigation={navigation}
              theme={theme}
            />
          ))
        )}
      </View>
      {showBtnMore && (
        <Button
          mode='contained'
          contentStyle={styles.loadMoreContainer}
          style={styles.loadMore}
          labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
          onPress={() => setPage(page + 1)}
        >
          Cargar mas...
        </Button>
      )}
    </ScrollView>
  )
}

const Movie = ({ movie, navigation }) => {
  const { id, title, poster_path: posterPath } = movie

  const goMovie = () => {
    navigation.navigate('movie', { id })
  }

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {posterPath
          ? (
            <Image
              style={styles.image}
              source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}` }}
            />
            )
          : (
            <Text>{title}</Text>
            )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30
  },
  loadMore: {
    backgroundColor: 'transparent'
  }
})
