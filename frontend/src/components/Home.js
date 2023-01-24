import React from 'react';
import Typography from '@mui/material/Typography';
import animation from '../assets/icons8-reddit.gif';
import AuthContext from "../context/AuthContext"

const Home = () => {
    const user = React.useContext(AuthContext).user
    return (
        <div>
            {!user ?
                    <div className="welcome-page">
                        <img 
                        src={animation} 
                        alt="Loading..."
                        style={{
                            margin: "3rem",
                            marginTop: "20rem", 
                        }}
                        />
                        <Typography className="welcome-heading" variant="h2" component="h1">
                            Welcome to Greddiit Portal
                        </Typography>
                    </div>
                    :
                    <div className="welcome-page">

                    </div>
            }
        </div>
    );
};

export default Home;
