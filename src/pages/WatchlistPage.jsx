import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useWatchlist } from "../contexts/WatchlistContext";

function WatchlistPage() {
  const { watchlist, removeFromWatchlist, moveToWatched } = useWatchlist();

  return (
    <Container className="page-content">
      <h2>My Watchlist ({watchlist.length})</h2>

      {watchlist.length === 0 ? (
        <p>Your watchlist is empty. Add some movies from the Movies page!</p>
      ) : (
        <Row>
          {watchlist.map((movie) => (
            <Col md={3} className="mb-4" key={movie.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    Year: {movie.release_date?.split("-")[0]} <br />
                    Rating: {movie.vote_average}
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => moveToWatched(movie.id)}
                    >
                      ✓ Watched
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromWatchlist(movie.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default WatchlistPage;
