import React from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

interface layoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const Layout: React.FC<layoutProps> = (props) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
