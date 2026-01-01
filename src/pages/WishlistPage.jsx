import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useWishlist } from "../contexts/WishlistContext";

function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Container>
      <h2>My Wishlist ({wishlist.length})</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. Add some movies from the Films page!</p>
      ) : (
        <Row>
          {wishlist.map((movie) => (
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
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromWishlist(movie.id)}
                  >
                    Remove from Wishlist
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default WishlistPage;
