import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const search = () => {
  searchBtnEl.addEventListener('click', async () => { searchMovies(true) })
  searchEl.addEventListener('keypress', async e => {
    if (e.key === 'Enter') {
      searchMovies(true)
    }
  })
}

const searchEl = document.querySelector('input')
const searchBtnEl = document.querySelector('button.btn')
const moviesEl = document.querySelector('ul.movies')
let page = 1
let count = 1

// 영화 검색
const searchMovies = async (isFirst) => {
  if (isFirst) {
    moviesEl.innerHTML = '' // movies init
    page = 1
  }
  const movies = await _fetchMovies(searchEl.value, page)
  _loading() // 로딩 이미지 제거
  const { Search, totalResults } = movies.data
  page += 1

  const uniqSearch = _uniqBy(Search, 'imdbID') // 중복된 영화 제거
  
  // 고유화 된 id값을 기준으로, 영화 정보 화면에 뿌리기
  uniqSearch.forEach(movie => { 
    const creatMovieEl = document.createElement('li')
    const moviePoster = _requestDiffSizeImage(`${movie.Poster}`) // 포스터 해상도 높이기

    creatMovieEl.innerHTML = `
      <div 
        style="background-image: url(${moviePoster !== 'N/A' || '' ? moviePoster : './images/no-image.png' });" 
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

  // 영화 추가 요청
  if (count < parseInt(totalResults) / 10 ) {
    infiniteScroll()
    count += 1
  }
}

// 해상도 높은 이미지 요청
const _requestDiffSizeImage = (url, size = 700) => url.replace('SX300', `SX${size}`)

// API를 통해 영화 정보 가져오기
const _fetchMovies = (name, page) => {
  const OMDB_API_KEY = '7035c60c'
  _loading(true)
  return new Promise((resolve, reject) => {
    axios.get(`https://www.omdbapi.com?apikey=${OMDB_API_KEY}&s=${name}&page=${page}`)
      .then(res => {
        switch (res.data.Error) {
          case 'Too many results.': reject(_errorHandler(true))
            break
          case 'Movie not found!': reject(_errorHandler())
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

// 로딩 관련
const creatDivEl = document.createElement('div')
const _loading = (add) => {
  if (add) {
    creatDivEl.innerHTML = `<div class="spinner-border text-primary"></div>` 
    moviesEl.append(creatDivEl)  // 로딩 이미지 넣기
  } else {
    creatDivEl.innerHTML = ''
  }
}

// 에러 관련
const _errorHandler = (caseT) => {
  moviesEl.innerHTML = ''
  if (caseT) {
    creatDivEl.innerHTML = `<p>검색된 결과가 너무 많습니다😅</p>`
  } else {
    creatDivEl.innerHTML = `<p>해당 영화에 대한 정보를 찾을 수 없습니다😭</p>`
  }
  moviesEl.append(creatDivEl)
}

// 무한 스크롤 관련
const infiniteScroll = () => {
  const movieEl = document.querySelectorAll('.movie')

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target)
        searchMovies()
      }
      console.log(entry)
    })
  }, { threshold: 1 })
  io.observe(movieEl[movieEl.length - 1])
}


export default search 