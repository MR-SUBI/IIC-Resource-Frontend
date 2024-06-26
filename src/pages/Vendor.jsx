import "../styles/vendor.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import React, { useEffect, useState } from "react";
import filterIcon from "../assets/filter.svg";
import validVendor from "../assets/user.svg";
import close from "../assets/close.svg";
import axios from "axios";
import VendorTable from "../components/VendorTable";
const Vendor = () => {
  const [vendor, setVendor] = useState({
    vendor_name: "",
    vat_number: "",
    vendor_contact: "",
    category: ""
  });

  const [addFormVisibility, setAddFormVisibility] = useState(false);

  const openAddVendorForm = () => {
    setAddFormVisibility(true);
  };

  const closeAddVendorForm = () => {
    setAddFormVisibility(false);
  };

  const handleChange = (e) => {
    setVendor((e.target.key = e.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8898/api/addVendor",
        vendor
      );
      
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="vendor">
      <Sidebar />
      <div className="vendor-main">
        <Topbar />
        <div className="vendor-summary">
        <div className="overall-vendor">
          <h3 className="summary-title">Summary</h3>
          <div className="summary-container">
            <div className="summary">
              <img src={validVendor} alt="" />
              <h4>31</h4>
              <p>Number of Vendors</p>
            </div>
            <div className="summary">
              <img src={validVendor} alt="" />
              <h4>31</h4>
              <p>Whitelisted Vendors</p>
            </div>
            <div className="summary">
              <img src={validVendor} alt="" />
              <h4>31</h4>
              <p>Blacklisted Vendors</p>
            </div>
            <div className="summary">
              <img src={validVendor} alt="" />
              <h4>31</h4>
              <p>Payment Remaining</p>
            </div>
          </div>
        </div>
        </div>

        <div className="vendor-container">
          <div className="top">
          <div className="up">
            <p> Vendors </p>
            </div>

            <div className="right">
              <input type="text" placeholder="Search Items..." />
              
              <button className="category-btn" aria-label="Menu">
                <img src={filterIcon} alt="" />
                Category
              </button>
             
              
              <button className="add-button" onClick={openAddVendorForm}>
                Add Vendor
              </button>
            </div>
          </div>

          <VendorTable />
          {/* <div className="last">
            <div className="previous">
              <button>Previous </button>
            </div>
            <div className="middle">Page 1 of 10</div>
            <div className="next">
              <button> Next </button>
            </div>
          </div> */}
        </div>

        {addFormVisibility && (
          <form action="" onSubmit={handleSubmit} className="filter">
            <button
              type="vendor-button"
              className="discard-button"
              onClick={closeAddVendorForm}
            >
              <img src={close} alt="" />
            </button>
            <p className="vendor_title">Add Item</p>
            <div className="vendor_field">
              <label htmlFor="vendor_name">Item Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                name="vendor_name"
                id="item_name"
                onChange={handleChange}
              />
            </div>
            <div className="vendor_field">
              <label htmlFor="category">Vendor Vat</label>
              <input type="text" name="vat_number" onChange={handleChange} />
            </div>
            <div className="vendor_field">
              <label htmlFor="measuring_unit">Contact</label>
              <input
                type="text"
                placeholder="Enter measuring unit"
                name="vendor_contact"
                onChange={handleChange}
              />
            </div>
            <div className="vendor_field">
              <label htmlFor="category"> Category</label>
              <select id="category" name="category" onChange={handleChange}>
                <option value="">Contact</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Appliances">Appliances</option>
              </select>
            </div>
            <div className="vendor_buttons">
              <button type="submit" className="add-button">
                Add Vendor
              </button>
            </div>
          </form>
        )}
      </div>

      {addFormVisibility && 
      (
      <div className="overlay-vendor" onClick={closeAddVendorForm}> </div> )}
    </div>
  );
};
export default Vendor;
