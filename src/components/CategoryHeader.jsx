import { Container, Row, Col } from "reactstrap";

const CategoryHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Edit Categories</h1>
              <p className="text-white mt-0 mb-5">
                Edit Categories,there are already two main categories, add sub
                categories into them.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CategoryHeader;
