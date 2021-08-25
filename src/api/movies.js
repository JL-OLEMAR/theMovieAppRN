import { API_HOST, API_KEY, LANG } from '../utils/constants'

export const getNewsMoviesApi = (page = 1) => {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`

  return fetch(url) //eslint-disable-line
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      return result
    })
}

export const getGenreMovieApi = (page = 1) => {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`

  return fetch(url) //eslint-disable-line
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      return result
    })
}
