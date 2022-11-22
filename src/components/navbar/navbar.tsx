import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CVModal from "../cv_modal/cv_modal";
import "./navbar.scss";

type NavItemType = {
  label: string;
  path: string;
};

const NavItem = ({ label, path }: NavItemType) => {
  const { pathname } = useLocation();

  return (
    <li>
      <Link to={path}>
        {label}
        {pathname === path && (
          <motion.span
            layoutId="rect"
            transition={{
              duration: 0.6,
              type: "spring",
              damping: 25,
              stiffness: 500,
            }}
          ></motion.span>
        )}{" "}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const handleHamburgerClick = () => {
    const hamburger = document.querySelector(".hamburger");
    const ul = document.querySelector("ul");
  
    hamburger?.classList.toggle("active");
    ul?.classList.toggle("active");
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <h2>
          <NavItem label="Tycho van Rosmalen | Portfolio" path="/" />
        </h2>

        <ul>
          <NavItem label="Home" path="/" />
          <NavItem label="Experience" path="/experience" />
          <NavItem label="Projects" path="/projects" />
          <NavItem label="Contact" path="/contact" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="save-button"
            onClick={() => (modalOpen ? close() : open())}
          >
            Resumé
          </motion.button>
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {modalOpen && <CVModal modalOpen={modalOpen} handleClose={close} />}
          </AnimatePresence>
        </ul>

        <div className="hamburger" onClick={handleHamburgerClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
