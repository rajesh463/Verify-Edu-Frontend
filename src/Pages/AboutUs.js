import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./AboutUs.css"; // Assuming you have this file for styling

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <header className="aboutus-header">
        <h1>About Us</h1>
        <p>Learn more about our mission and the team behind the Student Verification System.</p>
      </header>

      <section className="aboutus-content">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide an easy-to-use, reliable, and secure platform for verifying student records.
          We aim to streamline the verification process for educational institutions and ensure data integrity.
        </p>

        <h2>Our Team</h2>
        <p>
          We are a team of dedicated developers and education specialists working together to create an efficient
          system that empowers institutions, students, and administrators alike.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>Reliable and secure verification system</li>
          <li>Fast and accurate processing</li>
          <li>User-friendly interface for easy navigation</li>
          <li>Scalable solution for various educational institutions</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          Have questions? Feel free to reach out to us at <strong>support@verification.com</strong>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
