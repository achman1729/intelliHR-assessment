import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Container, Button } from 'reactstrap'
import moment from 'moment'

interface FormData {
    rating:number, 
    title:string, 
    date: string
  }

interface MovieFormProps {

}

const MovieForm: React.FC<MovieFormProps> = (props) => {


    const [rating, setRating] = useState(1)
    const [title, setTitle] = useState("")
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

    let formData: FormData[] = []

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        formData.push({
            rating: rating,
            title: title,
            date: date
        })
    }
    console.log("form data",formData)


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

export default React.memo(MovieForm)
