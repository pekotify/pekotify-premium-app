import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Paper, Typography } from '@mui/material';
import axios from 'axios';

const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accesToken')
    }
}

export default function DetailSong() {
    var id = null;
    const [file, setFile] = React.useState();

    const onInputChange = (e) => {
        console.log(e.target);
        setFile(e.target.files[0]);
    };


    const isEdit = window.location.href.includes('edit');
    if (isEdit) {
        id = window.location.href.split('/').pop();
        console.log('editing ' + id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accesToken');

        console.log(file);

        data.append('file', file);

        var response = {};
        var audioPath = '';

        if (isEdit) {
            audioPath = await axios.put('http://localhost:3005/songs/file/' + id, data, config
            ).then((res) => {
                console.log(res);
                return res.data;
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            audioPath = await axios.post('http://localhost:3005/songs/file', data, config
            ).then((res) => {
                console.log(res);
                return res.data;
            }).catch((err) => {
                console.log(err);
            });
        }

        const song = {
            judul: e.target.judul.value,
            penyanyi_id: userId,
            audio_path: audioPath,
        }
        console.log(song);

        if (isEdit) {
            response = await fetch('http://localhost:3005/songs/' + localStorage.getItem('songId'), {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(song)
            })
        } else {
            response = await fetch('http://localhost:3005/songs', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(song)
            })
        }

        if (response.status === 200) {
            alert('Song uploaded successfully');
            window.location.href = '/singer-page';
        }
    }

    return (
        <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch', },
                    padding: '40px',
                    borderRadius: '10px',
                    border: '1px solid #000',
                }}
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h4" component="div" gutterBottom sx={{ marginBottom: 2 }}>
                    {isEdit ? 'Edit Song' : 'Add Song'}
                </Typography>
                <div>
                    <Typography variant="label" component="div" gutterBottom>
                        Song title
                    </Typography>
                    <Box component="div" sx={{
                    }}>
                        <TextField
                            required
                            id="judul"
                            defaultValue={isEdit ? localStorage.getItem('judul') : ''}
                        />
                    </Box>
                    <Typography variant="label" component="div" gutterBottom sx={{ paddingTop: 1 }}>
                        Song file
                    </Typography>
                    <Box component="div" sx={{
                        paddingLeft: 1
                    }}>
                        <input type="file" accept="audio/*" onChange={onInputChange} required />
                    </Box>
                </div>
                <Button
                    type="submit"
                    id="submit"
                    variant="contained"
                    sx={{
                        marginTop: 4,
                        width: '100%',
                    }}
                >
                    <Typography variant="p" >
                        Sumbit
                    </Typography>
                </Button>
            </Box>
        </Paper>
    );
}