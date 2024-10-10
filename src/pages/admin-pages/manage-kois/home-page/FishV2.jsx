import axios from "axios";
import { useEffect, useState } from "react";

function FishManagementV2() {
  const [products, setProducts] = useState([]);
  const api = "https://66f7bc23b5d85f31a34378b6.mockapi.io/FishManagement";

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
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          // Pass product as a prop to the Product component
          <Product key={product.id} product={product} />
        ))}
      </div>
      <h3>Trang sẽ dùng để MANAGER có thể coi trang bán hàng</h3>
    </div>
  );
}

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      {/* <h2>{product.name}</h2>
      <p>{product.category}</p>
      <p>{product.type}</p>
      <p>{product.description}</p> */}
      {/* <p className="price">{product.price} VND</p> */}
    </div>
  );
};

export default FishManagementV2;
