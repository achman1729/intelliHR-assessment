import React, { useState,useEffect } from 'react'
import { Jumbotron, Container, Button } from 'reactstrap'
import AddMovie from '../components/AddMovie'
import Watchlist from '../components/Watchlist'
import '../stylesheets/Watchlist.sass'
import Axios from 'axios'

interface Data {
  rating:number, 
  title:string, 
  date: string,
  posterUrl: string,
  genre: string
}

interface FormData {
  rating:number, 
  title:string, 
  date: string
}


interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = () => {
  // clear the local storage on first render of the component
  localStorage.clear()
  
  // defining storage arrays for data
  let localMovieList
  let sortedMovieList
  // let movieList: any = {}
  let movies: Data[] = []

  const [movieList, setMovieList] = useState<Data[]>([])
  

  const getData = (data: Data) => {

    movies.push({
      rating:data.rating,
      title:data.title,
      date:data.date,
      posterUrl: data.posterUrl,
      genre: data.genre
    })

    console.log("Data in getData:", data)
    console.log("MOVIE:", movies)
    // console.log("set item")
    // localStorage.setItem("MovieList", JSON.stringify(movies))
    // ...movies will not add the empty value to MovieList
  }
  // setMovieList([...movies, ...movieList])
  // console.log("Movies from state", movieList)


  // const sortByDate = () => {
  //   localMovieList = localStorage.getItem("MovieList")
  //   if (localMovieList){
  //     movieList = JSON.parse(localMovieList)
  //     movieList.sort((a: any, b: any) =>{
  //       let date1: any = new Date(a.date)
  //       let date2: any = new Date(b.date)
  //       return  date2 - date1
  //     })
  //     console.log("Sorted movie list", movieList)
  //   } else {
  //     console.log("list is empty")
  //   }
  // }

  return (
    <div>
      <Jumbotron style={{ height:"16vh"}}>
        <Container>
          <h1 className="display-3">Movie Watchlist</h1>
        </Container>
      </Jumbotron>
      <AddMovie getData={getData}/>
      {/* <Button color="info" onClick={sortByDate}>Sort by date</Button> */}
      <Watchlist movies={movieList} />
    </div>
  )
}

export default React.memo(Dashboard)