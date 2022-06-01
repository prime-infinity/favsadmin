import { Button, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import { useState } from "react";

const options = [
  { value: "male", label: "male" },
  { value: "female", label: "female" },
];

function AddCartModal() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div
      className="custom-modal "
      style={{ height: "fit-content", border: "2px solid black" }}
    >
      <div className="container-fluid px-3">
        <div className="row py-4">
          <div className="col-12 col-md-6 text-center">
            <span className="cur-poi">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "300px" }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>{" "}
            </span>
            <br />
            <span className="text-center">Add image</span>
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
              />
              <br />
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="select main category"
              />
              <br />
              <Button
                color="primary"
                onClick={(e) => e.preventDefault()}
                size="md"
                className="w-100"
              >
                save category
              </Button>
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCartModal;
