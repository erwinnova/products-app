"use client";

import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getProducts,
  limitProduct,
  selectOrder,
  selectProducts,
  setOrder,
  skipProduct,
} from "@/lib/features/products/productsSlice";
import { ProductDetailsType } from "@/app/_types/product.type";
import styles from "./Products.module.css";
import Image from "next/image";
import {
  getCategories,
  selectCategories,
  selectCategory,
  setCategory,
} from "@/lib/features/productCategory/productCategorySlice";

export const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const skip = useAppSelector(skipProduct);
  const limit = useAppSelector(limitProduct);
  const order = useAppSelector(selectOrder);
  const categories = useAppSelector(selectCategories);
  const category = useAppSelector(selectCategory);

  const renderTags = (product: ProductDetailsType) => {
    return product.tags.map((val) => {
      return <div className="px-4 border-2 rounded-md">{val}</div>;
    });
  };

  const initData = async () => {
    const params = { limit, skip, order, sortBy: "price", category };
    dispatch(getProducts(params));
    dispatch(getCategories());
  };

  const renderCategory = (param: string[]) => {
    return param.map((val) => {
      return <option value={val}>{val}</option>;
    });
  };

  useEffect(() => {
    initData();
  }, [order, category]);

  return (
    <div className="container mx-auto px-4">
      <div>
        <label htmlFor="price">Price: </label>

        <select
          name="price"
          id="price"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            dispatch(setOrder(e.target.value))
          }
        >
          <option value="asc" selected>
            Terendah
          </option>
          <option value="desc">Tertinggi</option>
        </select>
      </div>

      <div>
        <label htmlFor="category">Category: </label>

        <select
          name="category"
          id="category"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            dispatch(setCategory(`/category/${e.target.value}`))
          }
        >
          <option value="" selected>
            All
          </option>
          {renderCategory(categories)}
        </select>
      </div>

      <div className="grid gap-4 grid-cols-4 grid-rows-2">
        {products.length > 0 &&
          products?.map((val) => {
            return (
              <a href={`/${val.id}`}>
                <div className={styles.postCard}>
                  <Image
                    src={val.images[0]}
                    alt="Picture of the author"
                    width={200}
                    height={200}
                  />
                  <div className={styles.postTitle}>{val.title}</div>
                  <div className={styles.postTitle}>
                    Rp. {val.price.toLocaleString("id-ID")}
                  </div>
                  <div className={styles.postTitle}>
                    {val.description.substring(0, 255)}... <a>read more</a>
                  </div>
                  <div className="grid grid-flow-col auto-cols-max gap-4">
                    {renderTags(val)}
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};
