import React from "react";
import "./brands.css";

const brandList = [
  require("../../assets/slack.png"),
  require("../../assets/atlassian.png"),
  require("../../assets/shopify.png"),
  require("../../assets/dropbox.png"),
  require("../../assets/google.png"),
];

const Brands = () => {
  return (
    <div className="brand-component">
      {brandList.map((items) => (
        <img src={items} alt="company-logo" />
      ))}
    </div>
  );
};

export default Brands;
