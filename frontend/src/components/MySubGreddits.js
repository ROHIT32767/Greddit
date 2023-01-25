import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { red, green } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import RedditIcon from '@mui/icons-material/Reddit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import SubGredditService from '../services/SubGreddiit';
const theme = createTheme();
export default function SubredditPage(props) {
    const [subreddits, setSubreddits] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newSubreddit, setNewSubreddit] = useState({
        Name: '',
        Description: '',
        Banned: [],
        Followers: [],
        Tags: [],
        Posts: [],
        Moderator : null
        // Image: null,
    });
    const ToggleForm = () => {
        setNewSubreddit({
            Name: "",
            Description: "",
            Banned: [],
            Followers: [window.localStorage.getItem('token').id],
            Posts: [],
            Tags: []
            // Image: null,
        });
        setShowForm(!showForm);
    };
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log("props user =", props.user)
                const data = await SubGredditService.getID()
                console.log("recieved", data)
                setSubreddits(data.map(element => {
                    return {
                        Name: element.Name,
                        Description: element.Description,
                        Banned: element.Banned,
                        Followers: element.Followers,
                        Posts: element.Posts,
                        Tags: element.Tags,
                        Moderator:element.Moderator
                    }
                }
                )
                )
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubreddits([...subreddits, newSubreddit]);
        const PostSubGreddiit = async () => {
            try {
                console.log("props user for UPdate = ", props.user)
                const data = await SubGredditService.create(props.user.id, {
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
        PostSubGreddiit();
        setShowForm(false);
        setNewSubreddit({
            Name: "",
            Description: "",
            Banned: [],
            Followers: [window.localStorage.getItem('token').id],
            Posts: [],
            Tags: []
            // Image: null,
        });
    };
    // ! Banned Keywords
    const [bannedword, setbannedword] = React.useState("")
    function addword() {
        if (bannedword.length > 0) {
            setNewSubreddit({ ...newSubreddit, Banned: newSubreddit.Banned.concat(bannedword) })
            setbannedword("")
        }
    }
    function RemoveKeyword(id) {
        setNewSubreddit({ ...newSubreddit, Banned: newSubreddit.Banned.filter((element, index) => index !== id) })
    }
    // ! Tags
    const [Tag, setTag] = React.useState("")
    function addTag() {
        if (Tag.length > 0) {
            setNewSubreddit({ ...newSubreddit, Tags: newSubreddit.Tags.concat(Tag) })
            setTag("")
        }
    }
    function RemoveTag(id) {
        setNewSubreddit({ ...newSubreddit, Tags: newSubreddit.Banned.filter((element, index) => index !== id) })
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
                        <Box sx={{ mt: 3 }}>
                            {
                                showForm ? <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={ToggleForm}
                                >
                                    Close Form
                                </Button> :
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={ToggleForm}
                                    >
                                        Create New SubGreddit
                                    </Button>
                            }
                            {
                                showForm &&
                                <Box component="form" sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Name"
                                                required
                                                fullWidth
                                                id="Name"
                                                label="Name"
                                                autoFocus
                                                value={newSubreddit.Name}
                                                onChange={event => setNewSubreddit({ ...newSubreddit, Name: event.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Description"
                                                required
                                                fullWidth
                                                id="Description"
                                                label="Description"
                                                autoFocus
                                                value={newSubreddit.Description}
                                                onChange={event => setNewSubreddit({ ...newSubreddit, Description: event.target.value })}
                                            />
                                        </Grid>
                                        // ! Banned Keywords
                                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            <nav aria-label="main mailbox folders">
                                                <List>
                                                    {
                                                        newSubreddit.Banned.map((element, index) => {
                                                            return (
                                                                <ListItem disablePadding>
                                                                    <ListItemButton onClick={() => RemoveKeyword(index)}>
                                                                        <ListItemIcon>
                                                                            <ClearIcon />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={element} />
                                                                    </ListItemButton>
                                                                </ListItem>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </nav>
                                        </Box>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Keyword"
                                                required
                                                fullWidth
                                                id="Keyword"
                                                label="Keyword"
                                                autoFocus
                                                value={bannedword}
                                                onChange={event => setbannedword(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button fullWidth
                                                variant="contained"
                                                sx={{ mt: 1, mb: 2 }}
                                                onClick={addword}>
                                                Ban this Word !
                                            </Button>
                                        </Grid>
                                        // ! Tags
                                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            <nav aria-label="main mailbox folders">
                                                <List>
                                                    {
                                                        newSubreddit.Tags.map((element, index) => {
                                                            return (
                                                                <ListItem disablePadding>
                                                                    <ListItemButton onClick={() => RemoveTag(index)}>
                                                                        <ListItemIcon>
                                                                            <ClearIcon />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={element} />
                                                                    </ListItemButton>
                                                                </ListItem>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </nav>
                                        </Box>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Tag"
                                                required
                                                fullWidth
                                                id="Tag"
                                                label="Tag"
                                                autoFocus
                                                value={Tag}
                                                onChange={event => setTag(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button fullWidth
                                                variant="contained"
                                                sx={{ mt: 1, mb: 2 }}
                                                onClick={addTag}>
                                                Create Tag
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Container>
                <Container component="main" sx={{ mt: 5 }}>
                    <Grid container spacing={4}>
                        {subreddits.map(subreddit => {
                            return <Grid xs={12} sm={6}>
                                <Card sx={{ bgcolor: green[500] }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                <RedditIcon style={{ fontSize: "2rem" }} />
                                            </Avatar>
                                        }
                                        title={subreddit.Name}
                                        subheader={`Banned Keywords ${subreddit.Banned.join(',')}`}
                                    />
                                    <CardMedia
                                    // TODO: Attach image Here
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {subreddit.Posts.length} Posts
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {subreddit.Followers.length} Followers
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {subreddit.Description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <OpenInNewIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}