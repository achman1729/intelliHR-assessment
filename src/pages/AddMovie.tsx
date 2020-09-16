import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Label, Input, Container, Button } from 'reactstrap'
import moment from 'moment'
import Axios from 'axios'

interface getData {
  (resData: {
    rating:number, 
    title:string, 
    date: string
  }): void
}

interface addMovieProps {

  getData: getData
}

const AddMovie: React.FC<addMovieProps> = (props) => {
  const [rating, setRating] = useState(1)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

  const resData = {
    rating: rating,
    title: title,
    date: date
  }
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    props.getData(resData)
  }
  
  return (

    <Container style={{ marginTop: "70px", marginBottom: "50px", width:"35vw"}}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
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

export default AddMovie