import { Button, Col, Form, Row } from "react-bootstrap";

const SearchSection = ({
  handleReset,
  handleFilter,
  searchStatus,
  setSearchStatus,
  searchTitle,
  setSearchTitle,
}) => {
  return (
    <div className="search_section">
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="titleInput">
            <Form.Control
              type="text"
              placeholder="Title"
              value={searchTitle}
              onChange={(e) => {
                setSearchTitle(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          {/* <Form.Group className="mb-3" controlId="statusInput">
            <Form.Control
              type="text"
              placeholder="Status"
              value={searchStatus}
              onChange={(e) => {
                setSearchStatus(e.target.value);
              }}
            />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="statusInput">
            <Form.Select
              value={searchStatus.toString()}
              onChange={(e) => {
                setSearchStatus(e.target.value);
              }}
            >
              <option value="">---Select Status---</option>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={1}>
          <Button variant="primary" onClick={handleFilter}>
            Search
          </Button>
        </Col>
        <Col md={2} style={{ textAlign: "right" }}>
          <Button variant="warning" onClick={handleReset}>
            Clear All
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchSection;
