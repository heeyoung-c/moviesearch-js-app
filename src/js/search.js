import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const search = () => {
  searchBtnEl.addEventListener('click', async () => { searchMovies() })
}

const searchEl = document.querySelector('input')
const searchBtnEl = document.querySelector('button.btn')
const moviesEl = document.querySelector('ul.movies')

const searchMovies = async () => {
  const movies = await _getMovie(searchEl.value)
  const { Search, totalResults } = movies.data

  // 중복된 영화 제거
  const uniqSearch = _uniqBy(Search, 'imdbID')

  // movies init
  moviesEl.innerHTML = ''

  // search init
  searchEl.value = ''
  
  // 고유화 된 id값을 기준으로, 영화 정보 화면에 뿌리기
  uniqSearch.forEach(movie => {
    const creatMovieEl = document.createElement('li')

    // 포스터 해상도 높이기
    const moviePoster = _requestDiffSizeImage(`${movie.Poster}`)

    creatMovieEl.innerHTML = `
      <div 
        style="background-image: url(${moviePoster!=='N/A' ? moviePoster : NO_IMAGE });" 
        class="movie">
        <div class="info">
          <div class="year">
            ${movie.Year}
          </div>
          <div class="title">
            ${movie.Title}
          </div>
        </div>
      </div>
    `
    moviesEl.append(creatMovieEl)
  })
}

// 해상도 높은 이미지 요청
const _requestDiffSizeImage = (url, size = 700) => url.replace('SX300', `SX${size}`)

// 영화 정보 가져오기
const _getMovie = name => {
  const OMDB_API_KEY = '7035c60c'

  // 로딩 이미지 넣기
  moviesEl.innerHTML = `
  <div class="spinner-border text-primary"></div>
  `

  return new Promise((resolve, reject) => {
    axios.get(`https://www.omdbapi.com?apikey=${OMDB_API_KEY}&s=${name}&page=1`)
      .then(res => {
        if (res.data.Error) {
          reject(
            moviesEl.innerHTML = `
              <p>해당 영화에 대한 정보를 찾을 수 없습니다</p>
            `
          )
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

// 영화 상세 정보 가져오기
const _getMovieWithId = async id => {
  const OMDB_API_KEY = '7035c60c'
  const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`)
  return res
}




export default search 