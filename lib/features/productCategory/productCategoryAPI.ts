// A mock function to mimic making an async request for data
export const fetchProductCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/category-list`
  );
  const result = await response.json();

  return result;
};
