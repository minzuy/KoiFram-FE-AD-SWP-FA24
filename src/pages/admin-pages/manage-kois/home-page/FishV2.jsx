import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./fishv2.module.css";
function FishManagementV2() {
  const [products, setProducts] = useState([]);
  const api = "http://api-koifish.evericks.com/api/fish";

  const fetchProducts = async () => {
    try {
      const response = await axios.get(api);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products :", error);
    }
  };
  // for FIREBASE
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product List</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
const Product = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img
        src={product.thumbnailUrl}
        alt={product.name}
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productOrigin}>
          <strong>Origin:</strong> {product.origin}
        </p>
        <p className={styles.productSize}>
          <strong>Size:</strong> {product.size} cm
        </p>
        <p className={styles.productPrice}>
          <strong>Price:</strong> {product.price} VND
        </p>
        <p className={styles.productPromotionPrice}>
          <strong>Promotion Price:</strong> {product.promotionPrice} VND
        </p>
        <p className={styles.productStatus}>
          <strong>Status:</strong> {product.status}
        </p>
        <div className={styles.productCategories}>
          <strong>Categories:</strong>
          {product.fishCategories.map((category) => (
            <span key={category.id} className={styles.productCategory}>
              {category.category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FishManagementV2;
