"use client";

import styles from "./Products.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getProductDetails,
  selectProduct,
} from "@/lib/features/products/productsSlice";
import { ProductDetailsType } from "@/app/_types/product.type";
import Image from "next/image";

export const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const product = useAppSelector(selectProduct);

  const renderTags = (param: ProductDetailsType | null) => {
    return param?.tags.map((val) => {
      return <div className="px-4 border-2 rounded-md">{val}</div>;
    });
  };

  const initData = async () => {
    dispatch(getProductDetails(params.id));
  };

  useEffect(() => {
    initData();
  }, [product]);

  return (
    <div className="container mx-auto px-4">
      <div className={styles.postCard}>
        <Image
          src={product?.images[0] || ""}
          alt="Picture of the author"
          width={200}
          height={200}
        />
        <div className={styles.postTitle}>{product?.title}</div>
        <div className={styles.postTitle}>
          Rp. {product?.price.toLocaleString("id-ID")}
        </div>
        <div className={styles.postTitle}>{product?.description}</div>
        <div className="grid grid-flow-col auto-cols-max gap-4">
          {renderTags(product)}
        </div>
      </div>
    </div>
  );
};
