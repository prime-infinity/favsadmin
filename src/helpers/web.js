import axios from "axios";

//const backendHost = "http://localhost:2000/api/";
const backendHost = "https://favsadmin.herokuapp.com/api/";

//login admin
export function login(data) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "admin/login", data)
      .then((result) => {
        res({ ...result.data, token: result.headers["x-auth-token"] });
      })
      .catch((err) => {
        rej(err);
      });
  });
}

//save main cateogry
export function saveMainCat(deta, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "categories/upload-main-category", deta, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        res(result.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

//save sub category
export function saveSubCat(deta, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "categories/upload-sub-category", deta, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        res(result.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

//get all main categories
export async function getMainCategories() {
  try {
    const { data } = await axios.get(
      backendHost + `categories/get-main-categories`
    );
    return data;
  } catch (e) {
    return e.message;
  }
}

//get all sub categories
export async function getSubCategories() {
  try {
    const { data } = await axios.get(
      backendHost + `categories/get-sub-categories`
    );
    return data;
  } catch (e) {
    return e.message;
  }
}
