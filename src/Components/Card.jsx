import React, { useState } from "react";
import { addToCart } from "../reduxConfig/store/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Card({ title, image, description, item }) {
  const dispatch = useDispatch();
  const addedProductToCart = (item) => {
    dispatch(addToCart({ item }));
  };
  return (
    <div>
      <div className="card glass w-80 sm:w-96">
        <figure>
          <img src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => addedProductToCart(item)}
              className="btn btn-primary"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
