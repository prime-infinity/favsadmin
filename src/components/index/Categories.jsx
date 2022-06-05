import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import AddCartModal from "../AddCatModal";
import CategoryHeader from "../CategoryHeader";
import Overlay from "../Overlay";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveMainCat } from "../../helpers/web";
import {
  addToMainCat,
  setSubCategories,
} from "../../redux/slices/categorySilce";

function Categories() {
  const dispatch = useDispatch();
  const [mainName, setMainName] = useState("");
  const [isUploadingMain, setIsUpldnMain] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddinMain, setAddingMain] = useState(false);
  const [imaUpLdErr, setImgErr] = useState(null);
  const [imageOblivion, setImageUploadOblivion] = useState(true);
  const authState = useSelector((state) => state.auth.auth);
  const main = useSelector((state) => state.category.main);
  const sub = useSelector((state) => state.category.sub);
  let navigate = useNavigate();
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const imgErrorDiv = <small className="text-danger">{imaUpLdErr}</small>;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    //console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setAddingMain(true);
  };
  //console.log(main);
  const toggleIsAdding = () => {
    setIsAdding(!isAdding);
  };

  const cancelMain = () => {
    navigate("/");
  };

  const uploadMain = () => {
    setIsUpldnMain(true);
    setImgErr(null);

    const imageAsArray = images.map((img) => img.file);

    const formData = new FormData();

    for (let i = 0; i < imageAsArray.length; i++) {
      formData.append("image", imageAsArray[i], imageAsArray[i].name);
    }

    formData.append("name", mainName);

    saveMainCat(formData, authState.token)
      .then((res) => {
        console.log(res);
        dispatch(addToMainCat(res));
        setIsUpldnMain(false);
        setImageUploadOblivion(false);
        alert("main category added");
      })
      .catch((err) => {
        setIsUpldnMain(false);
        err.response?.data
          ? setImgErr(err.response.data)
          : setImgErr(err.message);
      });
  };

  const getMainCatNameFromId = (id) => {
    let nameee = main.filter((man) => man._id === id);
    return nameee[0].name;
  };

  const deleteSubCategory = (id) => {
    //console.log(id);
    //after delete operation
    let newSubs = sub.filter((subb) => subb._id !== id);
    dispatch(setSubCategories(newSubs));
  };

  return (
    <>
      {isAdding && (
        <>
          {" "}
          <AddCartModal close={toggleIsAdding} />{" "}
          <Overlay closeOverlay={toggleIsAdding} />
        </>
      )}
      <CategoryHeader />
      <Container className="mt--7 pb-5" fluid>
        <Row className="justify-content-center">
          {main &&
            main.length > 0 &&
            main.map((man, index) => (
              <Col
                key={man._id}
                className={`order-xl-${index + 2} mb-5 pb-5`}
                xl="4"
              >
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." className="" src={man.image} />
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
                      <h3>{man.name}</h3>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}

          {imageOblivion && (
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile bg-secondary shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <ImageUploading
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        acceptType={["jpg", "jpeg"]}
                      >
                        {({ imageList, onImageUpload, errors }) => (
                          //building UI

                          <div className="upload__image-wrapper">
                            {!isAddinMain && (
                              <svg
                                onClick={onImageUpload}
                                xmlns="http://www.w3.org/2000/svg"
                                className="rounded-circle mimick-card-img cur-poi"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}

                            {isAddinMain &&
                              imageList.map((image, index) => (
                                <div key={index}>
                                  <img
                                    alt="..."
                                    className="img-fluid"
                                    src={image["data_url"]}
                                  />
                                </div>
                              ))}

                            {errors && (
                              <div
                                className="text-danger"
                                style={{
                                  position: "absolute",
                                  backgroundColor: "black",
                                  color: "white !important",
                                }}
                              >
                                {errors.maxNumber && (
                                  <span className="row">
                                    Number of selected images exceed {maxNumber}
                                  </span>
                                )}
                                {errors.acceptType && (
                                  <span className="row">
                                    Your selected file type is not allow
                                  </span>
                                )}
                                {errors.maxFileSize && (
                                  <span className="row">
                                    Selected file size exceed maxFileSize
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </ImageUploading>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center bg-secondary border-0 pt-8 pt-md-4 pb-0 pb-md-4">
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
                  {isAddinMain && (
                    <div className="row">
                      <div className="col-12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            main category name
                          </label>
                          <div className="">
                            {imaUpLdErr ? imgErrorDiv : null}
                          </div>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            type="text"
                            value={mainName}
                            onChange={(e) => setMainName(e.target.value)}
                          />
                        </FormGroup>
                      </div>

                      <div className="col-12">
                        <div className="row justify-content-center">
                          <div className="col-6">
                            <Button
                              color="danger"
                              onClick={cancelMain}
                              size="md"
                              disabled={isUploadingMain}
                              className="w-100"
                            >
                              cancel
                            </Button>
                          </div>
                          <div className="col-6 text-center my-auto">
                            {!isUploadingMain && (
                              <Button
                                color="primary"
                                onClick={uploadMain}
                                size="md"
                                className="w-100"
                                disabled={!mainName}
                              >
                                Save
                              </Button>
                            )}
                            {isUploadingMain && (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {!isAddinMain && (
                    <div className="text-center">
                      <h3>Add main category</h3>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>

        <div className="py-5">
          <h1 className="text-center py-4">Sub Categories</h1>
        </div>

        <Row className="justify-content-center mt-5 mb-5 pb-5">
          {sub &&
            sub.length > 0 &&
            sub.map((item, index) => (
              <Col key={index} className="mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." className="" src={item.image} />
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
                      <Col xs="5 text-center">
                        <h3>{item.name}</h3>
                      </Col>
                      <Col xs="2">
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
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              onClick={() => deleteSubCategory(item._id)}
                            >
                              Delete category
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                      <Col xs="5 text-center">
                        <h3>{getMainCatNameFromId(item.mainCategory)}</h3>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      {main && main.length > 0 && (
        <div className="float-add" onClick={toggleIsAdding}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "40px" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      )}
    </>
  );
}

export default Categories;
