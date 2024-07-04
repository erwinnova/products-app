import type { Metadata } from "next";
import { Products } from "./components/products/Products";

export default function IndexPage() {
  return <Products />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
