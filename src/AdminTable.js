import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import './css/song-table.css';
import { Container } from '@mui/system';

const columns = [
    { id: 'creator_id', label: 'Creator ID', minWidth: 20, align: 'left' },
    { id: 'subscriber_id', label: 'Subscriber ID', minWidth: 20, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 80, align: 'left' },
];

function createData(creator_id, subscriber_id, status) {
    return { creator_id, subscriber_id, status };
}

export default function AdminTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const token = localStorage.getItem('accesToken');

    const getSubscriptions = async () => {
        try {
            const resp = await fetch('http://localhost:3001/requests', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            });
            const data = await resp.json();
            const arrSubs = data.map(e => createData(e.item[0], e.item[1], e.item[2]));
            setRows(arrSubs);
            setIsLoaded(true);
        }
        catch (error) {
            setError(error);
        }
    }

    const sendApproval = async (creator_id, subscriber_id, status) => {
        console.log('http://localhost:3001/approve/' + status + "/" + String(creator_id) + "/" + String(subscriber_id))
        const resp = await fetch('http://localhost:3001/approve/' + status + "/" + String(creator_id) + "/" + String(subscriber_id), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json();
    }

    React.useEffect(() => {
        getSubscriptions();
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                                    {/* Accept button */}
                                </TableCell>
                                <TableCell>
                                    {/* Reject button */}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, idx) => {
                                    const i = page * rowsPerPage + idx + 1;
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={0} key={i}>
                                            <TableCell key={"idx"} style={{ verticalAlign: 'inherit' }}>
                                                <p style={{ textAlign: 'right' }}>{i}</p>
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
                                            <TableCell key='accept_button'>
                                                {(row.status === 'PENDING') &&
                                                    <Button
                                                        variant='text'
                                                        startIcon={<Check />}
                                                        size='small'
                                                        style={{ color: 'green' }}
                                                        onClick={() => {
                                                            sendApproval(row.creator_id, row.subscriber_id, "ACCEPTED");
                                                            window.location.reload();
                                                        }}
                                                    >
                                                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>Accept</Box>
                                                    </Button>
                                                }
                                            </TableCell>
                                            <TableCell key='reject_button'>
                                                {(row.status === 'PENDING') &&
                                                    <Button
                                                        variant='text'
                                                        startIcon={<Close />}
                                                        size='small'
                                                        style={{ color: 'red' }}
                                                        onClick={() => {
                                                            sendApproval(row.creator_id, row.subscriber_id, "REJECTED");
                                                            window.location.reload();
                                                        }}
                                                    >
                                                        <Box sx={{ display: { xs: 'none', md: 'flex', margin: 0 } }}>Reject</Box>
                                                    </Button>
                                                }
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
            </Paper>
        );
    }
}