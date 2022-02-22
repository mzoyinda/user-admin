import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import MainContainer from "../components/MainContainer";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser, updateUser } from "../redux/actions";

//material ui properties
const useStyles = makeStyles({
  visible: {
    display: "none",
  },
  label: {
    textAlign: "center",
    alignSelf: "center",
  },
});

//main component
const EditUser = (props) => {
  const classes = useStyles(props);

  const [details, setDetails] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      city: "",
    },
  });

  //error message state
  const [errorMsg, setErrorMsg] = useState("");

  let history = useHistory();
  let dispatch = useDispatch();
  let { id } = useParams();
  const { user } = useSelector((state) => state.data);

  //renamed properties to eliminate instances like ('details.name' or 'details.email')
  const { name, username, email, address } = details;

  useEffect(() => {
    dispatch(editUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setDetails({ ...user });
    }
  }, [user]);

  //handling the input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "address") {
      setDetails({ ...details, [name]: { city: value } });
    } else {
      setDetails({ ...details, [name]: value });
    }
  };

  //handling user submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !username || !email || !address) {
      setErrorMsg("Please input all fields");
    } else {
      dispatch(updateUser(details, id));
      history.push("/");
      setErrorMsg("");
    }
  };

  return (
    // reuseable component to encapsulate the form
    <MainContainer title="Form" disable="none" className={classes.visible}>
      <div>
        {/* if the user state is empty, return the loading message, else return the form */}
        {user ? (
          <form>
            {errorMsg && (
              <h4
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {errorMsg}
              </h4>
            )}
            <Grid container spacing={2}>
              <Grid item xs={4} className={classes.label}>
                <Typography
                  variant="p"
                  sx={{ fontSize: "1rem", fontWeight: 500 }}
                >
                  Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  value={name || ""}
                  name="name"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <Typography
                  variant="p"
                  sx={{ fontSize: "1rem", fontWeight: 500 }}
                >
                  Username
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  value={username || ""}
                  name="username"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <Typography
                  variant="p"
                  sx={{ fontSize: "1rem", fontWeight: 500 }}
                  type="email"
                >
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  value={email || ""}
                  name="email"
                  onChange={handleChange}
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <Typography
                  variant="p"
                  sx={{ fontSize: "1rem", fontWeight: 500 }}
                >
                  City
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  // value={address.city || ''}  //couldn't populate the address field: suggestions are welcome
                  name="address"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                "& button": { m: 1 },
                display: "flex",
                p: 1,
                bgcolor: "background.paper",
                justifyContent: "right",
              }}
              m={1}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => history.push("/")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Box>
          </form>
        ) : (
          <h1 className="text-center">Loading...</h1>
        )}
      </div>
    </MainContainer>
  );
};

export default EditUser;
