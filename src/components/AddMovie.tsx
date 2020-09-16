import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form, FormGroup, Label, Input, Container, Button } from 'reactstrap'
import moment from 'moment'
import Axios from 'axios'
import History from 'history'
interface getData {
  (resData: {
    rating:number, 
    title:string, 
    date: string, 
    posterUrl: string, 
    genre: string
  }): void
}

interface addMovieProps {
  // history: any,
  getData: getData
}

const AddMovie: React.FC<addMovieProps> = (props) => {
  const [rating, setRating] = useState(1)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [posterUrl, setPosterUrl] = useState("")
  const [genre, setGenre] = useState("")

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
  }


  console.log("DATA: ", resData)
  props.getData(resData)

  return (

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
  )
}

export default React.memo(AddMovie)