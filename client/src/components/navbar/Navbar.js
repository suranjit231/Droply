import styles from "./Navbar.module.css";
import { Outlet } from "react-router-dom";
import { FaHandHoldingWater } from "react-icons/fa";
import { Link } from "react-router-dom";
import { authSelector } from "../../redux/authReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutApiAsync } from "../../redux/authReducer";

export default function Navbar(){

    const { isLoggedIn, user } = useSelector(authSelector);
    const dispatch = useDispatch();

    async function handleLogout(){
        try{
            const result = await dispatch(logoutApiAsync())


        }catch(error){
            console.log("error in logout: ", error);
        }

    }




    return(

        <>
        <div className={styles.navbarContainer}>
            <div className={styles.leftNavbarLogo}>
                <Link to={"/"} className={styles.homeLink}>
                    <FaHandHoldingWater className={styles.logoIcons} />
                    <h2>Droply</h2>
                
                </Link>
                     

            </div>

            <div className={styles.rightNavber}>

                { isLoggedIn && user &&  <>
                    <Link to={`/user/${user._id}`}>
                        <p>Dashboard</p>
                    </Link>

                    <p onClick={()=>handleLogout()}>Logout</p>
                
                </>}


                { isLoggedIn && user && user?.types==="suppliers" && 
                        <Link to={`suppliers/map/${user._id}`}>
                            <p>Map</p>
                        
                        </Link>

                }

                { !isLoggedIn &&  <Link to={"/signin"}>
                     <p>SignIn</p>
                
                </Link>}
               
               

            </div>
            
        </div>

        <Outlet />


        </>
    )
}