import { useEffect, useState } from "react";
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
import { saveMainCat, saveSubSubCat } from "../../helpers/web";
import Select from "react-select";
import {
  addMainToCat,
  addSeconSubToCat,
  //addToMainCat,
  //setSubCategories,
} from "../../redux/slices/categorySilce";

function Categories() {
  const dispatch = useDispatch();
  const [mainName, setMainName] = useState("");
  const [subName, setSubName] = useState("");
  const [isUploadingMain, setIsUpldnMain] = useState(false);
  const [isUploadingSub, setIsUpldnSub] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddinMain, setAddingMain] = useState(false);
  const [isAddinSs, setAddingSs] = useState(false);
  const [imaUpLdErr, setImgErr] = useState(null);
  const [imaSubUpLdErr, setImgSubErr] = useState(null);
  const [isDeepCat, setIsDeepCat] = useState(false);
  const [subSubOpt, setSubSubOpt] = useState([]);
  const [imageOblivion, setImageUploadOblivion] = useState(true);
  const [imageSOblivion, setImageUploadSOblivion] = useState(true);
  const authState = useSelector((state) => state.auth.auth);
  const [selectedOption, setSelectedOption] = useState(null);
  const [subSubId, setSubSubId] = useState(null);
  const cat = useSelector((state) => state.category.cat);
  let navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [ssimages, setssImages] = useState([]);
  const maxNumber = 1;

  useEffect(() => {
    if (!cat) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [cat]);

  const setSelected = (e) => {
    //console.log(e.value);
    //console.log(cat);

    let deepCat = cat.filter((catt) => catt._id === e.value);
    setSubSubOpt(
      deepCat[0].subcategories.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    );

    setIsDeepCat(false);
    setSubSubId(false);
    setTimeout(() => {
      setIsDeepCat(true);
    }, 200);

    setSelectedOption(e);
  };

  const setSubSelectedF = (e) => {
    //console.log(e);
    setSubSubId(e.value);
  };

  const imgErrorDiv = <small className="text-danger">{imaUpLdErr}</small>;
  const imgErrorSubDiv = <small className="text-danger">{imaSubUpLdErr}</small>;

  const selectOptions = cat.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    //console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setAddingMain(true);
  };
  const onChangess = (imageList, addUpdateIndex) => {
    // data for submit
    //console.log(imageList, addUpdateIndex);
    setssImages(imageList);
    setAddingSs(true);
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
        dispatch(addMainToCat(res));
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

  const deleteSubCategory = (id) => {
    //console.log(id);
    //after delete operation
    //let newSubs = sub.filter((subb) => subb._id !== id);
    //dispatch(setSubCategories(newSubs));
  };

  const cannotAddSubSub = () => {
    if (!subName || !subSubId) {
      return true;
    }
    return false;
  };

  const uploadSubS = () => {
    setIsUpldnSub(true);
    setImgSubErr(null);

    const imageAsArray = ssimages.map((img) => img.file);

    const formData = new FormData();

    for (let i = 0; i < imageAsArray.length; i++) {
      formData.append("image", imageAsArray[i], imageAsArray[i].name);
    }

    formData.append("name", subName);
    formData.append("mainid", selectedOption.value);
    formData.append("subid", subSubId);

    saveSubSubCat(formData, authState.token)
      .then((res) => {
        //console.log(res);
        setIsUpldnSub(false);
        setImageUploadSOblivion(false);
        dispatch(addSeconSubToCat(res));
      })
      .catch((err) => {
        setIsUpldnSub(false);
        err.response?.data
          ? setImgSubErr(err.response.data)
          : setImgSubErr(err.message);
      });
  };

  return (
    cat && (
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
            {cat &&
              cat.length > 0 &&
              cat.map((cat, index) => (
                <Col
                  key={cat._id}
                  className={`order-xl-${index + 2} mb-5 pb-5`}
                  xl="3"
                >
                  <Card className="card-profile shadow">
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="12">
                        <div className="card-profile-image">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img alt="..." className="" src={cat.image} />
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
                        <Col xs="10 text-left">
                          <h2 className="text-primary">{cat.name}</h2>
                        </Col>
                        <Col xs="2">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              role="button"
                              size="xs"
                              color="primary"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i
                                className="fas fa-ellipsis-v"
                                style={{ fontSize: "14px" }}
                              />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={() => deleteSubCategory(cat._id)}
                              >
                                main cat options
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))}

            {imageOblivion && (
              <Col className="order-xl-1 mb-5 mb-xl-0" xl="3">
                <Card className="card-profile bg-secondary shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="12">
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
                                      Number of selected images exceed{" "}
                                      {maxNumber}
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
                            <div className="col-12 mb-3">
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
                            <div className="col-12 text-center my-auto">
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
            {cat &&
              cat.length > 0 &&
              cat.map((catt, indexOne) =>
                catt.subcategories.map((item, indexTwo) => (
                  <Col key={indexTwo} className="mb-5 pb-5" xl="3">
                    <Card className="card-profile shadow">
                      <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="12">
                          <div className="card-profile-image">
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
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
                          <Col xs="10 text-left">
                            <h2 className="text-primary">{item.name}</h2>
                          </Col>
                          <Col xs="2">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="xs"
                                color="primary"
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
                                  onClick={() => deleteSubCategory(item.id)}
                                >
                                  sub category options
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="5 text-left">
                            <h3 className="text-primary">{catt.name}</h3>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              )}
          </Row>

          <div className="py-5">
            <h1 className="text-center py-4">Sub Sub Categories</h1>
          </div>

          <Row className="justify-content-center mt-5 mb-5 pb-5">
            {cat && cat.length > 0 && (
              <>
                {cat.map((catt, indexTwo) =>
                  catt.subcategories.map((item, indexThree) =>
                    item.subSub.map((subs, indexFour) => (
                      <Col key={indexFour} className="mb-5 pb-5" xl="3">
                        <Card className="card-profile shadow">
                          <Row className="justify-content-center">
                            <Col className="order-lg-2" lg="12">
                              <div className="card-profile-image">
                                <a
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    className=""
                                    src={subs.image}
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
                              <Col xs="10 text-left">
                                <h2 className="text-primary">{subs.name}</h2>
                              </Col>
                              <Col xs="2">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    role="button"
                                    size="xs"
                                    color="primary"
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
                                      onClick={() => deleteSubCategory(item.id)}
                                    >
                                      sub subs category options
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs="12 text-left">
                                <h3 className="text-primary">{item.name}</h3>
                              </Col>
                              <Col xs="12 text-left">
                                <h3 className="text-primary">{catt.name}</h3>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    ))
                  )
                )}
                {imageSOblivion && (
                  <Col className=" mb-5 mb-xl-0" xl="3">
                    <Card className="card-profile bg-secondary shadow">
                      <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="12">
                          <div className="card-profile-image">
                            <ImageUploading
                              value={ssimages}
                              onChange={onChangess}
                              maxNumber={maxNumber}
                              dataURLKey="data_url"
                              acceptType={["jpg", "jpeg"]}
                            >
                              {({ imageList, onImageUpload, errors }) => (
                                //building UI

                                <div className="upload__image-wrapper">
                                  {!isAddinSs && (
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

                                  {isAddinSs &&
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
                                          Number of selected images exceed{" "}
                                          {maxNumber}
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
                        {isAddinSs && (
                          <div className="row">
                            <div className="col-12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  sub sub category name
                                </label>
                                <div className="">
                                  {imaSubUpLdErr ? imgErrorSubDiv : null}
                                </div>
                                <Input
                                  className="form-control-alternative"
                                  id="input-username"
                                  type="text"
                                  value={subName}
                                  onChange={(e) => setSubName(e.target.value)}
                                />
                                <br />
                                <Select
                                  defaultValue={selectedOption}
                                  onChange={setSelected}
                                  options={selectOptions}
                                  placeholder="select main category"
                                />{" "}
                                <br />
                                {isDeepCat && (
                                  <Select
                                    onChange={setSubSelectedF}
                                    options={subSubOpt}
                                    placeholder="select sub category"
                                  />
                                )}
                              </FormGroup>
                            </div>

                            <div className="col-12">
                              <div className="row justify-content-center">
                                <div className="col-12 mb-2">
                                  <Button
                                    color="danger"
                                    onClick={cancelMain}
                                    size="md"
                                    disabled={isUploadingSub}
                                    className="w-100"
                                  >
                                    cancel
                                  </Button>
                                </div>
                                <div className="col-12 text-center my-auto">
                                  {!isUploadingMain && (
                                    <Button
                                      color="primary"
                                      onClick={uploadSubS}
                                      size="md"
                                      className="w-100"
                                      disabled={cannotAddSubSub()}
                                    >
                                      Save
                                    </Button>
                                  )}
                                  {isUploadingSub && (
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
                        {!isAddinSs && (
                          <div className="text-center">
                            <h3>Add sub sub category</h3>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                )}
              </>
            )}
          </Row>
        </Container>

        {cat && cat.length > 0 && (
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
    )
  );
}

export default Categories;
