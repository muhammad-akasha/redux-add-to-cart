import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import Card from "../Components/Card";

function Home() {
  const [product, setProduct] = useState([]);
  const selector = useSelector((state) => state.carts.cart); // Use useSelector to get Redux state
  console.log(selector);
  useEffect(() => {
    axios("https://dummyjson.com/products")
      .then((res) => setProduct(res.data.products))
      .catch((err) => console.log(err));
  }, []); // Add empty dependency array to run useEffect only on mount

  return (
    <div className="flex justify-center gap-4 flex-wrap my-28">
      {product.length > 0
        ? product.map((item, index) => (
            <div key={item.id}>
              <Card
                title={item.title}
                image={item.thumbnail}
                description={item.description}
                item={item}
                index={index}
              />
            </div>
          ))
        : "No products available"}
    </div>
  );
}

export default Home;
