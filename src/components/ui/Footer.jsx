import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-10 border-t border-white/20 bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-20">
      <p className="text-sm">
        © {new Date().getFullYear()} Fluent.io — Built for connection, powered by innovation.
      </p>
    </footer>
  );
};

export default Footer;
