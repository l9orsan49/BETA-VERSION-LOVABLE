// pages/index.js
import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

export default function WelcomePage() {
  useEffect(() => {
    // Get DOM elements
    const comptableCard = document.getElementById("comptable-card");
    const fondateurCard = document.getElementById("fondateur-card");
    const comptableScene = document.getElementById("comptable-scene");
    const fondateurScene = document.getElementById("fondateur-scene");
    
    let currentActive = null;
    
    // Animate background objects in a given scene
    function animateBackgroundObjects(scene) {
      const objects = scene.querySelectorAll(".bg-object");
      objects.forEach((obj, index) => {
        const randomDelay = index * 100;
        setTimeout(() => {
          const randomRotate = Math.random() * 10 - 5;
          obj.style.transform = `scale(1) rotate(${randomRotate}deg)`;
          obj.style.transition = `all ${1 + Math.random() * 0.5}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
        }, randomDelay);
      });
    }
    
    // Reset background objects animation
    function resetBackgroundObjects(scene) {
      const objects = scene.querySelectorAll(".bg-object");
      objects.forEach((obj) => {
        obj.style.transform = "scale(0.7)";
      });
    }
    
    if (comptableCard) {
      comptableCard.addEventListener("mouseenter", () => {
        if (currentActive !== "comptable") {
          if (currentActive === "fondateur") {
            fondateurScene.classList.remove("active-scene");
            resetBackgroundObjects(fondateurScene);
            fondateurScene.style.opacity = "0";
          }
          comptableScene.style.opacity = "1";
          comptableScene.classList.add("active-scene");
          animateBackgroundObjects(comptableScene);
          currentActive = "comptable";
        }
      });
    }
    
    if (fondateurCard) {
      fondateurCard.addEventListener("mouseenter", () => {
        if (currentActive !== "fondateur") {
          if (currentActive === "comptable") {
            comptableScene.classList.remove("active-scene");
            resetBackgroundObjects(comptableScene);
            comptableScene.style.opacity = "0";
          }
          fondateurScene.style.opacity = "1";
          fondateurScene.classList.add("active-scene");
          animateBackgroundObjects(fondateurScene);
          currentActive = "fondateur";
        }
      });
    }
    
    // Background floating and pulsing animation
    function startBackgroundAnimation() {
      document.querySelectorAll(".large-icon").forEach((icon) => {
        setInterval(() => {
          const randomX = Math.random() * 10 - 5;
          const randomY = Math.random() * 10 - 5;
          const randomRotate = Math.random() * 5 - 2.5;
          icon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 3000 + Math.random() * 2000);
      });
      document.querySelectorAll(".circle").forEach((circle) => {
        setInterval(() => {
          circle.style.transform = "scale(1.05)";
          setTimeout(() => {
            circle.style.transform = "scale(1)";
          }, 1500);
        }, 3000);
      });
    }
    startBackgroundAnimation();
  }, []);
  
  return (
    <>
      <Head>
        <title>Welcome - Choose Your Access</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* Load Font Awesome */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
        strategy="afterInteractive"
      />
      {/* Background container with dynamic scenes */}
      <div className="background-container">
        {/* Comptable Scene */}
        <div className="bg-scene comptable-scene" id="comptable-scene">
          <div className="pattern comptable-pattern"></div>
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <i
            className="large-icon fas fa-calculator bg-object"
            style={{ top: "15%", left: "10%" }}
          ></i>
          <i
            className="large-icon fas fa-chart-line bg-object"
            style={{ top: "65%", left: "20%" }}
          ></i>
          <i
            className="large-icon fas fa-file-invoice-dollar bg-object"
            style={{ top: "30%", left: "70%" }}
          ></i>
          <i
            className="large-icon fas fa-coins bg-object"
            style={{ top: "70%", left: "75%" }}
          ></i>
          <img
            src="/api/placeholder/240/240"
            alt="Graph"
            className="bg-object"
            style={{
              top: "20%",
              left: "30%",
              opacity: "0.07",
              borderRadius: "10px",
            }}
          />
          <img
            src="/api/placeholder/200/200"
            alt="Spreadsheet"
            className="bg-object"
            style={{
              bottom: "15%",
              right: "10%",
              opacity: "0.07",
              borderRadius: "10px",
            }}
          />
        </div>
        {/* Fondateur Scene */}
        <div className="bg-scene fondateur-scene" id="fondateur-scene">
          <div className="pattern fondateur-pattern"></div>
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <i
            className="large-icon fas fa-crown bg-object"
            style={{ top: "20%", right: "15%" }}
          ></i>
          <i
            className="large-icon fas fa-lightbulb bg-object"
            style={{ bottom: "15%", left: "10%" }}
          ></i>
          <i
            className="large-icon fas fa-rocket bg-object"
            style={{ top: "60%", left: "65%" }}
          ></i>
          <i
            className="large-icon fas fa-chess-king bg-object"
            style={{ top: "25%", left: "20%" }}
          ></i>
          <img
            src="/api/placeholder/240/240"
            alt="Business Strategy"
            className="bg-object"
            style={{
              top: "30%",
              right: "30%",
              opacity: "0.07",
              borderRadius: "10px",
            }}
          />
          <img
            src="/api/placeholder/200/200"
            alt="Company"
            className="bg-object"
            style={{
              bottom: "25%",
              right: "20%",
              opacity: "0.07",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
      
      <div className="container">
        <header>
          <div className="logo">
            <i className="fas fa-leaf"></i>
          </div>
          <h1>Bienvenue</h1>
          <p>Sélectionnez votre type d'accès pour continuer</p>
        </header>
        
        <div className="options-container">
          <section className="options">
            <a
              href="/operatorSide_dashboard"
              className="option-card comptable"
              id="comptable-card"
            >
              <div className="icon-container">
                <i className="icon fas fa-calculator"></i>
                <div className="secondary-icons">
                  <i
                    className="secondary-icon fas fa-chart-line"
                    style={{ top: "20%", left: "20%" }}
                  ></i>
                  <i
                    className="secondary-icon fas fa-coins"
                    style={{ top: "60%", left: "30%" }}
                  ></i>
                  <i
                    className="secondary-icon fas fa-file-invoice"
                    style={{ top: "30%", left: "70%" }}
                  ></i>
                  <i
                    className="secondary-icon fas fa-percentage"
                    style={{ top: "70%", left: "65%" }}
                  ></i>
                </div>
              </div>
              <h2 className="option-title">Accès Comptable</h2>
              <p className="option-desc">
                Gestion financière et rapports comptables pour les professionnels.
              </p>
              <button className="btn btn-comptable">
                Sélectionner <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
              </button>
            </a>
            
            <a
              href="/userSide"
              className="option-card fondateur"
              id="fondateur-card"
            >
              <div className="icon-container">
                <i className="icon fas fa-crown"></i>
                <div className="secondary-icons">
                  <i
                    className="secondary-icon fas fa-lightbulb"
                    style={{ top: "15%", left: "25%" }}
                  ></i>
                  <i
                    className="secondary-icon fas fa-rocket"
                    style={{ top: "65%", left: "20%" }}
                  ></i>
                  <i
                    className="secondary-icon fas fa-chess"
                    style={{ top: "25%", left: "70%" }}
                  ></i>
                  <i
                    className="secondary-icon fas fa-users"
                    style={{ top: "70%", left: "65%" }}
                  ></i>
                </div>
              </div>
              <h2 className="option-title">Accès Fondateur</h2>
              <p className="option-desc">
                Contrôle administratif et stratégique pour les dirigeants.
              </p>
              <button className="btn btn-fondateur">
                Sélectionner <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
              </button>
            </a>
          </section>
        </div>
        
        <footer>
          <p>&copy; 2025 Votre Entreprise. Tous droits réservés.</p>
        </footer>
      </div>
      
      <style jsx global>{`
        /* Global Styles for Welcome Page */
        :root {
          --primary: #2e7d32;
          --primary-light: #4caf50;
          --primary-dark: #1b5e20;
          --secondary: #00796b;
          --secondary-light: #009688;
          --secondary-dark: #00695c;
          --light: #f1f8e9;
          --dark: #1c2a22;
          --white: #ffffff;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', 'Segoe UI', sans-serif;
        }
        body {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow-x: hidden;
          position: relative;
          background-color: var(--light);
        }
        .background-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }
        .bg-scene {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .comptable-scene {
          background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%);
        }
        .fondateur-scene {
          background: linear-gradient(135deg, #e0f2f1 0%, #e0f7fa 100%);
        }
        .bg-object {
          position: absolute;
          transition: all 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          opacity: 0;
          filter: blur(0);
          transform: scale(0.7);
        }
        .active-scene .bg-object {
          opacity: 1;
          transform: scale(1);
        }
        .circle {
          border-radius: 50%;
          position: absolute;
        }
        .comptable-scene .circle-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(76, 175, 80, 0.08) 0%, rgba(46, 125, 50, 0.04) 70%);
          top: -150px;
          right: -100px;
        }
        .comptable-scene .circle-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(76, 175, 80, 0.06) 0%, rgba(46, 125, 50, 0.02) 70%);
          bottom: -200px;
          left: -150px;
        }
        .fondateur-scene .circle-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 150, 136, 0.08) 0%, rgba(0, 121, 107, 0.04) 70%);
          top: -120px;
          left: -100px;
        }
        .fondateur-scene .circle-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 150, 136, 0.06) 0%, rgba(0, 121, 107, 0.02) 70%);
          bottom: -200px;
          right: -150px;
        }
        .large-icon {
          font-size: 160px;
          position: absolute;
          color: rgba(46, 125, 50, 0.05);
          transform-origin: center;
          transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .fondateur-scene .large-icon {
          color: rgba(0, 121, 107, 0.05);
        }
        .pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.03;
          background-size: 24px 24px;
        }
        .comptable-pattern {
          background-image:
            linear-gradient(to right, rgba(76, 175, 80, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(76, 175, 80, 0.5) 1px, transparent 1px);
        }
        .fondateur-pattern {
          background-image:
            radial-gradient(circle, rgba(0, 150, 136, 0.5) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .container {
          max-width: 1100px;
          width: 90%;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
          padding: 2rem 0;
        }
        header {
          margin-bottom: 2rem;
        }
        .logo {
          width: 70px;
          height: 70px;
          margin: 0 auto 1rem;
          background-color: var(--primary);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.8rem;
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
        }
        h1 {
          color: var(--primary-dark);
          font-size: 2.2rem;
          margin-bottom: 0.8rem;
          font-weight: 600;
        }
        p {
          color: #546e7a;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .options-container {
          perspective: 1000px;
        }
        .options {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
          gap: 2.5rem;
          margin-top: 1.5rem;
          transform-style: preserve-3d;
        }
        .option-card {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          padding: 2rem 1.5rem;
          width: 100%;
          max-width: 300px;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
          border: 2px solid transparent;
          z-index: 10;
        }
        .option-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          transition: all 0.3s ease;
        }
        .comptable::before {
          background-color: var(--primary);
        }
        .fondateur::before {
          background-color: var(--secondary);
        }
        .option-card:hover {
          transform: translateY(-10px) rotateX(4deg) rotateY(4deg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .comptable:hover {
          border-color: var(--primary-light);
        }
        .fondateur:hover {
          border-color: var(--secondary-light);
        }
        .icon-container {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.5s ease;
        }
        .comptable .icon-container {
          background-color: rgba(46, 125, 50, 0.1);
        }
        .fondateur .icon-container {
          background-color: rgba(0, 121, 107, 0.1);
        }
        .icon {
          font-size: 2rem;
          transition: all 0.5s ease;
          z-index: 2;
        }
        .comptable .icon {
          color: var(--primary);
        }
        .fondateur .icon {
          color: var(--secondary);
        }
        .option-card:hover .icon-container {
          transform: scale(1.1);
        }
        .option-card:hover .icon {
          transform: rotateY(360deg);
        }
        .secondary-icons {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .option-card:hover .secondary-icons {
          opacity: 1;
        }
        .secondary-icon {
          position: absolute;
          font-size: 0.8rem;
          opacity: 0.7;
        }
        .option-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          transition: color 0.3s ease;
        }
        .comptable .option-title {
          color: var(--primary);
        }
        .fondateur .option-title {
          color: var(--secondary);
        }
        .option-desc {
          color: #607d8b;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          line-height: 1.5;
        }
        .btn {
          display: inline-block;
          padding: 0.7rem 1.4rem;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }
        .btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          transition: all 0.4s ease;
          z-index: -1;
          border-radius: 50px;
        }
        .btn:hover::after {
          width: 100%;
        }
        .btn-comptable {
          background-color: var(--primary);
          color: white;
        }
        .btn-comptable::after {
          background-color: var(--primary-dark);
        }
        .btn-fondateur {
          background-color: var(--secondary);
          color: white;
        }
        .btn-fondateur::after {
          background-color: var(--secondary-dark);
        }
        footer {
          margin-top: 3rem;
          color: #78909c;
          font-size: 0.8rem;
          padding: 1rem;
        }
        /* Responsive adjustments for phones */
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }
          .options {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
          .option-card {
            max-width: 100%;
          }
          .option-card:hover {
            transform: translateY(-5px);
          }
          .large-icon {
            font-size: 100px;
            opacity: 0.03;
          }
        }
      `}</style>
    </>
  );
}
