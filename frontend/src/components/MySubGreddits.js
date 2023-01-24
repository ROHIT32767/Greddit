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
const theme = createTheme();
export default function SubredditPage(props) {
    const [subreddits, setSubreddits] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newSubreddit, setNewSubreddit] = useState({
        Name: '',
        Description: '',
        Banned: [],
        Followers: [],
        Posts: [],
        // Image: null,
    });
    const ToggleForm = () => {
        setShowForm(!showForm);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubreddits([...subreddits, newSubreddit]);
        setShowForm(false);
        setNewSubreddit({
            Name: "",
            Description: "",
            Banned: [],
            Followers: [window.localStorage.getItem('token').id],
            Posts: [],
            // Image: null,
        });
    };
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
                                                Add
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
            </ThemeProvider>
        </div>
    )

}
// {showForm && (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={newSubreddit.name}
//               onChange={handleChange}
//             />
//           </label>
//           <br />
//           <label>
//             Description:
//             <textarea
//               name="description"
//               value={newSubreddit.description}
//               onChange={handleChange}
//             />
//           </label>
//           <br />
//           <label>
//             Banned Keywords:
//             <input
//               type="text"
//               name="bannedKeywords"
//               value={newSubreddit.bannedKeywords}
//               onChange={handleChange}
//             />
//           </label>
//           <br />
//           <label>
//             Image:
//             <input
//               type="file"
//               name="image"
//               onChange={handleFileChange}
//             />
//           </label>
//           <br />
//           <button type="submit">Submit</button>
//         </form>
//       )}
//  <div>
//         {subreddits.map((subreddit) => (
//           <div key={subreddit.name}>
//             <p>Name: {subreddit.name}</p>
//             <p>Followers: {subreddit.followers}</p>
//             <p>Posts: {subreddit.posts}</p>
//             <p>Description: {subreddit.description}</p>
//             <p>Banned Keywords: {subreddit.bannedKeywords}</p>
//           </div>
//         ))}
//       </div> 


// const handleFileChange = (event) => {
//     setNewSubreddit({ ...newSubreddit, image: event.target.files[0] });
// }