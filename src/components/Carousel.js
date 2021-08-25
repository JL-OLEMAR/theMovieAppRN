import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Text, Title } from 'react-native-paper'
import CarouselSnap from 'react-native-snap-carousel'
import { BASE_PATH_IMG } from '../utils/constants'

const { width } = Dimensions.get('window')
const ITEM_WIDTH = Math.round(width * 0.7)

export const Carousel = ({ data }) => {
  return (
    <CarouselSnap
      layout='default'
      data={data}
      renderItem={(item) => <RenderItem data={item} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  )
}

const RenderItem = ({ data }) => {
  const { title, poster_path } = data.item //eslint-disable-line
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}` //eslint-disable-line

  return (
    <TouchableWithoutFeedback onPress={() => console.log('hola')}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Title style={styles.title}>{title}</Title>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 0.4
  },
  image: {
    width: '100%',
    height: 450,
    borderRadius: 20
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10
  }
})
