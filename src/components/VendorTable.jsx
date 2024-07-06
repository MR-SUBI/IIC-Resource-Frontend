import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import axios from "axios";

const columns = [
  { id: "vendor_name", label: "Vendor Name", maxWidth: 120 },
  { id: "vat_number", label: "VAT Number", maxWidth: 120 },
  {
    id: "vendor_contact",
    label: "Contact Number",
    maxWidth: 120,
    align: "center",
    format: (value) => value?.toLocaleString("en-US") || "N/A",
  },
  {
    id: "purchase_amount",
    label: "Purchase Amount",
    maxWidth: 120,
    align: "center",
    format: (value) => value?.toLocaleString("en-US") || "N/A",
  },
  {
    id: "recent_purchase",
    label: "Recent Purchase",
    maxWidth: 120,
    align: "center",
    format: (value) => value?.toFixed(2) || "N/A",
  },
  {
    id: "payment_duration",
    label: "Payment Duration",
    maxWidth: 120,
    align: "center",
    format: (value) => value?.toFixed(2) || "N/A",
  },
  {
    id: "payment_status",
    label: "Payment Status",
    maxWidth: 120,
    align: "center",
    format: (value) => value?.toFixed(2) || "N/A",
  },
];

export default function VendorTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [vendors, setVendors] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getAllVendors = async () => {
      try {
        const response = await axios.get("http://localhost:8898/api/vendor");
        setVendors(response.data.getVendor || []);
        console.log(vendors);
      } catch (error) {
        console.log("Error fetching vendors:", error);
        setVendors([]);
      }
    };

    getAllVendors();
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        cursor: "pointer",
        fontSize: "18px",
      }}
    >
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vendor) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={vendor.vendor_name}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format
                        ? column.format(vendor[column.id])
                        : vendor[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={vendors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
