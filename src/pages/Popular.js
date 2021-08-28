import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import { Button, Text, Title } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import Icon from 'react-native-vector-icons/Ionicons'
import { map } from 'lodash'

import usePreferences from '../hooks/usePreferences'
import { getPopularMoviesApi } from '../api/movies'
import { BASE_PATH_IMG } from '../utils/constants'
import starDarkImg from '../assets/png/starDark.png'
import starLightImg from '../assets/png/starLight.png'
import noImage from '../assets/png/default-imgage.png'

export const Popular = ({ navigation }) => {
  const [movies, setMovies] = useState(null)
  const [showBtnMore, setShowBtnMore] = useState(true)
  const [page, setPage] = useState(1)
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
    getPopularMoviesApi(page).then((response) => {
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
      {movies && (
        map(movies, (movie, index) => (
          <Movie
            key={`item-${index}`}
            movie={movie}
            theme={theme}
            navigation={navigation}
          />
        ))
      )}
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

const Movie = ({ movie, theme, navigation }) => {
  const {
    id,
    poster_path: posterPath,
    title,
    release_date: realeaseDate,
    vote_count: voteCount,
    vote_average: voteAverage
  } = movie

  const goMovie = () => {
    navigation.navigate('movie', { id })
  }

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.moviePopular}>
        <View style={styles.left}>
          <Image
            style={styles.imageMovie}
            source={
            posterPath
              ? { uri: `${BASE_PATH_IMG}/w500${posterPath}` }
              : noImage
          }
          />
        </View>

        <View style={styles.right}>
          <Title>{title}</Title>
          <Text>{realeaseDate}</Text>
          <MovieRating theme={theme} voteCount={voteCount} voteAverage={voteAverage} />
        </View>

      </View>
    </TouchableWithoutFeedback>
  )
}

const MovieRating = ({ theme, voteCount, voteAverage }) => {
  const media = voteAverage / 2

  return (
    <View style={styles.containerRating}>
      <Rating
        type='custom'
        ratingImage={theme === 'dark' ? starDarkImg : starLightImg}
        ratingColor='#ffc285'
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 12, color: '#8697a5', marginTop: 5 }}>
        {voteCount} votos
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  moviePopular: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    marginRight: 20
  },
  imageMovie: {
    width: 100,
    height: 150
  },
  containerRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30
  },
  loadMore: {
    backgroundColor: 'transparent'
  }
})
