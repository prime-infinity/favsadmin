import { Button, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageUploading from "react-images-uploading";
import { saveSubCat } from "../helpers/web";
import { addFirstSubToCat } from "../redux/slices/categorySilce";
import { useNavigate } from "react-router-dom";

function AddCartModal({ close }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const cat = useSelector((state) => state.category.cat);
  const authState = useSelector((state) => state.auth.auth);
  const [subName, setSubName] = useState("");
  const [isUploadingSub, setIsUploadingSub] = useState(false);
  const [imaUpLdErr, setImgErr] = useState(null);
  const [isAddinSub, setAddingSub] = useState(false);
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const imgErrorDiv = <small className="text-danger">{imaUpLdErr}</small>;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setAddingSub(true);
  };

  useEffect(() => {
    if (!cat) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [cat]);

  const selectOptions = cat.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));
  const uploadSub = () => {
    setIsUploadingSub(true);
    setImgErr(null);

    const imageAsArray = images.map((img) => img.file);

    const formData = new FormData();

    for (let i = 0; i < imageAsArray.length; i++) {
      formData.append("image", imageAsArray[i], imageAsArray[i].name);
    }

    formData.append("name", subName);
    formData.append("maincat", selectedOption.value);

    saveSubCat(formData, authState.token)
      .then((res) => {
        console.log(res);
        dispatch(addFirstSubToCat(res));
        setIsUploadingSub(false);
        alert("sub category added");
        close();
      })
      .catch((err) => {
        setIsUploadingSub(false);
        err.response?.data
          ? setImgErr(err.response.data)
          : setImgErr(err.message);
      });
  };

  //console.log(selectedOption);

  return (
    cat && (
      <div
        className="custom-modal "
        style={{ height: "fit-content", border: "2px solid black" }}
      >
        <div className="container-fluid px-3">
          <div className="row py-4">
            <div className="col-12 col-md-6 text-center">
              <h3>Add Sub Category</h3>

              <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "jpeg"]}
              >
                {({ imageList, onImageUpload, errors }) => (
                  //building UI

                  <div>
                    {!isAddinSub && (
                      <svg
                        onClick={onImageUpload}
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "300px" }}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="cur-poi"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    {isAddinSub &&
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

              <br />
              <span className="text-center">Click icon to add image</span>
            </div>
            <div className="col-12 col-md-4">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-email">
                  Category name
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-email"
                  placeholder="input name"
                  type="text"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                />
                <br />
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={selectOptions}
                  placeholder="select main category"
                />
                <br />
                <div className="">{imaUpLdErr ? imgErrorDiv : null}</div>
                {subName && selectedOption && isAddinSub && (
                  <>
                    {!isUploadingSub && (
                      <Button
                        color="primary"
                        onClick={uploadSub}
                        size="md"
                        className="w-100"
                      >
                        save category
                      </Button>
                    )}
                    {isUploadingSub && (
                      <div className="text-center">
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </div>
                    )}
                  </>
                )}
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default AddCartModal;
