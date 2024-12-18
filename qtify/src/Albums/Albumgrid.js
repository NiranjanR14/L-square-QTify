import React, { useEffect, useState } from "react";
import axios from "axios";
import {Grid2, Typography, Chip, Button} from "@mui/material";
import { Box, fontFamily } from "@mui/system";
import Albumcard from "./Albumcard";
import styles from "./Albumgrid.module.css"
import Carousel from "../Carousel/Carousel"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


export default function Albumgrid () {

    const [albums, setAlbums] = useState([]);
    const [newAlbums, setNewAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genreVal, setGenreVal] = useState("all");
    
    const [carousel, setCarousel] = useState(false)
    const [carousel2, setCarousel2] = useState(false)
    const [toggleVal, setToggle] = useState("Collapse")
    const [toggleVal2, setToggle2] = useState("Collapse")
    const [filteredVals, setFilteredVals] = useState([]);

    let url = "https://qtify-backend-labs.crio.do/albums/top"
    let newUrl = "https://qtify-backend-labs.crio.do/albums/new"
    let songsUrl = "https://qtify-backend-labs.crio.do/songs"
    let genreUrl = "https://qtify-backend-labs.crio.do/genres"

    const performAPICall = async () => {
        try {

        // get the data from the api
        const request = await axios.get(url);
        //console.log("Request : " + JSON.stringify(request.data))
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
        //console.log("Request : " + JSON.stringify(request.data))
        setNewAlbums(request.data);
                
        }
        catch (err) {
          if (err.response && err.response.status === 404) {
            setNewAlbums([]);
          }
        }
      }

      const performSongsAPICall = async () => {
        try {

        // get the data from the api
        const request = await axios.get(songsUrl);
        //console.log("Songs : " + JSON.stringify(request.data))
        setSongs(request.data);
                
        }
        catch (err) {
          if (err.response && err.response.status === 404) {
            setSongs([]);
          }
        }
      }

      const performGenreAPICall = async () => {
        try {

        // get the data from the api
        const request = await axios.get(genreUrl);
        //console.log("Genres : " + JSON.stringify(request.data.data))
        setGenres(request.data.data);
              
        }
        catch (err) {
          if (err.response && err.response.status === 404) {
            setGenres([]);
          }
        }
      }

      const filterSongs = (genres, songs) => {

        // if(genres.length!=0){
        //   setGenreVal(genres[0].key) 
        // }

        genres.map((genre)=>(
          console.log("Key : "+genre.key + "  Label : "+genre.label)
        ))

        let filteredList = []
        for(let i=0;i<genres.length;i++){
            let temp = {}
            temp.key = genres[i].key
            temp.songs = []
            for(let j=0;j<songs.length;j++){
              if(songs[j].genre.key==genres[i].key){
                  (temp.songs).push(songs[j])
              }
            }
            // console.log("Temp : "+temp.key)
            // temp.songs.map((song)=>(
            //   console.log("Song : " + JSON.stringify(song))
            // ))
            filteredList.push(temp)
        }
        setFilteredVals(filteredList)
        
      }

      useEffect(() => {
    
        // call the function
        performAPICall()
        performNewAPICall()
        performSongsAPICall()
        performGenreAPICall()
        
      }, [])

      useEffect(()=>{

      }, [carousel, carousel2, filteredVals])

      useEffect(()=>{
        
        // console.log("Genres of 0 : " + JSON.stringify(genres[0]))
        // setGenreVal(genres[0].key)  
        filterSongs(genres, songs);
        
      }, [genres])
    
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

    const handleChange = (event, newValue) => {
      setGenreVal(newValue);
    };

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
                    <Albumcard album={album} type="album"/>
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
                    <Albumcard album={album} type="album"/>
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
            <Typography style={{color:"white", fontFamily: "Poppins", fontSize: "20px"}}>Songs</Typography> 
            </div>
          {(!(songs.length==0) && (!genres.length==0) && (genreVal) && (filteredVals)) ? 
          <div>
           <TabContext value={genreVal} style={{color: "white", fontFamily: "Poppins"}}>
           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
             <TabList  onChange={handleChange} aria-label="lab API tabs example">
                <Tab style={{color: "white", fontFamily: "Poppins"}} label="All" value="all"/> 
               { genres.map((genre)=>(
                    <Tab style={{color: "white", fontFamily: "Poppins"}} label={genre.label} value={genre.key}/>
                )) }
             </TabList>
           </Box>
           <TabPanel style={{color: "white", fontFamily: "Poppins"}} value="all"><Carousel albums={songs} type="song"/></TabPanel>
           { genres.map((genre1)=>(
                    <TabPanel style={{color: "white", fontFamily: "Poppins"}} value={genre1.key}>
                      {filteredVals.map((val)=>(
                      (val.key==genre1.key)?<Carousel albums={val.songs} type="song"/> : null
                    ))}
                    </TabPanel>
            )) }
         </TabContext>
           
           </div> 
           : 
            <Grid2></Grid2>
            }
            
        </Grid2>
        </Box>
        </div>
    )
}
