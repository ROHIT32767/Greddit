import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserService from "../services/Users"
const theme = createTheme();
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div>
      <br />
      <div className='error'>
        {message}
      </div>
      <br />
    </div>
  )
}
export default function Register(props) {
  const [errorMessage, setErrorMessage] = React.useState(null)
  const [FormValues, setFormValues] = React.useState({
    FirstName: "",
    LastName: "",
    Username: "",
    Email: "",
    Age: "",
    ContactNumber: "",
    password: ""
  })

  function handleSubmit(event) {
    console.log(FormValues)
    event.preventDefault()
    if (!FormValues.FirstName || !FormValues.LastName || !FormValues.Username || !FormValues.Email || (FormValues.Age <= 0) || (!FormValues.ContactNumber) || (!FormValues.password)) {
      setFormValues({
        FirstName: "",
        LastName: "",
        Username: "",
        Email: "",
        Age: "",
        ContactNumber: "",
        password: "",
      })
      setErrorMessage(
        `Given Form Inputs are Invalid `
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    else {
      const sendData = async () => {
        try {
          console.log("props user = ", props.user)
          const data = await UserService.create({...FormValues})
          console.log(FormValues)
          console.log("recieved", data)
          setFormValues({
            FirstName: "",
            LastName: "",
            Username: "",
            Email: "",
            Age: "",
            ContactNumber: "",
            password: ""
          })
        }
        catch (error) {
          console.log("In Register.js" , error)
        }
      }
      sendData();
    }
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Notification message={errorMessage} />
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="FirstName"
                    autoFocus
                    value={FormValues.FirstName}
                    onChange={event => setFormValues({ ...FormValues, FirstName: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={FormValues.LastName}
                    onChange={event => setFormValues({ ...FormValues, LastName: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    name="Username"
                    value={FormValues.Username}
                    onChange={event => setFormValues({ ...FormValues, Username: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-number"
                    required
                    label="Age"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={FormValues.Age}
                    onChange={event => setFormValues({ ...FormValues, Age: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={FormValues.ContactNumber}
                    required
                    placeholder="Contact Number"
                    name="Contact Number"
                    inputStyle={{
                      background: "lightblue"
                    }}
                    onChange={event => setFormValues({ ...FormValues, ContactNumber: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={FormValues.Email}
                    onChange={event => setFormValues({ ...FormValues, Email: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={FormValues.password}
                    onChange={event => setFormValues({ ...FormValues, password: event.target.value })}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}


/* <Grid item xs={12} sm={4}>
                  <AgeComp
                    FormValues={FormValues}
                    setFormValues={setFormValues}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <PhoneInput
                    country={'in'}
                    value={FormValues.ContactNumber}
                    placeholder="Contact Number"
                    inputStyle={{
                      background: "lightblue"
                    }}
                    onChange={value => setFormValues({ ...FormValues, ContactNumber: value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <EmailComp
                    FormValues={FormValues}
                    setFormValues={setFormValues}
                  // Handle Errors
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordComp
                    FormValues={FormValues}
                    setFormValues={setFormValues}
                  // Handle Errors
                  />
                </Grid> */