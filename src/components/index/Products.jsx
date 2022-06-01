import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Header from "../Header";

function Products() {
  return (
    <>
      <Header />

      <Container className="mt--7 pb-5" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">All products</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                  ].map((pro, index) => (
                    <Col key={index} lg="3" md="6">
                      <button
                        className="btn-icon-clipboard"
                        id="tooltip982655500"
                        type="button"
                      >
                        <div>
                          <span className="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="svg-icon-dash"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span>product {index}</span>
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
                                  Delete product
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        </div>
                        <Row className="pt-3">
                          <Col xs="6">
                            <span>Male</span>
                          </Col>
                          <Col xs="6">
                            <span>Bags</span>
                          </Col>
                        </Row>
                      </button>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
export default Products;
