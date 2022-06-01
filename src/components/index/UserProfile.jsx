import { useState } from "react";
import Select from "react-select";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import UserHeader from "../UserHeader";

const options = [
  { value: "activate", label: "activate" },
  { value: "deactivate", label: "deactivate" },
];

function UserProfile() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7 pb-5" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/isis.jpg")}
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
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>

                      <div>
                        <span className="heading">89</span>
                        <span className="description">Favs</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>Jessica Jones</h3>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="4">
                    <h3 className="mb-0">User account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="danger"
                      onClick={(e) => e.preventDefault()}
                      size="md"
                    >
                      delete user
                    </Button>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={(e) => e.preventDefault()}
                      size="md"
                    >
                      Save current state
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Password"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6 my-auto">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="select status"
                        />
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" className="order-xl-3">
            <Card className="shadow mt-4">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">User Favs</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pro, index) => (
                    <Col key={index} lg="3" md="6">
                      <button
                        className="btn-icon-clipboard"
                        id="tooltip982655500"
                        type="button"
                      >
                        <div>
                          <span className="fav-image">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="svg-icon-dash"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                          <span>fav {index}</span>
                          <div style={{ position: "absolute", right: "12%" }}>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="xs"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i
                                  className="fas fa-ellipsis-v"
                                  style={{ fontSize: "14px" }}
                                />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Delete fav from user
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        </div>
                      </button>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UserProfile;
