import React, { useState, useEffect } from 'react'
import { Jumbotron, Container} from 'reactstrap'
import AddMovie from './AddMovie'
import Watchlist from './Watchlist'
import { stringToNumber, mostWatchedGenre } from './functions'

interface Data {
  rating: number,
  title: string,
  date: string,
  apiData: any[]
}

const moviesArr: Data[] = []

let avgRating: number = 0
let totalRuntime: number = 0
let mWGenre: string = ''

localStorage.clear()

const App: React.FC = () => {
  const [reload, setReload] = useState(false)


  // retrieving from local storage for data to persist
  let avgRatingList = localStorage.getItem("AvgRating")
  if (avgRatingList) {
    avgRating = JSON.parse(avgRatingList)
  }

  let totalRuntimeList = localStorage.getItem("TotalRuntime")
  if (totalRuntimeList) {
    totalRuntime = JSON.parse(totalRuntimeList)
  }

  let mWGenreList = localStorage.getItem("AllGenres")
  if (mWGenreList) {
    mWGenre = JSON.parse(mWGenreList)
  }

  // getting data from AddMovie component
  const getData = (data: Data): void => {
    console.log("Data in app:", data)
    moviesArr.push({
      rating: data.rating,
      title: data.title,
      date: data.date,
      apiData: data.apiData
    })

    setReload(true)
    console.log("movies array: ", moviesArr)

    let ratingSum: number = 0
    totalRuntime = 0
    let allMovieGenres: string[] = []


    moviesArr.map((item: any) => {
      if (moviesArr.length > 0) {
        ratingSum += item.rating

        totalRuntime += stringToNumber(item.apiData.Runtime)

        allMovieGenres.push(item.apiData.Genre)

        console.log("all genres: ", allMovieGenres)

        localStorage.setItem("TotalRuntime", JSON.stringify(totalRuntime))
      }
    })
    mWGenre = mostWatchedGenre(allMovieGenres)
    console.log("most Watched Genre", mWGenre)
    avgRating = ratingSum / moviesArr.length
    console.log("average rating: ", avgRating)

    localStorage.setItem("AvgRating", JSON.stringify(avgRating))
    localStorage.setItem("AllGenres", JSON.stringify(mWGenre))
  }

  useEffect(() => {
    setReload(false)
    localStorage.setItem("MovieList", JSON.stringify(moviesArr))
  }, [reload])

  return (
    <>
      <Jumbotron style={{ padding: "2rem 4rem" }}>
        <h2>Movie Watchlist</h2>
        <Container style={{ display: "flex", height: "1.2vh", justifyContent: "space-evenly", marginTop: "2rem" }}>
          {avgRating === 0 ?
            <span><strong>Avg. rating: </strong> --- </span>
            :
            <span><strong>Avg. rating: </strong>{avgRating.toFixed(1)} </span>
          }
          <span><strong>Total runtime watched:</strong> {totalRuntime} mins</span>
          {mWGenre === "" ?
            <span><strong>Most watched Genre:</strong> --- </span>
            :
            <span><strong>Most watched Genre:</strong> {mWGenre}</span>
          }
        </Container>
      </Jumbotron>
      <AddMovie getData={getData} />
      <hr />
      <Watchlist />
    </>
  )
}

export default App
