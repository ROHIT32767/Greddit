import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Axios from "axios";
var token = null
if (window.localStorage.getItem('token')) {
    token = `bearer ${(JSON.parse(window.localStorage.getItem('token'))).token}`
}
const ImageUploadForm = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        Axios.post("/api/SubGreddiits/upload",formData, {
            headers: {
                "Authorization": token,
            }
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    return (

        <form  onSubmit={handleSubmit}>
            <TextField
                id="outlined-basic"
                type="file"
                label="Choose Image"
                variant="outlined"
                onChange={handleFileChange}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Upload
            </Button>
        </form>

    )
};

export default ImageUploadForm;



