import React, { useEffect, useState } from "react";
import axios from "axios";
import {Grid2, Typography, Chip, Button} from "@mui/material";
import { Box } from "@mui/system";
import Albumcard from "./Albumcard";
import styles from "./Albumgrid.module.css"

export default function Albumgrid () {

    const [albums, setAlbums] = useState([]);

    let url = "https://qtify-backend-labs.crio.do/albums/top"

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
    
      useEffect(() => {
    
        // call the function
        performAPICall()
        
      }, [])
    

    return (
      <div>   
        
          
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'fit-content', backgroundColor:"black", border:"none" }}>
        
        <Grid2 className={styles.albumgrid}>
            <div className={styles.topcontent}>
            <p style={{color:"white"}}>Top Album</p> 
            <Button style={{padding:"0px", backgroundColor:"black", color:"rgba(52, 201, 75, 1)", fontFamily: "Poppins"}}>Collapse</Button>  
            </div>
          {!(albums.length==0) ? 
            <Grid2 container sx={{maxWidth: "100%", height: "fit-content"}} rowSpacing={3} >
                {albums.map((album) => (
                  <Grid2 size={{lg:2, md:4, sm:2}} key={album.id} className={styles.center}>
                    <div style={{color: "white", width: "159px"}}>
                    <Albumcard album={album}/>
                    <div >
                    {album.title}
                    </div>
                    
                    </div>
      
                  
                  </Grid2>      
                ))}
            </Grid2> : 
            <Grid2></Grid2>
              }
            
        </Grid2>
        </Box>
        </div>
    )
}
