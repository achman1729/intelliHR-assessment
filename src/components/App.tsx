import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddMovie from '../pages/AddMovie'
import Watchlist from '../pages/Watchlist';
import useLocalStorage from '../hooks/localStorage'
import moment from 'moment';
import Axios from 'axios';

interface Data {
  rating:number, 
  title:string, 
  date: string,
  apiData: [] 
}

const App: React.FC = () => {
  // defining storage arrays for data

  const [movie, setDateMovie] = useState({
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
      // let genre = response.data.Genre
      // let posterUrl = response.data.Poster
      // console.log("api response data:", response)
      // return response.data
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  const handleTitle = (e: any) => {
    console.log(e.target.value)
    let title = e.target.value;

    setDateMovie(prevState => {
      return { ...prevState, title: title }
    })

  }
  const handleDate = (e: any) => {
    console.log(e.target.value)

    let date = e.target.value;

    setDateMovie(prevState => {
      return { ...prevState, date: date }
    })

  }
  const handleRating = (e: any) => {
    console.log(e.target.value)

    let rating = e.target.value;

    setDateMovie(prevState => {
      return { ...prevState, rating: rating }
    })

  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    apiData(movie.title)
  }

  return (
    <>
        {/* <Watchlist/> */}
        <AddMovie 
        handleTitle={handleTitle} 
        handleDate={handleDate} 
        handleRating={handleRating} 
        handleSubmit={handleSubmit} 
        rating={movie.rating}
        title={movie.title}
        date={movie.date}

        />
    </>
  );
  }

export default App;