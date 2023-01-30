import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import SubGredditService from "../services/SubGreddiit"
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom"
const theme = createTheme();
export default function OpenSubGreddits(props) {
    const [open1, setOpen1] = React.useState(true);
    const params = useParams()
    const handleClick1 = () => {
        setOpen1(!open1);
    };
    const [subgreddit, setsubgreddit] = React.useState({
        Name: "",
        Description: "",
        Tags: [],
        Banned: [],
        Moderator: null,
        Followers: [],
        Post: [],
        Reports: [],
        Followed: [],
        JoinRequests: [],
        Blocked: []
    });
    const [open2, setOpen2] = React.useState(true);

    const handleClick2 = () => {
        setOpen2(!open2);
    };
    function generate(element: React.ReactElement) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }
    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await SubGredditService.getid(params.id)
                console.log("recieved", data)
                setsubgreddit(
                    {
                        ...data,
                        Name: data.Name,
                        Description: data.Description,
                        Tags: data.Tags,
                        Banned: data.Banned,
                        Moderator: data.Moderator,
                        Followers: data.Followers,
                        Post: data.Post,
                        Reports: data.Reports,
                        date: data.date,
                        Followed: data.Followed,
                        JoinRequests: data.JoinRequests,
                        Blocked: data.Blocked
                    }
                )
                console.log("particular subgreddit on Loading are", subgreddit)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchUsers();
    }, [])

    function handleAccept(id1,id2) {
        console.log(id1,id2)
        const AcceptRequests = async () => {
            try {
                const data = await SubGredditService.AcceptRequest(id1, { UserID: id2 })
                console.log("recieved", data)
                // TODO: Is a change in UI required ? LIke doing setstate for any variable
            }
            catch (error) {
                console.log(error)
            }
            const updatedjoinrequests = subgreddit.JoinRequests.filter(element => element._id !== id2)
            const updatedFollowers = subgreddit.Followers.concat(id2)
            const updatedFollowed = subgreddit.Followed.concat(id2)
            setsubgreddit({ ...subgreddit, JoinRequests: updatedjoinrequests, Followers: updatedFollowers, Followed: updatedFollowed })
        }
        AcceptRequests();
    }
    function handleReject(id1,id2) {
        console.log(id1,id2)
        const RejectRequests = async () => {
            try {
                const data = await SubGredditService.RejectRequest(id1, { UserID: id2 })
                console.log("recieved", data)
                // TODO: Is a change in UI required ? LIke doing setstate for any variable
            }
            catch (error) {
                console.log(error)
            }
            const updatedjoinrequests = subgreddit.JoinRequests.filter(element => element._id !== id2)
            console.log("before",)
            console.log("after",updatedjoinrequests)
            setsubgreddit({ ...subgreddit, JoinRequests: updatedjoinrequests})
        }
        RejectRequests();
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
                        <div className="FollowerTabs">
                            <Tabs className="Tabs">
                                <TabList>
                                    <Tab> USERS</Tab>
                                    <Tab> JOINING REQUESTS </Tab>
                                    <Tab>STATS</Tab>
                                    <Tab>REPORTED</Tab>
                                </TabList>
                                <TabPanel>
                                    <Box
                                        sx={{
                                            marginTop: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <List
                                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                            component="nav"
                                            aria-labelledby="nested-list-subheader"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    Users
                                                </ListSubheader>
                                            }
                                        >
                                            <ListItemButton onClick={handleClick1}>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Blocked" />
                                                {open1 ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={open1} timeout="auto" unmountOnExit>
                                                {
                                                    subgreddit.Blocked.map(element => {
                                                        return (
                                                            <List component="div" disablePadding>
                                                                <ListItemButton sx={{ pl: 4 }}>
                                                                    <ListItemIcon>
                                                                        <PersonIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={element.Username} />
                                                                </ListItemButton>
                                                            </List>
                                                        )
                                                    })
                                                }
                                            </Collapse>
                                            <ListItemButton onClick={handleClick2}>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="UnBlocked" />
                                                {open2 ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={open2} timeout="auto" unmountOnExit>
                                                {
                                                    subgreddit.Followers.filter(element => ((!subgreddit.Blocked.length) || (!subgreddit.Blocked.map(element1 => element1._id).includes(element._id)))).map(element => {
                                                        return (
                                                            <List component="div" disablePadding>
                                                                <ListItemButton sx={{ pl: 4 }}>
                                                                    <ListItemIcon>
                                                                        <PersonIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={element.Username} />
                                                                </ListItemButton>
                                                            </List>
                                                        )
                                                    })
                                                }
                                            </Collapse>
                                        </List>
                                    </Box>
                                </TabPanel>
                                <TabPanel>
                                    <Box
                                        sx={{
                                            marginTop: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {
                                            subgreddit.JoinRequests.map(element => {
                                                return (
                                                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                        <nav aria-label="main mailbox folders">
                                                            <List>
                                                                <ListItem >
                                                                    <ListItemIcon>
                                                                        <PersonIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={element.Username} />
                                                                    <Button onClick={event => handleAccept(subgreddit._id,element._id)} sx={{ marginLeft: 5 }} variant="contained" color="secondary">ACCEPT</Button>
                                                                    <Button onClick={event => handleReject(subgreddit._id,element._id)} sx={{ marginLeft: 5 }} variant="contained" color="secondary">REJECT</Button>
                                                                </ListItem>
                                                            </List>
                                                        </nav>
                                                        {/* <Divider /> */}
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                </TabPanel>
                                <TabPanel>
                                    Stats
                                </TabPanel>
                                <TabPanel>
                                    <Box
                                        sx={{
                                            marginTop: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {
                                            subgreddit.Reports.map(element => {
                                                return (
                                                    <div>
                                                        {element.By.Username}
                                                    </div>
                                                )
                                            })
                                        }
                                    </Box>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}