import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
const theme = createTheme();
export default function OpenSubGreddits(props) {
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
                        <div className="FollowerTabs">
                            <Tabs className="Tabs">
                                <TabList>
                                    <Tab> USERS</Tab>
                                    <Tab> JOINING REQUESTS </Tab>
                                    <Tab>STATS</Tab>
                                    <Tab>REPORTED</Tab>
                                </TabList>
                                <TabPanel>
                                    Users
                                </TabPanel>
                                <TabPanel>
                                    Joining Requests
                                </TabPanel>
                                <TabPanel>
                                    Stats
                                </TabPanel>
                                <TabPanel>
                                    Reported
                                </TabPanel>
                            </Tabs>
                        </div>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}