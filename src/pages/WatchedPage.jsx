import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useWatchlist } from "../contexts/WatchlistContext";

function WatchedPage() {
  const { watched, removeFromWatched, addToWatchlist } = useWatchlist();

  return (
    <Container className="page-content">
      <h2>Watched Movies ({watched.length})</h2>

      {watched.length === 0 ? (
        <p>You haven't marked any movies as watched yet. Watch movies from your watchlist!</p>
      ) : (
        <Row>
          {watched.map((movie) => (
            <Col md={3} className="mb-4" key={movie.id}>
              <Card className="opacity-75">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  style={{ filter: 'grayscale(50%)' }}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    Year: {movie.release_date?.split("-")[0]} <br />
                    Rating: {movie.vote_average}
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        removeFromWatched(movie.id);
                        addToWatchlist(movie);
                      }}
                    >
                      Add to Watchlist
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromWatched(movie.id)}
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

export default WatchedPage;
