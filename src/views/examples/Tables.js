import {
  Card,
  CardHeader,
  Container,
  Row,
  UncontrolledTooltip,
  Dropdown,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "../../axios/axios.js";
import "./style.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { baseUrl } from "baseUrl";
import { useNavigate } from "react-router-dom";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch , useSelector} from "react-redux";
import { updateVerifiedLeadsCount } from "Redux/Features/DashboardCardsDataSlice/DashboardCardsSlice.js";


const Tables = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedLimit, setSelectedLimit] = useState(10); // State for selected limit
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const {verifiedLeadsCount} = useSelector((state)=>state.dashaboardCardsData)

  useEffect(()=>{
    localStorage.removeItem("activeTab")
  }, [])
  const fetchCountOfVerifiedUser = async () => {
    try {
      const response = await axios.get(`user/getCountOfVerifiedUsers`);
      dispatch(updateVerifiedLeadsCount({count : response?.data?.result}))
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  useEffect(()=>{
    fetchCountOfVerifiedUser()
  },[])
  const handleRowClick = (userId) => {
    try {
      navigate(`/userPanel/${userId}`);
    } catch (err) {}
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText.length > 0) {
      searchUsers();
    }
  }, [searchText]);

  useEffect(() => {
    if (searchText == "") {
      fetchUsers();
    }
  }, [searchText]);

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, verifiedLeadsCount , dispatch]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`user/getVerifiedUsers`, {
        page: page + 1, // API expects 1-based index
        limit: rowsPerPage,
      });
      setUsers(response.data.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  const searchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`user/searchGetVerifiedUsers`, {
        page: 1, // API expects 1-based index
        limit: rowsPerPage,
        searchText: searchText,
      });
      setUsers(response.data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page when changing rows per page
    setSelectedLimit(newRowsPerPage); // Update the selected limit state
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#5e72e4",
      color: theme.palette.common.white,
      zIndex: "0",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const tableHeaders = [
    "Lead",
    "Review Calculation Status",
    "Net Income 2019",
    "Net Income 2020",
    "Net Income 2021",
    "Added At",
  ];
  return (
    <>
      <Header tables={"tables"} />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-3">Verified Users</h3>
                <div
                  className="gap-2"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    className="mr-3"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <label
                      style={{
                        marginTop: "5px",
                        fontSize: "15px",
                        display: "inline-block",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Show:
                    </label>
                    <select
                      className="form-control form-control-sm"
                      style={{ marginLeft: 6, fontSize: 16 }}
                      value={selectedLimit} // Reflect selected limit
                      onChange={handleChangeRowsPerPage} // Handle change event
                    >
                      <option value={5}>5 Records</option>
                      <option value={10}>10 Records</option>
                      <option value={20}>20 Records</option>
                      <option value={50}>50 Records</option>
                      <option value={100}>100 Records</option>

                    </select>
                  </div>
                  <div className="mr-3">
                    <div className="input-group input-group-lg flex-nowrap">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          style={{
                            backgroundColor: "transparent",
                            borderRight: "none",
                          }}
                        >
                          <i
                            className="fas fa-search"
                            style={{ color: "#5e72e4" }}
                          ></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name..."
                        className="form-control form-control-sm"
                        // Adjust width as needed
                        value={searchText}
                        onChange={(e) => handleSearchChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <Paper>
               
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {tableHeaders.map((item, index) => (
                          <StyledTableCell
                            key={index}
                            style={{ fontSize: "0.8rem", fontWeight: "bold" }}
                          >
                            {item}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    
                    {users?.length == 0 && !loading && (
                        <StyledTableRow>
                          <TableCell colSpan={6} align="center">
                            No record found
                          </TableCell>
                        </StyledTableRow>
                      )}

                    {loading && users?.length == 0? (
                      <>
                      {Array.from({ length: 5 }, (_, index) => (
                          <StyledTableRow key = {index}>
                          <TableCell>
                          <div style={{ padding: '7px', background: '#f6f7f' }}>
                                <Skeleton height={8} width={150} />
                                <Skeleton height={8} width={200} />
                                <Skeleton height={8} width={200} />
                                <Skeleton height={8} width={200} />
                          </div>
                          </TableCell>
                          <TableCell>
                          <div style={{ padding: '7px', background: '#f6f7f' }}>
                            <Skeleton height={8} width={150} />
                          </div>
                          </TableCell>
                          <TableCell>
                          <div style={{ padding: '7px', background: '#f6f7f' }}>
                            <Skeleton height={8} width={150} />
                          </div>
                          </TableCell>
                          <TableCell>
                          <div style={{ padding: '7px', background: '#f6f7f' }}>
                            <Skeleton height={8} width={150} />
                          </div>
                          </TableCell>
                          <TableCell>
                          <div style={{ padding: '7px', background: '#f6f7f' }}>
                            <Skeleton height={8} width={150} />
                          </div>
                          </TableCell>
                          <TableCell>
                          <div style={{ padding: '7px', background: '#f6f7f' }}>
                            <Skeleton height={8} width={150} />
                          </div>
                          </TableCell>
                        </StyledTableRow>
                       
                    ))}
                      </>
                    ) : (
                      <TableBody>

                      {users?.map((user) => (
                        <StyledTableRow
                          key={user.id}
                          onClick={() => handleRowClick(user?.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                            >
                              <h6 className="mb-0 text-xs">
                              {(user?.first_name ? user?.first_name : '') + " " + (user?.last_name ? user?.last_name : '')}
                                {user?.approval_status == 'approved' && <i class="fas fa-check-circle ms-1 ml-1" style={{color: "#14e4c4",  fontSize: "12px"}} aria-hidden="true"></i>}
                              </h6>
                      
                              <span className="text-xs text-secondary mb-0">
                                {user?.email}
                              </span>
                              <span className="text-xs text-secondary mb-0">
                                {user?.phone}
                              </span>
                              <span className="text-xs text-secondary mb-0">
                                {" "}
                                {user?.address_line_1?.length > 20
                                  ? user?.address_line_1?.slice(0, 20) + "..."
                                  : user?.address_line_1}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            className="text-xs mb-0"
                            style={{
                              color: user?.admin_text_return_status
                                ? "green"
                                : "red",
                            }}
                          >
                            {user?.admin_text_return_status
                              ? "Submitted"
                              : "Not submitted"}
                          </TableCell>
                          <TableCell className="text-xs text-secondary mb-0">
                             {user?.net_income_2019
                              ?user?.net_income_2019.includes('$') ? user?.net_income_2019 : `$${user?.net_income_2019}`
                              : "-"}
                          </TableCell>
                          <TableCell className="text-xs text-secondary mb-0">
                            {user?.net_income_2020
                              ?user?.net_income_2020.includes('$') ? user?.net_income_2020: `$${user?.net_income_2020}`
                              : "-"}
                          </TableCell>
                          <TableCell className="text-xs text-secondary mb-0">
                            {user?.net_income_2021
                              ?user?.net_income_2021.includes('$') ? user?.net_income_2021 : `$${user?.net_income_2021}`
                              : "-"}
                          </TableCell>
                          <TableCell className="text-xs text-secondary mb-0">
                            {user?.created_at &&
                              moment(user?.created_at).format(
                                "YYYY-MM-DD hh:mm A"
                              )}
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    )}

                  
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20 , 50 , 100]}
                  component="div"
                  count={verifiedLeadsCount} // Assuming you know the total count of users
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
