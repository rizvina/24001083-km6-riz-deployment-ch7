import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // Footer component
    <footer className="bg-dark text-light py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            {/* Logo IMovie */}
            <a
              href="/"
              className="text-danger text-lg font-bold"
              style={{
                fontSize: "28px",
                color: "#FFD700",
                borderBottom: "2px solid #FFD700",
              }}
            >
              IMovie
            </a>
            {/* Copyright */}
            <small
              className="block text-muted"
              style={{ fontSize: "18px", color: "white" }}
            >
              © {new Date().getFullYear()} IMovie, All rights reserved.
            </small>
          </div>

          <a
            href="/about-us"
            className="text-lg font-bold transition duration-300 ease-in-out transform hover:scale-105"
            style={{
              fontSize: "20px",
              color: "#FFD700",
              borderBottom: "2px solid #FFD700",
              padding: "8px 16px",
              backgroundColor: "#FF4500",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            About Us
          </a>

          <div className="flex">
            {/* Tautan Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            >
              <FaFacebook style={{ fontSize: "28px", color: "#FFD700" }} />
            </a>

            {/* Tautan Twitter */}
            <a
              href="https://x.com/omuji711?s=11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            >
              <AiFillTwitterCircle
                style={{ fontSize: "28px", color: "#FFD700" }}
              />
            </a>

            {/* Tautan Instagram */}
            <a
              href="https://www.instagram.com/rzhi__?igsh=aG9hZDdqdnZ3cHFt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <FaSquareInstagram
                style={{ fontSize: "28px", color: "#FFD700" }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
