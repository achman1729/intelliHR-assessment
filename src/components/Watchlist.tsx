import React from 'react'

interface Data {
    rating:number, 
    title:string, 
    date: string,
    posterUrl: string,
    genre: string
  }

interface WatchlistProps {
    movies: Data[]
  }

const Watchlist: React.FC<WatchlistProps>  = (props) => {
    console.log("this is from watchlist", props.movies)

    return (
        <div>
            {props.movies.map((item: Data) =>(
                <ol>
                    <li key={item.title}>{item.title}</li>
                    <li key={item.rating}>{item.rating}</li>
                    <li key={item.date}>{item.date}</li>

                </ol>
            ))}
        </div>
    )
}
export default Watchlist