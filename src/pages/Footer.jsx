import React from "react";
import { motion } from "motion/react";
import { BiLogoMagento } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#040404] text-white">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left"
      >

        {/* Logo / About */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-2xl font-bold bg-gradient-to-r bg-white flex justify-between items-center gap-1 bg-clip-text text-transparent">
           <BiLogoMagento className="text-white" /> Web Ai
          </div>
          <p className="text-gray-400 mt-4 text-sm max-w-sm">
            Build modern, responsive websites with the power of AI.
            Turn your ideas into real websites instantly.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">GitHub</span>
            <span className="hover:text-white cursor-pointer">LinkedIn</span>
          </div>
        </div>

      </motion.div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center py-4 text-gray-500 text-sm px-4">
        © 2026 AI Builder. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;