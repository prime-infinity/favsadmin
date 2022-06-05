import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
} from "reactstrap";
import { login } from "../helpers/web";
import { setAuth, saveAuthToLocal, getAuth } from "../redux/slices/authSlice";
import AuthNavbar from "./AuthNavbar";

const Login = () => {
  const mainContent = React.useRef(null);
  const authState = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [error, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoging, setIsLoging] = useState(false);

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  useEffect(() => {
    //console.log(authState);
    if (!authState) {
      navigate(`/login`);
    }
    if (authState) {
      navigate(`/`);
    }
    // eslint-disable-next-line
  }, [authState]);

  const handleErrors = (e) => {
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const handleSuccess = (e) => {
    dispatch(setAuth(e));
    dispatch(saveAuthToLocal());
  };

  const signIn = () => {
    //dispatch(setAuth(true));
    setIsLoging(true);
    setErrors(null);
    login(formData)
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleErrors(err);
      })
      .then(() => {
        setIsLoging(false);
      });
  };
  const errorDiv = <small className="text-danger">{error}</small>;

  return (
    <>
      <div className="main-content cover-rest-login" ref={mainContent}>
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome Admin</h1>
                  <p className="text-lead text-light">login</p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={formData.id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                          placeholder="Username"
                          type="text"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                        />
                      </InputGroup>
                    </FormGroup>
                    {/*<div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
  </div>*/}
                    <div className="row text-center">
                      <div className="col-12">{error ? errorDiv : null}</div>
                    </div>
                    <div className="text-center">
                      {!isLoging && (
                        <Button
                          onClick={signIn}
                          className="my-4"
                          color="primary"
                          type="button"
                          size="md"
                        >
                          Sign in
                        </Button>
                      )}
                      {isLoging && (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                {/*<Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
  </Col>*/}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
