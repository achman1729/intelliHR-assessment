import React, { useState,useEffect } from 'react'
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input,} from 'reactstrap'
// import AddMovie from '../components/AddMovie'
// import Watchlist from '../components/Watchlist'
import '../stylesheets/Watchlist.sass'
import Axios from 'axios'
import moment from 'moment'


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
  const [rating, setRating] = useState(1)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [posterUrl, setPosterUrl] = useState("")
  const [genre, setGenre] = useState("")
  


    // console.log("set item")
    // localStorage.setItem("MovieList", JSON.stringify(movies))
    // ...movies will not add the empty value to MovieList
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



  const data = {
    genre: "",
    posterUrl: "",
  }

  const resData = {
    genre: genre,
    posterUrl: posterUrl,
    rating: rating,
    title: title,
    date: date
  }

  // request to omd API
  const apiData = async (t: string) => {
    let formatTitle = t.split(' ').join('+')

    await Axios.get(`http://www.omdbapi.com/?apikey=d37e246b&t=${formatTitle}`)
    .then((response) =>{
      console.log("this is from axios:", response.data.Genre)
      data.genre = response.data.Genre
      data.posterUrl = response.data.Poster
      console.log("this object data:", data)
      // return response.data
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    await apiData(title)
    setGenre(data.genre)
    setPosterUrl(data.posterUrl)
    // props.history.push("/")
    movies.push(resData)
    console.log("movies", movies)
  }


  console.log("DATA: ", resData)


  return (
    <div>
      <Jumbotron style={{ height:"16vh"}}>
        <Container>
          <h1 className="display-3">Movie Watchlist</h1>
        </Container>
      </Jumbotron>
      {/* <AddMovie getData={getData}/> */}
      {/* <Button color="info" onClick={sortByDate}>Sort by date</Button> */}
      <Container style={{ marginTop: "100px" }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for=""><h3>Add a new movie</h3></Label>
        </FormGroup>
        <FormGroup>
          <Label for="movieTitle">Movie Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="e.g. Iron Man"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleDate">Date</Label>
          <Input
            type="date"
            name="date"
            id="Date"
            placeholder="date placeholder"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="rating">Rating: {rating}</Label>
          <Input 
          type="range" 
          id="movieRating" 
          name="rating" 
          min="0" 
          max="5" 
          value={rating} 
          onChange={e => setRating(parseInt(e.target.value))} />
        </FormGroup>
        <Button color="success">Add</Button>
      </Form>
    </Container>
      {/* <Watchlist movies={movieList} /> */}
    </div>
  )
}

export default React.memo(Dashboard)