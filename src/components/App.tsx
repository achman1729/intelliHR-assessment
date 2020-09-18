import React, { useState, useEffect } from 'react'
import { Jumbotron, Container, Button } from 'reactstrap'
import AddMovie from './AddMovie'
import Watchlist from './Watchlist'

interface Data {
  rating: number,
  title: string,
  date: string,
  apiData: any[]
}

const moviesArr: Data[] = []

let avgRating: number = 0
let totalRuntime: number = 0

const stringToNumber = (runtime: string): number => {
  let strNum: string[]
  strNum = runtime.split(" ")
  return parseInt(strNum[0])
}

localStorage.clear()

const App: React.FC = () => {
  const [reload, setReload] = useState(false)

  let avgRatingList = localStorage.getItem("AvgRating")
  if (avgRatingList) {
    avgRating = JSON.parse(avgRatingList)
    }

  let totalRuntimeList = localStorage.getItem("TotalRuntime")
  if (totalRuntimeList) {
    totalRuntime = JSON.parse(totalRuntimeList)
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
    
    moviesArr.map((item: any) => {
      if (moviesArr.length>0){
      avgRating = (avgRating + item.rating) / moviesArr.length
      totalRuntime +=stringToNumber(item.apiData.Runtime)

      localStorage.setItem("AvgRating", JSON.stringify(avgRating))
      localStorage.setItem("TotalRuntime", JSON.stringify(totalRuntime))
      }
    })
    console.log("average rating: ", avgRating)
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
        </Container>
      </Jumbotron>
      <AddMovie getData={getData} />
      <hr />
      <Watchlist />
    </>
  )
}

export default App
