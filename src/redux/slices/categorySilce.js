import { createSlice } from "@reduxjs/toolkit";
import { getMainCategories, getSubCategories } from "../../helpers/web";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    main: null,
    sub: null,
  },
  reducers: {
    setMainCategories: (state, action) => {
      state.main = action.payload;
    },
    addToMainCat: (state, action) => {
      state.main = [...state.main, action.payload];
    },
    setSubCategories: (state, action) => {
      state.sub = action.payload;
    },
    addToSubCat: (state, action) => {
      state.sub = [...state.sub, action.payload];
    },
  },
});

export const { setMainCategories } = categorySlice.actions;
export const { addToMainCat } = categorySlice.actions;
export const { setSubCategories } = categorySlice.actions;
export const { addToSubCat } = categorySlice.actions;

export const getMainCat = () => async (dispatch) => {
  const dataFromGet = await getMainCategories();
  dispatch(setMainCategories(dataFromGet));
  console.log("getting main categories");
};

export const getSubCat = () => async (dispatch) => {
  const dataFromGet = await getSubCategories();
  dispatch(setSubCategories(dataFromGet));
  console.log("getting sub categories");
};

export default categorySlice.reducer;
