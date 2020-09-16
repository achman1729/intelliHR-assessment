import React, { useState,useEffect } from 'react'
import { Jumbotron, Container, Button } from 'reactstrap'
import AddMovie from './AddMovie'
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


interface WatchlistProps {

}

const Dashboard: React.FC<WatchlistProps> = () => {
  // clear the local storage on first render of the component
  localStorage.clear()
  
  // defining storage arrays for data
  let localMovieList
  let sortedMovieList
  // let movieList: any = {}
  let movies: Data[] = []

  const [movieList, setMovieList] = useState<Data[]>([])
  const [posterUrl, setPosterUrl] = useState("")
  const [genre, setGenre] = useState("")

  // request to omd API
  const apiData = async (t: string) => {

    let formatTitle = t.split(' ').join('+')
    
    await Axios.get(`http://www.omdbapi.com/?apikey=d37e246b&t=${formatTitle}`)
    .then((response) =>{
      setGenre(response.data.Genre)
      setPosterUrl(response.data.Poster)
      console.log("from apiData",response)
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  useEffect(() => {
    async function getToken() {

    }
    getToken();
 }, [genre])


  const getData = async(data: FormData) => {
    console.log("call")
    await apiData(data.title)
console.log("after call")
    movies.push({
      rating:data.rating,
      title:data.title,
      date:data.date,
      posterUrl: posterUrl,
      genre: genre
    })

    console.log("Data in getData:", data)
    console.log("MOVIE:", movies)
    console.log("set item")
    console.log("poster URL", posterUrl)
    console.log("genre", genre)
    localStorage.setItem("MovieList", JSON.stringify(movies))
    // ...movies will not add the empty value to MovieList
    setMovieList([...movies, ...movieList])
  }
  console.log("Movies from state", movieList)


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

export default Dashboard