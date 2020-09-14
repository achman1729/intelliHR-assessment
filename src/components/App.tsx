import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddMovie from '../pages/AddMovie'
import Watchlist from '../pages/Watchlist';
import useLocalStorage from '../hooks/localStorage'

interface Data {
  rating:number, 
  title:string, 
  date: string, 
  posterUrl: string, 
  genre: string
}

const App: React.FC = () => {
  // defining storage arrays for data

  const [ratingArr, setRatingArr] = useState([])
  const [titleArr, setTitleArr] = useState([])
  const [dateArr, setDateArr] = useState([])
  const [posterArr, setPosterArr] = useState([])
  const [genreArr, setGenreArr] = useState([])

  const getData = (data: Data) => {
    console.log("Data in app:", data)
  }

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Watchlist} />
        <Route path='/add' exact component={(props: Data) => <AddMovie {...props} getData={getData}/>} />
      </Switch>
    </Router>
  );
  }

export default App;


// const [displayName, setDisplayName] = useLocalStorage("displayName", "")

//   const getData = (displayName: string) => {
//     setDisplayName(displayName)
//   }

//   return (
//     <ApolloProvider client={apolloClient}>
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/" component={(props: any) => <Login {...props} getData={getData} />} />
//         <Route exact path="/home" component={(props: any) => <Dashboard {...props} displayName={displayName} />} />
