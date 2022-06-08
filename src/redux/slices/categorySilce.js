import { createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  /*getMainCategories,
  getSubCategories,*/
} from "../../helpers/web";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    main: null,
    sub: null,
    cat: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.cat = action.payload;
    },
    addMainToCat: (state, action) => {
      state.cat = [...state.cat, action.payload];
    },
    addFirstSubToCat: (state, action) => {
      state.cat = state.cat.map((catt) =>
        catt._id === action.payload._id ? action.payload : catt
      );
      //console.log(action.payload);
    },
    addSeconSubToCat: (state, action) => {
      state.cat = state.cat.map((catt) =>
        catt._id === action.payload._id ? action.payload : catt
      );
    },
  },
});

/*export const { setMainCategories } = categorySlice.actions;
export const { addToMainCat } = categorySlice.actions;
export const { setSubCategories } = categorySlice.actions;
export const { addToSubCat } = categorySlice.actions;*/
export const { setCategories } = categorySlice.actions;
export const { addMainToCat } = categorySlice.actions;
export const { addFirstSubToCat } = categorySlice.actions;
export const { addSeconSubToCat } = categorySlice.actions;

/*export const getMainCat = () => async (dispatch) => {
  const dataFromGet = await getMainCategories();
  dispatch(setMainCategories(dataFromGet));
  console.log("getting main categories");
};

export const getSubCat = () => async (dispatch) => {
  const dataFromGet = await getSubCategories();
  dispatch(setSubCategories(dataFromGet));
  console.log("getting sub categories");
};*/

export const getCat = () => async (dispatch) => {
  const dataFromGet = await getCategories();
  dispatch(setCategories(dataFromGet));
  console.log("getting categories");
};

export default categorySlice.reducer;
