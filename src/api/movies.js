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

export const getGenreMovieApi = (idGenre) => {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`

  return fetch(url) //eslint-disable-line
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      const arrayGenres = []
      idGenre.forEach((id) => {
        result.genres.forEach((item) => {
          if (item.id === id) arrayGenres.push(item.name)
        })
      })
      return arrayGenres
    })
}
