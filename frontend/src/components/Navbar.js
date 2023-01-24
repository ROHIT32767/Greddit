import React from "react"
import AuthContext from "../context/AuthContext"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import RedditIcon from '@mui/icons-material/Reddit';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Home(props) {
    const user = React.useContext(AuthContext).user
    const setuser = React.useContext(AuthContext).setuser
    const handleLogout = (event) => {
        window.localStorage.removeItem(
            'token', JSON.stringify(user)
        )
        setuser(null)
    }
    const matches = useMediaQuery('(min-width:480px)');
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {matches ? <RedditIcon style={{ fontSize: "2rem", marginRight: "1rem" }} /> : null}
                    <Typography align="left" variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" href="/">Greddiit Portal</Button>
                    </Typography>
                    {user ?
                        <div>
                            <Button color="inherit" href="/"><AccountCircleIcon style={{ marginRight: "0.5rem" }} />Profile</Button>
                            <Button color="inherit" onClick={handleLogout}><ExitToAppIcon style={{ marginRight: "0.5rem" }} />Logout</Button>
                        </div>
                        :
                        <div>
                            <Button color="inherit" href="/login"><LoginIcon style={{ marginRight: "0.5rem" }} />SIGN IN</Button>
                            <Button color="inherit" href="/register"><AppRegistrationIcon style={{ marginRight: "0.5rem" }} />SIGN UP</Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </Box>

    )
}