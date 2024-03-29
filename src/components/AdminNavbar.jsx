import { Link, useLocation } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { removeFromLocal } from "../helpers/storage";
import { setAuth } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const AdminNavbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const logout = () => {
    console.log("is logging out");
    dispatch(setAuth(null));
    removeFromLocal();
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {location.pathname === "/"
              ? "DashBoard"
              : location.pathname === "/users"
              ? "users"
              : location.pathname === "/products"
              ? "products"
              : location.pathname === "/static"
              ? "static pages"
              : location.pathname === "/categories"
              ? "categories"
              : null}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../assets/img/theme/isis.jpg")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      Admin Name
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  className="noti-title"
                  header
                  tag="div"
                ></DropdownItem>

                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                  <i className="ni ni-user-run" />
                  <span>Logoutt</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
