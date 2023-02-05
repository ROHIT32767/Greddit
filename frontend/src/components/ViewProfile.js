import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import axios from 'axios';
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
export default function ViewProfile(props) {
    const [FormValues, setFormValues] = React.useState({
        FirstName: "",
        LastName: "",
        Username: "",
        Email: "",
        Age: "",
        ContactNumber: "",
        Password: "",
        Followers: [],
        Following: []
    })
    const [show1, setshow1] = React.useState(false)
    const [show2, setshow2] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState(null)
    const [edit, setedit] = React.useState(false)
    function handleEdit() {
        setedit(!edit)
    }
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log("props user =", props.user)
                const data = await UserService.getID()
                console.log("recieved", data)
                setFormValues({
                    FirstName: data.FirstName,
                    LastName: data.LastName,
                    Username: data.Username,
                    Email: data.Email,
                    Age: data.Age,
                    ContactNumber: data.ContactNumber,
                    Password: data.Password,
                    Following: data.Followers,
                    Followers: data.Following
                })
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target)
        const FirstName = data.get('firstName')
        const LastName = data.get('lastName')
        const Username = data.get('Username')
        const Email = data.get('email')
        const Age = data.get('Age')
        const ContactNumber = data.get('ContactNumber')
        const Password = data.get('password')
        console.log("Before", FormValues)
        if (!FirstName || !LastName || !Username || !Email || (Age <= 0) || (!ContactNumber) || (!Password)) {
            setErrorMessage(
                `Given Form Inputs are Invalid`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            setedit(!edit)
            console.log(FormValues)
        }
        else {
            const UpdateProfile = async () => {
                try {
                    console.log("props user for UPdate = ", props.user)
                    const data = await UserService.UpdateProfile(props.user.id, {
                        ...FormValues,
                        FirstName: FirstName,
                        LastName: LastName,
                        Username: Username,
                        Email: Email,
                        Age: Age,
                        ContactNumber: ContactNumber,
                        password: Password
                    })
                    console.log(FormValues)
                    console.log("recieved for Update", data)
                    setFormValues({
                        ...FormValues,
                        FirstName: FirstName,
                        LastName: LastName,
                        Username: Username,
                        Email: Email,
                        Age: Age,
                        ContactNumber: ContactNumber,
                        Password: Password
                    })
                }
                catch (error) {
                    console.log("In Register.js", error)
                }
            }
            UpdateProfile();
            setedit(!edit)
            console.log(FormValues)
        }
    }
    function Deleterow1(event, id) {
        console.log(id)
        const DeleteFollowers = async () => {
            try {
                // console.log("props user =", props.user)
                const data = await UserService.UpdateFollowers(props.user.id, { TargetID: id })
                console.log("recieved", data)
                setFormValues({ ...FormValues, Followers: FormValues.Followers.filter(element => element.id !== id) })
            }
            catch (error) {
                console.log(error)
            }
        }
        DeleteFollowers();
    }
    function Deleterow2(event, id) {
        console.log(id)
        const DeleteFollowing = async () => {
            try {
                // console.log("props user =", props.user)
                const data = await UserService.UpdateFollowing(props.user.id, { TargetID: id })
                console.log("recieved", data)
                setFormValues({ ...FormValues, Following: FormValues.Following.filter(element => element.id !== id) })
            }
            catch (error) {
                console.log(error)
            }
        }
        DeleteFollowing();
    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            PROFILE
                        </Typography>
                        <Notification message={errorMessage} />
                        {edit ?
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
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="Username"
                                            label="Username"
                                            name="Username"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="outlined-number"
                                            required
                                            label="Age"
                                            name="Age"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            placeholder="Contact Number"
                                            name="ContactNumber"
                                            inputStyle={{
                                                background: "lightblue"
                                            }}
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
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleEdit}
                                >
                                    Cancel
                                </Button>
                            </Box>
                            :
                            <Box component="form" sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="FirstName"
                                            fullWidth
                                            id="outlined-read-only-input"
                                            label="FirstName"
                                            autoFocus

                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={FormValues.FirstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="outlined-read-only-input"
                                            label="Last Name"
                                            name="LastName"

                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={FormValues.LastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="outlined-read-only-input"
                                            label="Username"
                                            name="username"

                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={FormValues.Username}
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
                                            name="age"

                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={FormValues.Age}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField

                                            id="outlined-read-only-input"
                                            placeholder="Contact Number"
                                            name="Contact Number"
                                            inputstyle={{
                                                background: "lightblue"
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={FormValues.ContactNumber}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="outlined-read-only-input"
                                            label="Email Address"
                                            name="Email"
                                            autoComplete="email"

                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={FormValues.Email}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </Button>
                            </Box>
                        }
                        <div className="FollowerTabs">
                            <Tabs className="Tabs">
                                <TabList>
                                    <Tab>Followers <Button variant="contained" color="secondary" onClick={() => setshow1(!show1)}>{FormValues.Followers.length}</Button></Tab>
                                    <Tab>Following <Button variant="contained" color="secondary" onClick={() => setshow2(!show2)}>{FormValues.Following.length}</Button></Tab>
                                </TabList>
                                <TabPanel>
                                    {show1 && <Box
                                        sx={{
                                            marginTop: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Table sx={{ maxWidth: 125 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Username</TableCell>
                                                    <TableCell align="right">Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {FormValues.Followers.map(element => {
                                                    return (
                                                        <TableRow key={element.Username}>
                                                            <TableCell component="th" scope="row">
                                                                {element.Username}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Button variant="contained" color="secondary" onClick={(event) => Deleterow1(event, element.id)}>Remove</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </Box>}
                                </TabPanel>
                                <TabPanel>
                                    {show2 && <Box
                                        sx={{
                                            marginTop: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Table sx={{ maxWidth: 125 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Username</TableCell>
                                                    <TableCell align="right">Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {FormValues.Following.map(element => {
                                                    return (
                                                        <TableRow key={element.Username}>
                                                            <TableCell component="th" scope="row">
                                                                {element.Username}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Button variant="contained" color="secondary" onClick={(event) => Deleterow2(event, element.id)}>UnFollow</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </Box>}
                                </TabPanel>
                            </Tabs>
                        </div>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}