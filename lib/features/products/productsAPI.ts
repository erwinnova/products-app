// A mock function to mimic making an async request for data
export const fetchProducts = async ({
  limit,
  skip,
  sortBy,
  order,
  category,
}: {
  limit: number;
  skip: number;
  sortBy: string;
  order: string;
  category: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
  );
  const result = await response.json();

  return result;
};
export const fetchProductDetails = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
  );
  const result = await response.json();

  return result;
};
