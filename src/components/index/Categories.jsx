import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import CategoryHeader from "../CategoryHeader";

function Categories() {
  return (
    <>
      <CategoryHeader />
      <Container className="mt--7 pb-5" fluid>
        <Row className="justify-content-center">
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-1-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col mb-5">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading"></span>
                        <span className="description"></span>
                      </div>

                      <div>
                        <span className="heading"></span>
                        <span className="description"></span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>Male</h3>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-3-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col mb-5">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading"></span>
                        <span className="description"></span>
                      </div>

                      <div>
                        <span className="heading"></span>
                        <span className="description"></span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>Female</h3>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div className="py-5">
          <h1 className="text-center py-4">Sub Categories</h1>
        </div>

        {[1, 2, 3].map((item) => (
          <Row className="justify-content-center mt-5 mb-5 pb-5">
            <Col className="mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../assets/img/theme/sketch.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between"></div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col mb-5">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>

                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <Col xs="6 text-center">
                      <h3>Bags</h3>
                    </Col>
                    <Col xs="6 text-center">
                      <h3>Female</h3>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../assets/img/theme/sketch.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between"></div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col mb-5">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>

                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <Col xs="6 text-center">
                      <h3>Tops</h3>
                    </Col>
                    <Col xs="6 text-center">
                      <h3>Female</h3>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../assets/img/theme/sketch.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between"></div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col mb-5">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>

                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <Col xs="6 text-center">
                      <h3>Trousers</h3>
                    </Col>
                    <Col xs="6 text-center">
                      <h3>Male</h3>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default Categories;
