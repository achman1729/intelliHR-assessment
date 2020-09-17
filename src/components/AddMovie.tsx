import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Container, Button } from 'reactstrap'
import moment from 'moment'
import Axios from 'axios'
import { useEffect } from 'react'

interface getData {
  (movie: {
    rating:number, 
    title:string, 
    date: string,
    apiData: any[]
  }): void
}

interface addMovieProps {
  getData: getData
}

const AddMovie: React.FC<addMovieProps> = (props) => {

  const [movie, setMovie] = useState({
      rating:0,
      title:"",
      date:moment(new Date()).format('YYYY-MM-DD'),
      apiData:[]
  })

  // request to omd API
  const apiData = async (t: string) => {
    let formatTitle = t.split(' ').join('+')

    await Axios.get(`http://www.omdbapi.com/?apikey=d37e246b&t=${formatTitle}`)
    .then((response) =>{
      console.log("this is from axios:", response.data)
      let apiData = response.data

      setMovie((prevState) => {
        return { ...prevState, apiData: apiData }
      })
      // setMovie(movie.apiData= Data)
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  useEffect(() => {
    apiData(movie.title)
  }, [movie.title])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    props.getData(movie)
  }

  const handleTitle = (e: any) => {
    let title = e.target.value;
    setMovie((prevState) => {
      return { ...prevState, title: title }
    })
  }
  const handleDate = (e: any) => {
    let date = e.target.value;
    setMovie((prevState) => {
      return { ...prevState, date: date }
    })
  }
  const handleRating = (e: any) => {
    let rating: number = parseInt(e.target.value);
    setMovie((prevState) => {
      return { ...prevState, rating: rating }
    })
  }

  // console.log("Movie data in add movie", movie)

  return (

    <Container style={{ marginTop: "50px", marginBottom: "30px"}}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="movieTitle">Movie Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="e.g. Iron Man"
            value={movie.title}
            onChange={handleTitle}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleDate">Date</Label>
          <Input
            type="date"
            name="date"
            id="Date"
            placeholder="date placeholder"
            value={movie.date}
            onChange={handleDate}
          />
        </FormGroup>
        <FormGroup>
          <Label for="rating">Rating: {movie.rating}</Label>
          <Input 
          type="range" 
          id="movieRating" 
          name="rating" 
          min="0" 
          max="5" 
          value={movie.rating} 
          onChange={handleRating} />
        </FormGroup>
        <Button color="success">Add</Button>
      </Form>
    </Container>
  )
}

export default AddMovie