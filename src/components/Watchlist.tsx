import moment from 'moment'
import React, {useState, useEffect} from 'react'
import { Button, Table } from 'reactstrap'
import '../stylesheets/Watchlist.sass'

let movieList: any


const Watchlist: React.FC = () => {
  
  const [reload, setReload] = useState(false)
  
  // getting movie list from local storage
  let localMovieList = localStorage.getItem("MovieList")
  if (localMovieList) {
    movieList = JSON.parse(localMovieList)
    }
  const sortByDate = () => {
    if (movieList) {
      movieList.sort((a: any, b: any) => {
        let date1: any = new Date(a.date)
        let date2: any = new Date(b.date)
        return date2 - date1
      })
      console.log("Sorted movie list", movieList)
      localStorage.setItem("MovieList", JSON.stringify(movieList))
    } else {
      console.log("list is empty")
    }
    setReload(true)
  }
  
  const sortByRating = () => {
    if (movieList) {
      movieList.sort((a: any, b: any) => {
        return a.rating - b.rating
      })
      console.log("Sorted rating list", movieList)
      localStorage.setItem("MovieList", JSON.stringify(movieList))
    } else {
      console.log("list is empty")
    }
    setReload(true)
  }

  console.log("movie list", movieList)
  console.log(reload)

  useEffect(()=> {
    setReload(false)
  }, [movieList])
  
  return (
    <div>
      <div className="filters">
        <Button color="info" onClick={sortByDate}  style={{marginLeft: "30px" }}>Sort by Date</Button>
        <Button color="secondary" onClick={sortByRating} style={{marginLeft: "30px" }}>Sort by Rating</Button>
      </div>

      <Table borderless>
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
          movieList.length === 0 ? <span>No movies added</span>
            :
            movieList.map((item: any) => (
              <tr>
                <td>
                  <img src={item.apiData.Poster} width="250" height="330" />
                </td>
                <td>
                  <h3 key={item.title}>title: {item.title}</h3>
                  <h4>Rating: {item.rating}</h4>
                  <h4>Genre: {item.apiData.Genre}</h4>
                  <h5>Date watched: {moment(item.date).format('DD-MM-YYYY')}</h5>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>

  )
}

export default Watchlist
