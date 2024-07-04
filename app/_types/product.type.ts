export const PRODUCT_TAGS_ENUM = ["beauty", "mascara"];
export type ProductDetailsType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: typeof PRODUCT_TAGS_ENUM;
  brand: string;
  sku: string;
  weight: number;
  dimensions: DimensionsType;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ReviewsType[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: MetaType;
  thumbnail: string;
  images: string[];
};

export type DimensionsType = {
  width: number;
  height: number;
  depth: number;
};

export type ReviewsType = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type MetaType = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type FetchProductsResponse = {
  products: ProductDetailsType;
  total: number;
  skip: number;
  limit: number;
};
