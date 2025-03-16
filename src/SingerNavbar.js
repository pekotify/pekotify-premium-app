import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from './img/logo-colorful.png';
import { Button } from '@mui/material';
import AuthService from './Services/AuthService'


function SingerNavbar() {
  function handleLogout(e) {
    e.preventDefault();
    AuthService.logout();
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{
            width: 30,
            height: 35,
            margin: 1
          }}>
            <img src={Logo} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'open sans',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Pekotify Premium
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: 'open sans',
                fontWeight: 400,
                color: 'inherit',
                textDecoration: 'none',
                marginRight: 2
              }}
            >
              Singer Page
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant='text'
              sx={{
                fontFamily: 'open sans',
                fontWeight: 400,
                color: 'inherit',
                textDecoration: 'none',
                marginRight: 2
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default SingerNavbar;