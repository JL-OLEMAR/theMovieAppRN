import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Searchbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { size, map } from 'lodash'

import { getSearchMoviesApi } from '../api/movies'
import { BASE_PATH_IMG } from '../utils/constants'

const { width } = Dimensions.get('window')

export const Search = ({ navigation }) => {
  const [movies, setMovies] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (size(search) > 2) {
      getSearchMoviesApi(search).then((response) => {
        setMovies(response.results)
      })
    }
  }, [search])

  return (
    <SafeAreaView>
      <View style={styles.searchIcon}>
        <View style={[styles.icon, { left: 8 }]}>
          <Icon
            name='arrow-back'
            size={30}
            color='#fff'
            onPress={() => navigation.goBack()}
          />
        </View>

        <Searchbar
          placeholder='Busca tu película'
          iconColor='transparent'
          style={styles.input}
          onChangeText={(e) => setSearch(e)}
        />

      </View>
      <ScrollView>
        <View style={styles.container}>
          {map(movies, (movie, i) => (
            <Movie
              key={`item-${i}`}
              movie={movie}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
          ? (<Image
              style={styles.image}
              source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}` }}
             />
            )
          : (<Text>{title}</Text>)}

      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  searchIcon: {
    backgroundColor: '#15212b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 1
  },
  icon: {
    width: '10%',
    top: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  input: {
    width: '90%',
    paddingLeft: 0,
    paddingRight: 10,
    marginTop: -3,
    backgroundColor: '#15212b'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
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
  }
})
