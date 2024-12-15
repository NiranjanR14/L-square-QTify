import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Albumcard.module.css"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Rating,
    Typography,
    Chip,
  } from "@mui/material";
  

const Albumcard = ({
    album,
}) => {

    return (
    <Card className={styles.card} >
      <CardMedia component="img" alt={album.name} src={album.image} sx={{width:"100%", height:"170px"}}/>
        <CardContent sx={{padding: 0}}>
        <Chip style={{color: "white", backgroundColor: "black", width: "71px", height:"23px", fontSize:"10px"}} label={`${album.follows} follows`} />
        </CardContent>
    </Card>
       
    )
}

export default Albumcard;