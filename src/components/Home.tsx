import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import codem from "../assets/images/code image.jpg"
import codem2 from "../assets/images/codem2.jpg"
import codem3 from "../assets/images/codem3.jpg"
import codem4 from "../assets/images/codem4.jpg"
import { useNavigate } from "react-router-dom";


const images = [codem, codem2, codem3, codem4];

function Home() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const startSliding = () => {
    if (intervalRef.current) return;
    
    intervalRef.current = window.setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
  };

  const stopSliding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startSliding();
    return () => stopSliding();
  }, []);

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const click = () => {
    navigate("/compose")
  }

  return (
    <>
    <Navbar />
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          {images.map((image, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-cover bg-center opacity-60 transition-opacity duration-[1500ms] ease-in-out ${
                index === i ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>

        <div 
          className="absolute inset-0 z-20"
          onMouseEnter={stopSliding}
          onMouseLeave={startSliding}
        >
          <div className="divhome flex-center">
            <h1 className="homeh1">Share your coding experience and connect with people</h1>
          </div>
          <div className="flex flex-col flex-center">
              <button className="homebtn" onClick={click}>Get Started</button>
          </div>
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 flex gap-4">
            <button
              onClick={prevImage}
              className="-left-43 md:-left-80 lg:-left-140 slidbtn"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={nextImage}
              className="-right-43 md:-right-80 lg:-right-140 slidbtn"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home;
