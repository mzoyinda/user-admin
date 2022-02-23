import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import MainContainer from "../components/MainContainer";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";

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
const AddUser = (props) => {
  const classes = useStyles(props);

  const [details, setDetails] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      city: "",
    },
  });

  //Errors  state
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  let history = useHistory();
  let dispatch = useDispatch();

  //renamed properties to eliminate instances like ('details.name' or 'details.email')
  const { name, username, email, address } = details;

  //validate form based on the 'name' property
  const validate = (e, name, value) => {
    switch (name) {
      case "username":
      case "name":
        if (value.length <= 4) {
          setErrors({
            ...errors,
            username: "Username should have atleast 5 letters",
            fullname: "fullname should have atleast 5 letters",
          });
        } else {
          setErrors("");
        }
        break;

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          setErrors("");
        }
        break;

      default:
        break;
    }
  };
  //handling the input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

    validate(e, name, value);

    if (name === "address") {
      setDetails({ ...details, [name]: { city: value } });
    } else {
      setDetails({ ...details, [name]: value });
    }
  };

  //handling user submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!name || !username || !email || !address) {
      setErrors({ ...errors, All: "Please input all fields" });
    } else if (errors) {
      setErrors({ ...errors });
    } else {
      console.info("Valid Form");
      dispatch(addUser(details));
      history.push("/");
    }
  };

  return (
    // reuseable component to encapsulate the form
    <MainContainer title="Form" disable="none" className={classes.visible}>
      <div>
        <form>
          {/* authentication error messages */}
          {submitted && errors ? (
            <>
              <h4
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {errors.username}
              </h4>
              <h4
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {errors.fullname}
              </h4>
              <h4
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {errors.email}
              </h4>
              <h4
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {errors.All}
              </h4>
            </>
          ) : (
            ""
          )}

          {/* form container */}
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
                value={name}
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
                value={username}
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
                value={email}
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
                value={address.city}
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
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </MainContainer>
  );
};

export default AddUser;
