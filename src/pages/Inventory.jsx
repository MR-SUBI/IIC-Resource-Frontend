import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/inventory.css";
import Topbar from "../components/Topbar";
import validVendor from "../assets/user.svg";
import filterIcon from "../assets/filter.svg";
import close from "../assets/close.svg";
import InventoryTable from "../components/InventoryTable";
import axios from "axios";

const Inventory = () => {
  const [items, setItems] = useState();
  const [itemData, setItemData] = useState({
    item_name: "",
    category: "",
    itemCategory: "",
    measuring_unit: "",
    productCategory: "",
    low_limit: 0,
  });

  const [error, setError] = useState("");

  const [category, setCategory] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  const [addFormVisibility, setAddFormVisibility] = useState(false);

  const displayAddPopup = () => {
    setAddFormVisibility(true);
  };

  const closeAddItemForm = () => {
    setError("");
    setAddFormVisibility(false);
  };

  const handleChange = (e) => {
    setItemData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  const handleSUbmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8898/api/addItem",
        itemData
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };
  useEffect(() => {
    const getAllItems = async () => {
      try {
        const response = await axios.get("http://localhost:8898/api/items");
        setItems(response.data.items);

        const categoryResponse = await axios.get(
          "http://localhost:8898/api/category"
        );

        const itemCategoryResponse = await axios.get(
          "http://localhost:8898/api/itemCategory"
        );
        const productCategoryResponse = await axios.get(
          "http://localhost:8898/api/productCategory"
        );

        setProductCategory(productCategoryResponse.data.allData);
        setItemCategory(itemCategoryResponse.data.allData);
        setCategory(categoryResponse.data.category);
        setItems(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    getAllItems();
  }, []);

  console.log(productCategory);

  return (
    <div className="inventory">
      <Sidebar />
      <div className="inventory-main">
        <Topbar />
        <div className="inventory-summary">
          <div className="overall-inventory">
            <h3 className="title">Overall Inventory</h3>
            <div className="inventory-container">
              <div className="container">
                <img src={validVendor} alt="" />
                <h4>31</h4>
                <p>Number of category</p>
              </div>
              <div className="container">
                <img src={validVendor} alt="" />
                <h4>{}</h4>
                <p>Number of items</p>
              </div>
              <div className="container">
                <img src={validVendor} alt="" />
                <h4>31</h4>
                <p>Number of lowstock</p>
              </div>
            </div>
          </div>
        </div>
        {/* Items table */}
        <div className="items-container">
          <div className="item-container-top">
            <div className="container-title">
              <p>Items</p>
            </div>

            <div className="icon-actions">
              <input type="text" placeholder="Search items" />

              <button className="filter-btn" aria-label="Menu">
                <img src={filterIcon} alt="" />
                Filter
              </button>

              <button className="add-btn" onClick={displayAddPopup}>
                Add Item
              </button>
            </div>
          </div>
          <InventoryTable />
        </div>
      </div>

      {/* Creating a form for adding item in the inventory */}
      {addFormVisibility && (
        <form action="" onSubmit={handleSUbmit} className="filter-form">
          <button
            type="button"
            className="discard-btn"
            onClick={closeAddItemForm}
          >
            <img src={close} alt="" />
          </button>
          <p className="title">Add Item</p>
          <div className="field">
            <label htmlFor="item_name">Item Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              autoFocus="autofocus"
              name="item_name"
              id="item_name"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="">Choose Category</option>
              {category.map((cat, index) => (
                <option key={index} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="product_category"> Product Category</label>
            <select
              name="productCategory"
              id="product_category"
              value={itemData.productCategory}
              onChange={handleChange}
            >
              <option value="">Select Product Category</option>
              {productCategory.map((prodCat, index) => (
                <option key={index} value={prodCat.product_category_name}>
                  {prodCat.product_category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="item_category">Item Category</label>
            <select
              name="itemCategory"
              id="item_category"
              onChange={handleChange}
            >
              <option value="">Choose Item Category</option>
              {itemCategory.map((itemCat, index) => (
                <option key={index} value={itemCat.item_category_name}>
                  {itemCat.item_category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="measuring_unit">Measuring Unit</label>
            <input
              type="text"
              placeholder="Enter measuring unit"
              name="measuring_unit"
              id="measuring_unit"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="low_limit">Low Limit</label>
            <input
              type="number"
              placeholder="Enter low limit"
              name="low_limit"
              id="low_limit"
              onChange={handleChange}
            />
          </div>

          {error && <span class="text-red-500">{error}</span>}

          {/* Add item button */}
          <div className="buttons">
            <button type="submit" className="add-btn">
              Add Item
            </button>
          </div>
        </form>
      )}

      {addFormVisibility && (
        <div className="overlay" onClick={closeAddItemForm}></div>
      )}
    </div>
  );
};

export default Inventory;
