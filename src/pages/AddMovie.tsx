import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Container, Button } from 'reactstrap'

// interface getData {
//   (resData: {
//     rating:number, 
//     title:string, 
//     date: string, 
//     posterUrl: string, 
//     genre: string
//   }): void
// }

interface addMovieProps {
  // history: any,
  // getData: getData
  handleTitle: any,
  handleDate: any,
  handleRating: any,
  handleSubmit: any,
  rating: number,
  title: string,
  date: string

}

const AddMovie: React.FC<addMovieProps> = ({
  handleTitle, 
  handleDate, 
  handleRating, 
  handleSubmit,
  rating,
  title,
  date 
}) => {

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
            value={date}
            onChange={handleDate}
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
          onChange={handleRating} />
        </FormGroup>
        <Button color="success">Add</Button>
      </Form>
    </Container>
  )
}

export default AddMovie