import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../reduxConfig/reducers/cartSlice";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";

function Cart() {
  const cartItems = useSelector((state) => state.carts.cart);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

  // Handle quantity change from input field
  const handleQuantityChange = (e, stock, item) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity <= stock && newQuantity >= 0) {
      setQuantities({ ...quantities, [item.id]: newQuantity });
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const addItem = (item) => {
    const currentQuantity = quantities[item.id] || item.quantity;
    if (currentQuantity < item.stock) {
      const newQuantity = currentQuantity + 1;
      dispatch(addToCart({ item: { ...item, quantity: newQuantity } }));
      setQuantities({ ...quantities, [item.id]: newQuantity });
    } else {
      alert(
        "Item is out of stock or you have reached the maximum stock available."
      );
    }
  };

  const lessItem = (item) => {
    const currentQuantity = quantities[item.id] || item.quantity;
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
      setQuantities({ ...quantities, [item.id]: newQuantity });
    } else {
      dispatch(removeFromCart({ id: item.id }));
    }
  };

  return (
    <div className="mt-28 flex justify-center flex-col items-center gap-10">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center shadow-lg p-8 gap-10"
          >
            <div className="shadow-lg">
              <img
                width={200}
                height={200}
                src={item.thumbnail}
                alt={item.title}
              />
            </div>
            <div>
              <h3>{item.title}</h3>
              <p className="text-[16px]">{item.returnPolicy}</p>
              <p className="text-[16px]">{item.warrantyInformation}</p>
              <p className="text-14">Available Stock : {item.stock}</p>
            </div>
            <div>
              <h3>Price : $ {item.price}</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => addItem(item)}>
                <LuPlusCircle className="text-[22px]" />
              </button>
              <input
                type="text"
                disabled
                className="border w-10 text-center"
                style={{
                  appearance: "textfield",
                  WebkitAppearance: "none",
                  MozAppearance: "textfield",
                }}
                value={quantities[item.id] || item.quantity}
                onChange={(e) => handleQuantityChange(e, item.stock, item)}
              />

              <button onClick={() => lessItem(item)}>
                <LuMinusCircle className="text-[22px]" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
