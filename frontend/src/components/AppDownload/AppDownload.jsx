import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const AppDownload = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <div className="app-download" id="app-download">
        <hr />
        <br />
        <p>
          For Better Experience Download
          <br />
          Shopo App
        </p>
        <div className="add-download-platforms">
          <img src={assets.play_store} alt="" />
          <img src={assets.app_store} alt="" />
        </div>
        <br />
        <hr />
        <br />
      </div>
    </motion.div>
  );
};

export default AppDownload;
