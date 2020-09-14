import React from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Container, Button } from 'reactstrap'
import '../stylesheets/Watchlist.sass'

interface WatchlistProps {

}

const Watchlist: React.FC<WatchlistProps> = () => {

  return (
    <div>
      <Jumbotron>
        <Container>
          <h1 className="display-3">Movie Watchlist</h1>
          <Link to="/add"><Button color="success"><h3>Add movie</h3></Button></Link>
        </Container>
      </Jumbotron>
    </div>

  )
}

export default Watchlist;
