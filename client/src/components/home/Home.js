import { motion } from "framer-motion";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div className={styles.homePageContainer}>
            {/* Animated Background */}
            <div className={styles.animatedBackground}></div>
            
            {/* Heading */}
            <motion.h1 
                className={styles.heading}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome to Droply
            </motion.h1>
            
            {/* Start Button */}
            <motion.button
                className={styles.startButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
               
            >
                <Link to={"/signin"}>
                        Get Started
                </Link>
                
            </motion.button>
        </div>
    );
}
