// Need to use the React-specific entry point to import `createApi`

import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchProductCategories } from "./productCategoryAPI";

interface productsSliceState {
  categories: string[];
  category: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: productsSliceState = {
  categories: [],
  category: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const productCategorySlice = createAppSlice({
  name: "productCategory",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    getCategories: create.asyncThunk(
      async () => {
        const response = await fetchProductCategories();
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.categories = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
          state.isError = true;
        },
      }
    ),

    setCategory: create.reducer((state, action: PayloadAction<string>) => {
      state.category = action.payload;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectCategories: (state) => state.categories,
    selectCategory: (state) => state.category,
  },
});

// Action creators are generated for each case reducer function.
export const { getCategories, setCategory } = productCategorySlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCategories, selectCategory } =
  productCategorySlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
