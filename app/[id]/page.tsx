import { Metadata } from "next";
import { ProductDetails } from "../components/products/ProductDetails";

type Props = {
  params: { id: string };
};

export async function generateMetaData({ params }: Props): Promise<Metadata> {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const data = await res.json();
  return {
    title: data.title,
  };
}

export default function ProductDetailsPage() {
  return (
    <div>
      <ProductDetails />
    </div>
  );
}
