import React, { useState, useEffect } from "react";
import styles from "./UserDashboard.module.css";
import PlacedOrderForm from "./PlacedOrderForm";
import axios from "axios";


export default function UserDashboard() {
  const [userData, setUserData] = useState(null); // Initialize with null to handle loading state
  const [isVisible, setIsVisible] = useState(false);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3200/api/users/getInfo",
           {withCredentials:true});
        if (response) {
          setUserData(response.data.user);
        } 
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    // Show a loading message or spinner while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.userDashboardContainer}>
      <PlacedOrderForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <h1 className={styles.dashboardTitle}>User Dashboard</h1>
      <div className={styles.userCard}>
        <h2 className={styles.userName}>{userData.name}</h2>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Contact:</strong> {userData.contact}</p>
        <p><strong>Location:</strong> {userData.coordinates.latitude}, {userData.coordinates.longitude}</p>
        <p><strong>Type:</strong> {userData.types}</p>

        <div className={styles.orderTitle}>
          <h3>Orders</h3>
          <button
            onClick={() => setIsVisible((prev) => !prev)}
            className={styles.placeOrderBtn}
          >
            Place Order
          </button>
        </div>

        {userData.orders.length > 0 ? (
          userData.orders.map((order) => (
            <div className={styles.orderCard} key={order._id}>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Order Time:</strong> {new Date(order.timeOfRegistration).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
}
