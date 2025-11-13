import React from "react";
import Header from "./Header";

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
    <Header />
    <main className="flex-1 w-full">{children}</main>
    <footer className="bg-gray-900 text-gray-300 text-center py-12 mt-10">
      © {new Date().getFullYear()} MediKlik. All rights reserved.
    </footer>
  </div>
);

export default Layout;
