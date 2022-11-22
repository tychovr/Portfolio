import { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home | Tycho's Portfolio";
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <div className="home">
          <div className="home-text">
            <h3>WELCOME TO MY PORTFOLIO</h3>
            <p className="home-typewriter">
              <Typewriter
                options={{
                  strings: [
                    "I'm Tycho van Rosmalen",
                    "I'm a Full Stack Developer",
                    "Student, Software Development",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                }}
              />
            </p>
            <div className="home-links">
              <div className="home-link">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate("/projects")}
                >
                  <li className="fa fa-briefcase" /> 
                  View Projects
                </motion.button>
              </div>

              <div className="home-link">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate("/contact")}
                >
                  <li className="fa fa-envelope" />
                  Contact Me
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
