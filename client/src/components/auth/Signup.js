import React, { useState, useRef } from "react";
import styles from "./Signup.module.css";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { signupApiAsync, authSelector } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    types: "users"
  });

  const dispatch = useDispatch();


  const locationRef = useRef(null);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"]
  });





  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

      const reqData = {
        name: formData.name,
        email: formData.email,
        password:formData.password,
        contact: formData.contact,
        types:formData.types,
        location:locationRef.current.value
       }
    
       //console.log("request data: ", reqData);
       const result = await dispatch(signupApiAsync(reqData));

       if(result.type === "auth/signupApi/fulfilled"){
          console.log("user signup success fully!");
          clearInput();
       }

    }catch(error){
      console.log("error signup form: ", error);
    }
   
  };

  
  //===== clear input after signup =====//
  function clearInput() {
    setFormData({
      name: "",
      email: "",
      password: "",
      contact: "",
      types: "users"
    });
    locationRef.current.value = "";
  }

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.signupFormContainer}>
      <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
        <h2 className={styles.heading}>Sign Up</h2>

        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <label>
          Contact
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className={styles.input}
            required
            minLength="10"
            maxLength="10"
          />
        </label>

        <label>
          Location
          <Autocomplete>
            <input
              type="text"
              name="location"
              ref={locationRef}
              className={styles.input}
              required
              placeholder="Your location..."
             
            />
          </Autocomplete>
        </label>

        <label>
          Type
          <select
            name="types"
            value={formData.types}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="users">User</option>
            <option value="suppliers">Supplier</option>
          </select>
        </label>

        <button type="submit" className={styles.submitButton}>Sign Up</button>

        <Link to={"/signin"} className={styles.authFormLink}>
            <p>All ready have an account? SignIn</p>
        </Link>

      </form>
    </div>
  );
}
