import styles from "./DeliveryuserList.module.css";
import { useState } from "react";

export default function DeliveryUserList({userList}) {
   
    // const markAsDelivered = (id) => {
    //     setUsers(users.filter(user => user.id !== id));
    // };

    return (

        <>{
            userList && 
                <div className={styles.deliverUserListContainer}>
                <h1 className={styles.deliveryListHead}>Delivery Info</h1>
                <ul className={styles.userList}>
                    {userList && userList.map((user, idx )=> (
                        <li key={idx} className={styles.userItem}>
                            <div className={styles.userInfo}>
                                <h2 className={styles.name}>{user.contact?.name}</h2>
                                <p className={styles.userLocation}>
                                    Location: {user.coordinates?.latitude},{user.coordinates?.longitude}</p>
                                <p className={styles.userContact}>Contact: {user.contact?.phone}</p>
                                <p className={styles.userContact}>Qun: {user?.quantity}</p>
                            </div>
                            <button
                                className={styles.deliveryButton}
                                onClick={() => {}}
                            >
                                Mark as Delivered
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

       
}</> );
}
