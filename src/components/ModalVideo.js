import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Modal } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { WebView } from 'react-native-webview'
import { getVideoMovieApi } from '../api/movies'

export const ModalVideo = ({ show, setShow, idMovie }) => {
  const [video, setVideo] = useState(null)

  useEffect(() => {
    getVideoMovieApi(idMovie).then((response) => {
      let idVideo = null
      response.results.forEach(video => {
        if (video.site === 'YouTube' && !idVideo) {
          idVideo = video.key
        }
      })
      setVideo(idVideo)
    })
  }, [])

  if (!video) return null

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0` }}
        style={{ width: 500 }}
      />
      <View style={styles.close}>
        <TouchableOpacity onPress={() => setShow(!show)} activeOpacity={0.8}>
          <Icon name='close' size={30} color='#fff' />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    backgroundColor: '#000',
    height: '120%'
  },
  close: {
    alignItems: 'center',
    backgroundColor: '#1ea1f2',
    borderRadius: 100,
    bottom: 100,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    width: 50
  },
  video: {
    alignSelf: 'stretch',
    height: 300
  }
})
