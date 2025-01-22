import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import Card from "../Components/Card";
import { MoonLoader } from "react-spinners";

function Home() {
  const [product, setProduct] = useState([]);
  const selector = useSelector((state) => state.carts.cart); // Use useSelector to get Redux state
  const [loading, setLoading] = useState(true);
  console.log(selector);
  useEffect(() => {
    setLoading(true); // Set loading to true before the API call
    axios("https://dummyjson.com/products")
      .then((res) => setProduct(res.data.products))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false); // Set loading to false in finally block
      });
  }, []);
  // Add empty dependency array to run useEffect only on mount
  return (
    <>
      {loading ? (
        <div className="z-20 w-full h-full flex justify-center items-center absolute bg-slate-400">
          <MoonLoader color="#000" />
        </div>
      ) : (
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
      )}
    </>
  );
}
export default Home;
