import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Rating } from 'react-native-ratings'
import { Title, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { map } from 'lodash'

import { getMovieByIdApi } from '../api/movies'
import usePreferences from '../hooks/usePreferences'
import { ModalVideo } from '../components/ModalVideo'
import { BASE_PATH_IMG } from '../utils/constants'
import starDark from '../assets/png/starDark.png'
import starLight from '../assets/png/starLight.png'

export const Movie = ({ navigation, route }) => {
  const { id } = route.params
  const [movie, setMovie] = useState(null)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    getMovieByIdApi(id).then((response) => {
      setMovie(response)
    })
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => (
        <View style={styles.iconBut}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Icon name='arrow-back-outline' size={29} color='#fff' />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.iconBut}>
          <TouchableOpacity onPress={() => navigation.navigate('search')} activeOpacity={0.8}>
            <Icon name='search-outline' size={29} color='#fff' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [])

  if (!movie) return null

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTrailer showVideo={showVideo} setShowVideo={setShowVideo} />
        <MovieTitle movie={movie} />
        <MovieRating voteCount={movie.vote_count} voteAverage={movie.vote_average} />
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={[styles.overview, { marginBottom: 30 }]}>
          Fecha de lanzamiento: {movie.release_date}
        </Text>
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
    </>
  )
}
const MovieImage = ({ posterPath }) => {
  return (
    <View style={styles.containerPoster}>
      <Image
        style={styles.poster}
        source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}` }}
      />
    </View>
  )
}

const MovieTrailer = ({ showVideo, setShowVideo }) => {
  return (
    <View style={styles.containerPlay}>
      <TouchableOpacity onPress={() => { setShowVideo(!showVideo) }} activeOpacity={0.8}>
        <View style={styles.play}>
          <Icon name='play-circle-outline' size={60} color='#000' />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const MovieTitle = ({ movie: { title, genres } }) => {
  return (
    <View style={styles.containerInfo}>
      <Title>{title}</Title>

      <View style={styles.containerGeneros}>
        {genres && (
          map(genres, (genre) => (
            <Text key={genre.id} style={styles.genreName}>
              {genre.name}
            </Text>
          )))}
      </View>
    </View>
  )
}

const MovieRating = ({ voteCount, voteAverage }) => {
  const { theme } = usePreferences()
  const media = voteAverage / 2

  return (
    <View style={styles.containerRating}>
      <Rating
        type='custom'
        ratingImage={theme === 'dark' ? starDark : starLight}
        ratingColor='#ffc205'
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 16, marginRight: 12, marginLeft: -9 }}>{media}</Text>
      <Text style={{ fontSize: 12, color: '#8697a5' }}>{voteCount} votos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  iconBut: {
    marginHorizontal: 10,
    zIndex: 2
  },
  containerPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
    zIndex: -1
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  containerPlay: {
    marginTop: -40,
    marginRight: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  play: {
    width: 60,
    height: 61,
    backgroundColor: '#fff',
    borderRadius: 100
  },

  containerInfo: {
    marginHorizontal: 30
  },
  containerGeneros: {
    flexDirection: 'row'
  },
  genreName: {
    marginRight: 10,
    color: '#8697a5'
  },
  containerRating: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  overview: {
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: 'justify',
    color: '#8697a5'
  }
})
