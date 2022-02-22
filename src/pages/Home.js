import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import ModalContainer from "../components/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";

//----material ui properties----
const useStyles = makeStyles({
  head: {
    backgroundColor: "#ddd",
  },
  table: {
    padding: "10px",
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//----material ui properties ends----

//main component
const Home = (props) => {
  const classes = useStyles(props);

  let history = useHistory();
  let dispatch = useDispatch();

  const { users } = useSelector((state) => state.data);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  //handles opening and closing of the modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //deletes a user
  const handleDelete = (id) => {
    if (open === true) {
      dispatch(deleteUser(id));
    }
    handleClose();
  };

  return (
    // reuseable component to encapsulate the table
    <MainContainer title="User List" action="Add New" variant="contained">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead className={classes.head}>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="text"
                  startIcon={<ArrowUpwardIcon />}
                  style={{ color: " black" }}
                >
                  Username
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* if users data exists, map into table */}
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.username}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.address.city}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => history.push(`/edit-user/${user.id}`)}
                    >
                      edit
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={handleOpen}
                    >
                      delete
                    </Button>
                  </StyledTableCell>
                  <ModalContainer open={open} handleClose={handleClose}>
                    <Button
                      autoFocus
                      onClick={handleClose}
                      variant="contained"
                      color="error"
                    >
                      Cancel
                    </Button>
                    <Button
                      autoFocus
                      onClick={() => handleDelete(user.id)}
                      variant="contained"
                      color="success"
                    >
                      Delete
                    </Button>
                  </ModalContainer>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainContainer>
  );
};

export default Home;
