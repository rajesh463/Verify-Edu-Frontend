import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUniversity, FaUserGraduate, FaCheckCircle } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const images = [
    "https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0=",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="carousel">
          <img
            src={images[currentImageIndex]}
            alt="Educational Institution"
            className="carousel-image"
          />
          <div className="hero-content">
            <h1>Student Verification Portal</h1>
            <p>Secure, Efficient, and Reliable Document Verification</p>
            <div className="hero-buttons">
              <Link to="/login" className="primary-button">Get Started</Link>
              <Link to="/aboutus" className="secondary-button">Learn More</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaUniversity className="feature-icon" />
            <h3>For Institutions</h3>
            <p>Streamline verification processes and manage student records efficiently</p>
            <Link to="/institute-register" className="feature-link">Register as Institute →</Link>
          </div>
          <div className="feature-card">
            <FaUserGraduate className="feature-icon" />
            <h3>For Students</h3>
            <p>Easy document submission and real-time verification status tracking</p>
            <Link to="/register" className="feature-link">Register as Student →</Link>
          </div>
          <div className="feature-card">
            <FaCheckCircle className="feature-icon" />
            <h3>Trusted Verification</h3>
            <p>Secure and reliable verification process with institutional backing</p>
            <Link to="/aboutus" className="feature-link">Learn More →</Link>
          </div>
        </div>
      </div>

      <div className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-text">New: Digital Document Verification Now Available!</span>
          <Link to="/aboutus" className="announcement-link">Learn More →</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
