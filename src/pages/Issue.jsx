import React from 'react';
import Sidebar from "../components/Sidebar";
import "../styles/inventory.css";
import filterIcon from "../assets/filter.svg";

const Issue = () => {
    return (
    <div className="issue">
      <Sidebar />
      <div className="issue-main">
      <div className="topbar">
      <div className="topbar-left">
      <div class="search-bar">
      icon
        <input type="text" placeholder="Search product, supplier, order"></input>
      </div>
      </div>
      <div className="topbar-right">
        icon
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
      </div>
      </div>
        
       

        {/* Items table */}

        <div className="issue-container">
          <div className="issue-container-top">
            <div className="issue-title">
              <p>Issues</p>
              </div>
              <div className="icon-action">
              <button className="filter">
                {" "}
                <img src={filterIcon} alt="" />
                Filters
              </button>
              </div>
            </div>
          <table>
            <thead>
              <tr>
                <th>Issue ID</th>
                <th>Issued Item</th>
                <th>Issue Date</th>
                <th>Quantity</th>
                <th>Department</th>
                <th>Status</th>
                <th>Issued By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Item 1</td>
                <td>Electronics</td>
                <td>Gadgets</td>
                <td>50</td>
                <td>Pcs</td>
                <td>$10</td>
                <td>500</td>
                <td>2024-06-20</td>
                <td>In Stock</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Items table closed */}

        
      </div>

      
    </div>
  );
};

export default Issue;
