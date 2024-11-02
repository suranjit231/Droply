import React, { useState, useEffect } from "react";
import styles from "./Signup.module.css";
import { loginApiAsync, authSelector } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export default function Signin() {
 
    const [email , setEmail ] = useState("");
    const [ password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, authLoading, user } = useSelector(authSelector);
    const location = useLocation();

    useEffect(() => {

      if(isLoggedIn && user){
  
        if(user.types === "suppliers"){
          let path = location?.state?.from || `/suppliers/map/${user._id}`;
          return navigate(path);
  
        }
  
        if(user.types==="users"){
          let path = location?.state?.from || "/";
          return navigate(path);
  
        }
    
      }
     
      
     
    }, [isLoggedIn, navigate, user?.types, location.state?.from]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

        if(!email || !password){
            return;
        }

       console.log("login req email - pass : ", email, password);
       const result = await dispatch(loginApiAsync({email:email, password:password}));

       if(result.type === "auth/loginApi/fulfilled"){
          console.log("user login success fully!");
          clearInput();
       }

    }catch(error){
      console.log("error signup form: ", error);
    }
   
  };

  
  //===== clear input after signup =====//
  function clearInput() {
    setEmail("");
    setPassword("");
   
  }



  return (
    <div className={styles.signinFormContainer}>
      <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
        <h2 className={styles.heading}>Sign In</h2>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </label>

     
        <button type="submit" className={styles.submitButton}>Sign In</button>

        <Link to={"/signup"} className={styles.authFormLink}>
            <p>Don't have account? SignUp</p>
        </Link>
      </form>
    </div>
  );
}
