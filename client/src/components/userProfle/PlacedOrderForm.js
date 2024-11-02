import React, { useState } from "react";
import styles from "./PlacedOrderForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { placedOrderApiAsync } from "../../redux/orderReducer";

export default function PlacedOrderForm({ isVisible, setIsVisible }) {
  

  const dispatch = useDispatch();
  const [quantity, setQuanity] = useState(0);




 async function handleSubmitPlacedOrder(e){
    e.preventDefault();
    console.log("placeds order form submit")
    try{

      if(!quantity || quantity<1){
        return;
      }

      const result = await dispatch(placedOrderApiAsync({quantity:quantity}))
      console.log("result order form: ", result)

      if(result.type === "order/placedOrderApi/fulfilled"){
        setQuanity("");
        setIsVisible(false);
      }


    }catch(error){
      console.log("error for placing order: ", error);
    }

  }

  return (
    <div className={`${styles.placedOrderFormContainer} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.formContent}>
        <button className={styles.closeButton} onClick={()=>setIsVisible(false)}>&times;</button>
        <h2 className={styles.formTitle}>Place Your Order</h2>
        <form onSubmit={handleSubmitPlacedOrder}>
          <label htmlFor="quantity">Quantity:</label>

          <input onChange={(e)=>setQuanity(e.target.value)} value={quantity}
          type="number" id="quantity" name="quantity" min="1" placeholder="Enter quantity" required />

          <button type="submit" className={styles.submitButton}>Place Order</button>
        </form>
      </div>
    </div>
  );
}
