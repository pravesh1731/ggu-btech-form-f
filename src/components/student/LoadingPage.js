import React from "react";
import banner from "../assets/banner.png";
import "../../App.css";

const LoadingPage = () => {
  return (
    <div style={{ 
      maxWidth: 500, 
      margin: "auto", 
      textAlign: "center", 
      padding: "100px 20px" 
    }}>
      <img
        src={banner}
        alt="GGU Banner"
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0px auto 30px auto',
          display: 'block',
          borderRadius: '12px',
          objectFit: 'contain',
          background: '#fff'
        }}
      />
      <h3>Submitting your application...</h3>
      <div style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
        margin: '20px auto'
      }}></div>
      <p>Please wait while we process your application.</p>
    </div>
  );
};

export default LoadingPage;
