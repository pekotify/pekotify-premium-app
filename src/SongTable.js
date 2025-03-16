import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import './css/song-table.css';

const columns = [
  { id: 'title', label: 'TITLE', minWidth: 200, align: 'left' },
];

function createData(id, title) {
  return { id, title };
}


export default function SongTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  const token = localStorage.getItem('accesToken');
  const userId = localStorage.getItem('userId');

  const getSongs = async () => {
    try {
      const resp = await fetch('http://localhost:3001/songs/' + userId, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
      const data = await resp.json();
      const arrSongs = data.map(e => createData(e.id, e.judul));
      setRows(arrSongs);
      setIsLoaded(true);
    }
    catch (error) {
      setError(error);
    }
  }

  React.useEffect(() => {
    getSongs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteSong = async (id, title) => {
    if (window.confirm('Are you sure to delete song ' + title + '?')) {
      const resp = await fetch('http://localhost:3001/songs/' + id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      })
      const data = await resp.json();
      console.log(data);
      window.location.reload();
    }
  }

  if (!isLoaded) {
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return <div>Loading...</div>;
  } else {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }} >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align='right' style={{ minWidth: 20 }}>
                  <p style={{ textAlign: 'right' }}>#</p>
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, verticalAlign: 'middle' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>
                  {/* Edit button */}
                </TableCell>
                <TableCell>
                  {/* Delete button */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={0} key={idx}>
                      <TableCell key='no' style={{ verticalAlign: 'inherit' }}>
                        <p style={{ textAlign: 'right' }}>{page * rowsPerPage + idx + 1}</p>
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{ verticalAlign: 'inherit' }}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell key='edit_button'>
                        <Button variant='text'
                          startIcon={<Edit />}
                          size='small'
                          onClick={() => {
                            console.log('edit song with id ' + row.id);
                            window.location.href = 'singer-page/detail-song/edit/' + row.id;
                            localStorage.setItem('judul', row.title);
                            localStorage.setItem('songId', row.id);
                          }}
                        >
                          <Box sx={{ display: { xs: 'none', md: 'flex', padding: 0, lineHeight: 1.75 } }}>Edit</Box>
                        </Button>
                      </TableCell>
                      <TableCell key='delete_button'>
                        <Button variant='text'
                          startIcon={<Delete />}
                          size='small'
                          style={{ color: 'red' }}
                          onClick={() => {
                            handleDeleteSong(row.id, row.title);
                          }}
                        >
                          <Box sx={{ display: { xs: 'none', md: 'flex', padding: 0, lineHeight: 1.75 } }}>Delete</Box>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{

          }}
        />
      </Paper >
    );
  }
};