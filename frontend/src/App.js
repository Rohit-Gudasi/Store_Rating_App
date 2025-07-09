import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import {
  CssBaseline, AppBar, Toolbar, Button, Typography,
  Box, Tab, Tabs
} from '@mui/material';
import Auth from './components/Auth';
import StoreList from './components/StoreList';
import OwnerDashboard from './components/OwnerDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const token = localStorage.getItem('token');
  let role = '';
  if (token) {
    try {
      role = JSON.parse(atob(token.split('.')[1])).role;
    } catch {}
  }

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <CssBaseline />
        {token && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Store Rating App
            </Typography>
            <Tabs
  value={false}
  TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
  textColor="inherit"
  sx={{
    '.MuiTab-root': {
      color: 'white',
      fontWeight: 500,
      textTransform: 'none',
      '&.Mui-selected': {
        color: 'white',
      },
    },
  }}
>
  {role === 'Normal User' && <Tab label="Stores" component={Link} to="/stores" />}
  {role === 'Store Owner' && <Tab label="My Stores" component={Link} to="/owner" />}
  {role === 'System Administrator' && <Tab label="Admin" component={Link} to="/admin" />}
</Tabs>

            <Button color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      )}
      <Box sx={{ mt: token ? 2 : 0 }}> {/* FIXED: No top margin if not logged in */}
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/stores" element={token ? <StoreList /> : <Navigate to="/" />} />
          <Route path="/owner" element={token && role === 'Store Owner' ? <OwnerDashboard /> : <Navigate to="/" />} />
          <Route path="/admin" element={token && role === 'System Administrator' ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
