import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Chip from '@mui/material/Chip';
import TagIcon from '@mui/icons-material/Tag';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SortIcon from '@mui/icons-material/Sort';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
import { useNavigate } from "react-router-dom";
import Sort from '@mui/icons-material/Sort';
import Tag from '@mui/icons-material/Tag';
const theme = createTheme();
export default function MySubGreddits(props) {
    const navigate = useNavigate()
    const [subreddits, setSubreddits] = useState([]);
    const [searchtext, setsearchtext] = useState("");
    const [displaysubreddits, setdisplaysubreddits] = useState([])
    const [ascending, setascending] = useState(false)
    const [descending, setdescending] = useState(false)
    const [followersort, setfollowersort] = useState(false)
    const [datesort, setdatesort] = useState(false)
    const [tags, settags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };
    const addTag = item => {
        settags(prev => new Set(prev).add(item));
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await SubGredditService.getAll()
                console.log("recieved", data)
                setSubreddits(data.map(element => {
                    return {
                        ...element,
                        Name: element.Name,
                        Description: element.Description,
                        Banned: element.Banned,
                        Followers: element.Followers,
                        Posts: element.Post,
                        Tags: element.Tags,
                        Moderator: element.Moderator,
                    }

                }))
                setdisplaysubreddits(data.map(element => {
                    return {
                        ...element,
                        Name: element.Name,
                        Description: element.Description,
                        Banned: element.Banned,
                        Followers: element.Followers,
                        Posts: element.Post,
                        Tags: element.Tags,
                        Moderator: element.Moderator,
                    }
                }))
                const tagarray = []
                data.map(subgreddit => subgreddit.Tags.map(eachtag => tagarray.push(eachtag)))
                console.log(`tags in console `,tagarray)
                settags([...new Set(tagarray)])
                // console.log("Subreddits on Loading are",subreddits)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    function handleLeave(event, id) {
        console.log(id)
        const LeaveSubGreddiit = async () => {
            // TODO: Write code for Leaving SubGreddit
        }
        LeaveSubGreddiit();
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
                    ></Box>
                    <Paper
                        component="form"
                        sx={{ marginTop: 8, p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search SubGreddits"
                            inputProps={{ 'aria-label': 'search subgreddits' }}
                            value={searchtext}
                            onChange={event => setsearchtext(event.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <DirectionsIcon />
                        </IconButton> */}
                    </Paper>
                </Container>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Grid item xs={18} sm={3}>
                            <SortIcon />
                        </Grid>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Grid item xs={18} sm={3}>
                            <Button variant="contained" color="secondary" onClick={event => {
                                setascending(true)
                                setdatesort(false)
                                setdescending(false)
                                setfollowersort(false)
                            }}>Ascending</Button>
                        </Grid>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Grid item xs={18} sm={3}>
                            <Button variant="contained" color="secondary" onClick={event => {
                                setascending(true)
                                setdatesort(false)
                                setdescending(false)
                                setfollowersort(false)
                            }}>Descending</Button>
                        </Grid>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Grid item xs={15} sm={3}>
                            <Button variant="contained" color="secondary" onClick={event => {
                                setascending(true)
                                setdatesort(false)
                                setdescending(false)
                                setfollowersort(false)
                            }}>Followers</Button>
                        </Grid>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Grid item xs={18} sm={3}>
                            <Button variant="contained" color="secondary" onClick={event => {
                                setascending(true)
                                setdatesort(false)
                                setdescending(false)
                                setfollowersort(false)
                            }}>Date</Button>
                        </Grid>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Grid item xs={18} sm={3}>
                            <Button variant="contained" color="secondary" onClick={event => {
                                setascending(true)
                                setdatesort(false)
                                setdescending(false)
                                setfollowersort(false)
                            }}>None</Button>
                        </Grid>
                    </Box>
                </Container>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Grid item xs={15} sm={3}>
                            <TagIcon />
                        </Grid>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Paper sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            padding: theme.spacing(0.5),
                            margin: 0
                        }}>
                            {tags.map((tag) => (
                                <div>
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onClick={() => handleTagClick(tag)}
                                        sx={{ margin: theme.spacing(0.5) }}
                                        color={selectedTags.includes(tag) ? 'primary' : 'default'}
                                    />
                                </div>
                            ))}
                        </Paper>
                    </Box>
                </Container>
                <Container component="main" sx={{ mt: 5 }}>
                    <Grid container spacing={4}>
                        {displaysubreddits.map(subreddit => {
                            return <Grid sx={{ mt: 5 }} xs={12} sm={6}>
                                <Card sx={{ maxWidth: 500, bgcolor: green[500] }}>
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
                                            <OpenInNewIcon onClick={event => navigate(`/OpenSubGreddits/${subreddit._id}`)} />
                                        </IconButton>
                                        <Button variant="contained" color="secondary">LEAVE</Button>
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

// const RemoveTag = item => {
//     settags(prev => {
//         const next = new Set(prev);
//         next.delete(item);
//         return next;
//     });
// }