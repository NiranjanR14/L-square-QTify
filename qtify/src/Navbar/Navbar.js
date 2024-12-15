import React from "react";
import { Link } from "react-router-dom";
import Feedback from "../Feedback/Feedback";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";

function Navbar({ searchData }) {
  const feedback = "Give Feedback";
  return (
    
    <nav className={styles.navbar}>
      <Link to="/">
        <Logo />
      </Link>
      <Search
        placeholder="Search a song of your choice"
        searchData={searchData}
      />
      <Feedback text={feedback}/>
    </nav>
  );
}

export default Navbar;
