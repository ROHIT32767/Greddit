import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhoneInput from 'react-phone-input-2'

import EmailComp from "./FormElements/Email"
import AgeComp from "./FormElements/Age"
import PasswordComp from './FormElements/Password';

const theme = createTheme();



export default function Home() {
  const [FormValues, setFormValues] = React.useState({
    FirstName: "",
    LastName: "",
    Username: "",
    Email: "",
    Age: "",
    ContactNumber: "",
    Password: ""
  })

  // const [error, setError] = useState({
  //   email: false,
  //   age: false,
  //   password: false
  // }) Handle errors
  function handleSubmit(event) {
    console.log(FormValues)
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
                <Grid item xs={12} sm={4}>
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    </div>
  )
}


