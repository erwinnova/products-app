// Need to use the React-specific entry point to import `createApi`

import { createAppSlice } from "@/lib/createAppSlice";
import { fetchProductDetails, fetchProducts } from "./productsAPI";
import { ProductDetailsType } from "@/app/_types/product.type";
import { PayloadAction } from "@reduxjs/toolkit";

interface productsSliceState {
  products: ProductDetailsType[];
  product: ProductDetailsType | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  limit: number;
  skip: number;
  total: number;
  sortBy: string;
  order: string;
}

const initialState: productsSliceState = {
  products: [],
  product: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  limit: 10,
  skip: 0,
  total: 0,
  sortBy: "price",
  order: "asc",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const productsSlice = createAppSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    getProducts: create.asyncThunk(
      async (param: {
        limit: number;
        skip: number;
        sortBy: string;
        order: string;
        category: string;
      }) => {
        const response = await fetchProducts(param);
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
          state.products = action.payload.products;
          state.total = action.payload.total;
          state.limit = action.payload.limit;
          state.skip = action.payload.skip;
        },
        rejected: (state) => {
          state.isLoading = false;
          state.isError = true;
        },
      }
    ),
    getProductDetails: create.asyncThunk(
      async (id: string) => {
        const response = await fetchProductDetails(id);
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
          state.product = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
          state.isError = true;
        },
      }
    ),
    setLimit: create.reducer((state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    }),
    setSkip: create.reducer((state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    }),
    setOrder: create.reducer((state, action: PayloadAction<string>) => {
      state.order = action.payload;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectProducts: (state) => state.products,
    selectProduct: (state) => state.product,
    limitProduct: (state) => state.limit,
    skipProduct: (state) => state.skip,
    selectOrder: (state) => state.order,
  },
});

// Action creators are generated for each case reducer function.
export const { getProductDetails, getProducts, setLimit, setSkip, setOrder } =
  productsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectProduct,
  selectProducts,
  limitProduct,
  skipProduct,
  selectOrder,
} = productsSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
