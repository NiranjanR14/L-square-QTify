import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper/modules";
import Albumcard from "../Albums/Albumcard";
import { useRef } from 'react';
import left from "../assets/Group 3741.png"
import right from "../assets/Group 3740.png"
import styles from "./Carousel.module.css"
import {Button} from "@mui/material"

import "swiper/css";

const Carousel = ({
    albums,
}) => {

    const swiperRef = useRef();

    return (
    <Swiper slidesPerView={6} spaceBetween={50} modules={[Navigation]}
    onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}>
        
        {albums.map((album)=>(
            <SwiperSlide>
            <div style={{color: "white", width: "159px"}}>
            <Albumcard album={album}/>
            <div style={{color: "white", fontSize: "14px", marginTop: "6px"}}>
            {album.title}
            </div>
            </div></SwiperSlide>
        ))}
        <div className={styles.prev}>
        <button style={{cursor:"pointer", borderRadius:"50%", padding:"0px", margin:"0px", border:"none", height:"32px"}} onClick={() => swiperRef.current?.slidePrev()} ><img src={left} alt="prev" /></button>
        </div>
        <div className={styles.next}>
        <button style={{cursor:"pointer", borderRadius:"50%", padding:"0px", margin:"0px", border:"none", height:"32px"}}  onClick={() => swiperRef.current?.slideNext()} ><img src={right} alt="next" /></button>
        </div>
    </Swiper>
    )
}

export default Carousel;