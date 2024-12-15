import React from "react";
import styles from "./feedback.module.css"

export default function Feedback ({text}) {
    return (
        <button className={styles.feedback}>{text}</button>
    )
}