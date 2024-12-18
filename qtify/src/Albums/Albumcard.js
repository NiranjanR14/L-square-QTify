import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Albumcard.module.css"
import {
    Box,
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
    type,
}) => {

    return (
    (type=="album") ? 
    <Card className={styles.card} >
    <CardMedia component="img" alt={album.name} src={album.image} sx={{width:"100%", height:"170px"}}/>
      <Box sx={{height:"25px", padding: "0px", marginTop:"6px", marginLeft: "6px"}}>
      {/* <Box sx={{display:"flex", justifyContent:"flex-start" , alignItems:"center", height:"100%"}}> */}
      <Chip style={{color: "white", backgroundColor: "black", width: "71px", height:"23px", fontSize:"10px"}} label={`${album.follows} follows`} />
      {/* </Box> */}
      </Box>
    </Card> 
    :
    <Card className={styles.card} >
    <CardMedia component="img" alt={album.title} src={album.image} sx={{width:"100%", height:"170px"}}/>
      <Box sx={{height:"25px", padding: "0px", marginTop:"6px", marginLeft: "6px"}}>
      {/* <Box sx={{display:"flex", justifyContent:"flex-start" , alignItems:"center", height:"100%"}}> */}
      <Chip style={{color: "white", backgroundColor: "black", width: "71px", height:"23px", fontSize:"10px"}} label={`${album.likes} likes`} />
      {/* </Box> */}
      </Box>
    </Card> 
    
       
    )
}

export default Albumcard;