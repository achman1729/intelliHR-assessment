import React from 'react'
import { Jumbotron, Container, Button } from 'reactstrap'
import '../stylesheets/Watchlist.sass'

interface Data {
  rating: number,
  title: string,
  date: string,
  apiData: any[]
}

// interface WatchlistProps {
//  movies: any
// }

const Watchlist: React.FC = () => {
  // console.log('movie data from watchlist', props.movies)
  let movieList: any
  let localMovieList = localStorage.getItem("MovieList")
  if (localMovieList) {
    movieList = JSON.parse(localMovieList)
  }

  const sortByDate = () => {
    if (movieList) {
      movieList.sort((a: any, b: any) => {
        let date1: any = new Date(a.date)
        let date2: any = new Date(b.date)
        return date2 - date1
      })
      console.log("Sorted movie list", movieList)
    } else {
      console.log("list is empty")
    }
  }
  console.log("movie list", movieList)

  const sortByRating = () => {

  }

  return (
    <div>

      <Button color="info" onClick={sortByDate}>Sort by Date</Button>
      <Button color="secondary" onClick={sortByRating}>Sort by Rating</Button>
      {/* {movieList.map((item: Data, index: number) => (
        <div>
          <img />
          <h3 key={index}>title: {item.title}</h3>
        </div>
  ))} */}


    </div>

  )
}

export default Watchlist
