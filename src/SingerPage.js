import { Add } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import SongTable from "./SongTable";

const SingerPage = () => {
    return (
        <div className="container">
            <h2>Song List</h2>
            <Container sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
            }}>
                <Button
                    sx={{ position: 'left', marginBottom: 2 }}
                    variant='outlined'
                    startIcon={<Add />}
                    onClick={() => window.location.href = 'singer-page/detail-song'}
                >Add Song</Button>
            </Container>
            <SongTable />
        </div>
    );
}

export default SingerPage;