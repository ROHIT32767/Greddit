import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const theme = createTheme();
const Post = ({ post ,setposts }) => {
    const [upvotes, setUpvotes] = useState(post.upvotes);
    const [downvotes, setDownvotes] = useState(post.downvotes);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');

    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
    };

    const handleDownvote = () => {
        setDownvotes(downvotes + 1)
    };

    const handleComment = (event) => {
        event.preventDefault();
        setComments([...comments, newComment]);
        setNewComment('');
    };
    return (
        <div>
            <Container component="main" sx={{ maxWidth: 500 }}>
                <Card style={{ marginBottom: '20px' }} sx={{ marginTop: 8, bgcolor: green[500] }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography color="textSecondary" style={{ marginBottom: 12 }}>
                            {post.author}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {post.body}
                        </Typography>
                        <div>
                            <IconButton aria-label="upvote" onClick={handleUpvote}>
                                <ThumbUpIcon />
                            </IconButton>
                            {upvotes}
                            <IconButton aria-label="downvote" onClick={handleDownvote}>
                                <ThumbDownIcon />
                            </IconButton>
                            {downvotes}
                            <IconButton aria-label="Save" onClick={handleUpvote}>
                                <BookmarkAddIcon />
                            </IconButton>
                            <IconButton aria-label="Follow" onClick={handleDownvote}>
                                <FollowTheSignsIcon />
                            </IconButton>
                            </div>
                        <div style={{
                            marginTop: '20px',
                            marginBottom: '10px'
                        }}>
                            <form onSubmit={handleComment}>
                                <TextField
                                    id="outlined-basic"
                                    label="Leave a comment"
                                    variant="outlined"
                                    value={newComment}
                                    onChange={(event) => setNewComment(event.target.value)}
                                    required
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <CommentIcon />
                                </IconButton>
                            </form>
                        </div>
                        <div>
                            {comments.map((comment) => (
                                <Typography key={comment} variant="body2" component="p">
                                    {comment}
                                </Typography>
                            ))}
                        </div>
                    </CardContent>
                </Card >
            </Container>
        </div>
    );
};

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}
const RedditClone = () => {
    const [posts,setposts]=React.useState([])
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await 
                console.log("recieved", data)

                // console.log("Subreddits on Loading are",subreddits)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
    return (
        <div>
            <ThemeProvider theme={theme} sx={{ mt: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    <ImageList
                        sx={{
                            width: 500,
                            height: 450,
                            // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                            transform: 'translateZ(0)',
                            mt: 8
                        }}
                        rowHeight={200}
                        gap={1}
                    >{itemData.map((item) => {
                        const cols = item.featured ? 2 : 1;
                        const rows = item.featured ? 2 : 1;

                        return (
                            <ImageListItem key={item.img} cols={cols} rows={rows}>
                                <img
                                    {...srcset(item.img, 250, 200, rows, cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    title={item.title}
                                    position="top"
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'white' }}
                                            aria-label={`star ${item.title}`}
                                        >
                                            <StarBorderIcon />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                />
                                <ImageListItemBar
                                    title={<span>Description: {item.author}</span>}
                                    position="below"
                                />
                            </ImageListItem>
                        );
                    })}
                    </ImageList>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <PostAddIcon />
                        </Avatar>
                        <Button variant="contained" color="secondary" onClick={handleClickOpen}>CREATE POST</Button>
                    </Box>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>POST</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To POST to this SubGreddit, enter Text for the concerned POST.
                            All the Posts are text based only
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>POST THIS</Button>
                    </DialogActions>
                </Dialog>
                {posts.map((post) => (
                    <Post key={post.title} post={posts} setposts={setposts} />
                ))}
            </ThemeProvider>
        </div>
    );
};
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
        featured: true,
    }
];
export default RedditClone;


// const posts = [
//     {
//         title: 'Hello World',
//         author: 'John Doe',
//         body: 'This is my first post',
//         upvotes: 0,
//         downvotes: 0,
//         comments: [],
//     },
//     {
//         title: 'React is Awesome',
//         author: 'Jane Smith',
//         body: 'I just started learning React and it is amazing',
//         upvotes: 0,
//         downvotes: 0,
//         comments: [],
//     },
// ];
