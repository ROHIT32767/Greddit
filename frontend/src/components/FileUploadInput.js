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
        Axios.post("http://localhost:3003/api/SubGreddiits/upload",formData, {
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



// import { useState } from "react";
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Axios from "axios";
// var token = null
// if (window.localStorage.getItem('token')) {
//     token = `bearer ${(JSON.parse(window.localStorage.getItem('token'))).token}`
// }
// const FileUploadInput = (props) => {
//     const [file, setFile] = useState("");
//     const handleUpload = () => {
//         console.log(file);
//         const data = new FormData();
//         // let formHeaders = data.getHeaders()
//         data.append("file", file);
//         Axios.post("http://localhost:3003/api/SubGreddiits/upload", data, {
//             headers: {
//                 // ...formHeaders,
//                 "Content-Type":"multipart/form-data",
//                 "Authorization": token,
//             }
//         })
//             .then((response) => {
//                 console.log(response.data);
//             })
//             .catch((err) => {
//                 console.log(err.response);
//             });
//     };
//     return (
//             <Grid container item xs={12} direction="column">
//                 <Grid container item xs={12} spacing={0}>
//                     <Grid item xs={3}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             component="label"
//                             style={{ width: "100%", height: "100%" }}
//                         >
//                             <input
//                                 type="file"
//                                 style={{ display: "none" }}
//                                 onChange={(event) => {
//                                     console.log(event.target.files);
//                                     setFile(event.target.files[0]);
//                                 }}
//                             />
//                         </Button>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <TextField
//                             label="Profile Photo (.jpg/.png)"
//                             value={file ? file.name || "" : ""}
//                             InputProps={{
//                                 readOnly: true,
//                             }}
//                             variant="outlined"
//                             style={{ width: "100%" }}
//                         />
//                     </Grid>
//                     <Grid item xs={3}>
//                         <Button
//                             variant="contained"
//                             color="secondary"
//                             style={{ width: "100%", height: "100%" }}
//                             onClick={() => handleUpload()}
//                             disabled={file ? false : true}
//                         >
//                           UPLOAD
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Grid>
//     );
// };

// export default FileUploadInput;
