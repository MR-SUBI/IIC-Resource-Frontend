import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import axios from "axios";

const columns = [
  { id: "bill_number", label: "Bill Number", maxWidth: 70 },
  {
    id: "bill_date",
    label: "Bill Date",
    maxWidth: 70,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "voucher_no",
    label: "Voucher Number",
    maxWidth: 70,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "vendor",
    label: "Vendor",
    maxWidth: 70,
    align: "center",
    format: (value) => value.toFixed("en-US"),
  },
  {
    id: "total_items",
    label: "Total Amount",
    maxWidth: 70,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total_amount",
    label:" Total Amount",
    maxWidth: 70,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paid_amount",
    label: "Paid Amount",
    maxWidth: 70,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

// function createData(bill_number, bill_date, voucher_no, vendor, total_items, total_amount, paid_amount) {
//   return { bill_number, bill_date, voucher_no, vendor, total_items, total_amount, paid_amount };
// }

// const rows = [
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
//   createData(1, "2024-1- 01", 1, "Lizan Suppliers", 1, 1 , 1),
// ];

export default function RecordsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(11);
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getAllBills = async () => {
      try {
        const response = await axios.get("http://localhost:8898/api/bill");
        setBills(response.data.getBill || []);
        console.log(bills);
      } catch (error) {
        console.log("Error fetching bills:", error);
        setBills([]);
      }
    };

    getAllBills();
  }, []);

  const handleRowClick = (billId) => {
    navigate(`/specificbill/${billId}`); 
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        cursor: "pointer",
        fontSize: "18px",
      }}
    >
      <TableContainer sx={{ maxHeight: 700 }}>
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
            {bills
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((bill) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={bill.bill_id}>
                    onClick={() => handleRowClick(bill.bill_id)}
                    {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}>
                          {column.format
                          ? column.format(bill[column.id]) : bill[column.id]}
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
        count={bills.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
