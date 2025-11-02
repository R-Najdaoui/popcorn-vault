import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

function FilmsPage() {
  return (
    <Container>
      <h2>Films</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control type="text" placeholder="Search movies..." />
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>All genres</option>
            <option>Action</option>
            <option>Comedy</option>
            <option>Drama</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>Most recent</option>
            <option>Oldest</option>
            <option>Highest rating</option>
            <option>Lowest rating</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <p>Film list will appear here.</p>
      </Row>
    </Container>
  );
}

export default FilmsPage;
