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
const theme = createTheme();
const Post = ({ post }) => {
    const [upvotes, setUpvotes] = useState(post.upvotes);
    const [downvotes, setDownvotes] = useState(post.downvotes);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');

    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
    };

    const handleDownvote = () => {
        setDownvotes(downvotes + 1);
    };

    const handleComment = (event) => {
        event.preventDefault();
        setComments([...comments, newComment]);
        setNewComment('');
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Card style={{ marginBottom: '20px' }} sx={{ marginTop: 8 }}>
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
                                />
                                <Button type="submit" sx={{ mt: 1, mb: 2 }} variant="contained" color="primary">
                                    Comment
                                </Button>
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
            </ThemeProvider>

        </div>
    );
};

const RedditClone = () => {
    const posts = [
        {
            title: 'Hello World',
            author: 'John Doe',
            body: 'This is my first post',
            upvotes: 0,
            downvotes: 0,
            comments: [],
        },
        {
            title: 'React is Awesome',
            author: 'Jane Smith',
            body: 'I just started learning React and it is amazing',
            upvotes: 0,
            downvotes: 0,
            comments: [],
        },
    ];

    return (
        <div>
            <ThemeProvider theme={theme} sx={{mt:8}}>

                {posts.map((post) => (
                    <Post key={post.title} post={post} />
                ))}


            </ThemeProvider>
        </div>
    );
};

export default RedditClone;
