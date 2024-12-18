import React, { useEffect, useState } from "react";
import axios from "axios";
import {Grid2, Typography, Chip, Button} from "@mui/material";
import { Box } from "@mui/system";
import Albumcard from "./Albumcard";
import styles from "./Albumgrid.module.css"
import Carousel from "../Carousel/Carousel"

export default function Albumgrid () {

    const [albums, setAlbums] = useState([]);
    const [newAlbums, setNewAlbums] = useState([]);
    const [carousel, setCarousel] = useState(false)
    const [carousel2, setCarousel2] = useState(false)
    const [toggleVal, setToggle] = useState("Collapse")
    const [toggleVal2, setToggle2] = useState("Collapse")
    console.log("Carousel : "+carousel)

    let url = "https://qtify-backend-labs.crio.do/albums/top"
    let newUrl = "https://qtify-backend-labs.crio.do/albums/new"

    const performAPICall = async () => {
        try {

        // get the data from the api
        const request = await axios.get(url);
        console.log("Request : " + JSON.stringify(request.data))
        setAlbums(request.data);
                
        }
        catch (err) {
          if (err.response && err.response.status === 404) {
            setAlbums([]);
          }
        }
      }

      const performNewAPICall = async () => {
        try {

        // get the data from the api
        const request = await axios.get(newUrl);
        console.log("Request : " + JSON.stringify(request.data))
        setNewAlbums(request.data);
                
        }
        catch (err) {
          if (err.response && err.response.status === 404) {
            setNewAlbums([]);
          }
        }
      }

      useEffect(() => {
    
        // call the function
        performAPICall()
        performNewAPICall()
        
      }, [])

      useEffect(()=>{

      }, [carousel, carousel2])
    
      const toggle = () => {
          if(carousel==false){
            setCarousel(true)
            setToggle("Show All")
          }
          else{
            setCarousel(false)
            setToggle("Collapse ")
          }
      }

      const toggle2 = () => {
        if(carousel2==false){
          setCarousel2(true)
          setToggle2("Show All")
        }
        else{
          setCarousel2(false)
          setToggle2("Collapse ")
        }
    }

    return (
      <div>   
        
          
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'fit-content', backgroundColor:"black", border:"none" }}>
        
        <Grid2 className={styles.albumgrid}>
            <div className={styles.topcontent}>
            <Typography style={{color:"white", fontFamily: "Poppins", fontSize: "20px"}}>Top Album</Typography> 
            <Button onClick={()=>toggle()} style={{padding:"0px", fontSize: "20px", backgroundColor:"black", color:"rgba(52, 201, 75, 1)", fontFamily: "Poppins"}}>{toggleVal}</Button>  
            </div>
          {!(albums.length==0) ? 
          (
           (carousel==false) ? 
            <Grid2 container sx={{maxWidth: "100%", height: "fit-content"}} rowSpacing={3} >
                {albums.map((album) => (
                  <Grid2 size={{lg:2, md:4, sm:2}} key={album.id} className={styles.center}>
                    <div style={{color: "white", width: "159px"}}>
                    <Albumcard album={album}/>
                    <div style={{color: "white", fontSize: "14px", marginTop: "6px"}}>
                    {album.title}
                    </div>
                    
                    </div>
      
                  
                  </Grid2>      
                ))}
            </Grid2> : 
            <div><Carousel albums={albums}/></div> 
          ) : 
            <Grid2></Grid2>
              }
            
        </Grid2>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'fit-content', backgroundColor:"black", border:"none" }}>
        <Grid2 className={styles.albumgrid}>
            <div className={styles.topcontent}>
            <Typography style={{color:"white", fontFamily: "Poppins", fontSize: "20px"}}>New Album</Typography> 
            <Button onClick={()=>toggle2()} style={{padding:"0px", fontSize: "20px", backgroundColor:"black", color:"rgba(52, 201, 75, 1)", fontFamily: "Poppins"}}>{toggleVal2}</Button>  
            </div>
          {!(newAlbums.length==0) ? 
          (
           (carousel2==false) ? 
            <Grid2 container sx={{maxWidth: "100%", height: "fit-content"}} rowSpacing={3} >
                {newAlbums.map((album) => (
                  <Grid2 size={{lg:2, md:4, sm:2}} key={album.id} className={styles.center}>
                    <div style={{color: "white", width: "159px"}}>
                    <Albumcard album={album}/>
                    <div style={{color: "white", fontSize: "14px", marginTop: "6px"}}>
                    {album.title}
                    </div>
                    
                    </div>
      
                  
                  </Grid2>      
                ))}
            </Grid2> : 
            <div><Carousel albums={albums}/></div> 
          ) : 
            <Grid2></Grid2>
              }
            
        </Grid2>
        </Box>
        </div>
    )
}
