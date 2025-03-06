"use client";
import React, {useState} from "react";
import Chat from "./chat";
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/motion";
import { IoChatbubblesSharp } from "react-icons/io5";

export default function Popupp() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "500px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Chat />
        </div>
      )}
      <motion.div
        variants={fadeIn("up", "tween", 0.5, 1)}
        initial="hidden"
        animate="show"
        onClick={() => setIsOpen(!isOpen)}
        
      >
        <button
          className="btn btn-primary rounded-circle"
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IoChatbubblesSharp
           className="ri-chat-3-line"
           style={{
            fontSize: '2rem',
            color: 'white',
          }} />
        
        </button>
      </motion.div>
    </div>
  );
}
