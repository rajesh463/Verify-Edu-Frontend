import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  // Images for the carousel
  const images = [
    "https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0=",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change image every 3 seconds
  //useeffect used
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="home-container">
      {/* Image Carousel */}
      <div className="carousel">
        <img
          src={images[currentImageIndex]}
          alt="Carousel"
          className="carousel-image"
        />
      </div>

      {/* Running Notice (Ticker) */}
      <div className="ticker">
        <marquee>Welcome to the Student Verification System!</marquee>
      </div>

      <section className="welcome-message">
        <h1>Welcome to the Student Verification Portal</h1>
        <p>Here you can verify students and manage records easily.</p>
      </section>
    </div>
  );
};

export default Home;
