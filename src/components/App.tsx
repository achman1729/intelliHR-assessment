import React, { useEffect } from 'react'
import { Jumbotron, Container, Button } from 'reactstrap'
import AddMovie from './AddMovie'
import Watchlist from './Watchlist'
import { useState } from 'react'

interface Data {
  rating: number,
  title: string,
  date: string,
  apiData: any[]
}

const moviesArr: Data[] = []

const App: React.FC = () => {
  const [reload, setReload] = useState(false)

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
  }


  useEffect(() => {
    setReload(false)
    localStorage.setItem("MovieList", JSON.stringify(moviesArr))
  }, [reload])

  return (
    <>
      <Jumbotron>
        <Container style={{height: "2vh"}}>
          <h2>Movie Watchlist</h2>
        </Container>
      </Jumbotron>
      <AddMovie getData={getData} />
      <hr />
      <Watchlist />
    </>
  )
}

export default App
