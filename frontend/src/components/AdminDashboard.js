import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Paper, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, IconButton, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Button,
  Drawer, Toolbar, List, ListItem, ListItemButton, ListItemText, Box
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import api from '../api';

const drawerWidth = 240;

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => {});
  const [selectedSection, setSelectedSection] = useState('users');

  const fetchData = () => {
    api.get('/admin/users').then(r => setUsers(r.data));
    api.get('/admin/stores').then(r => setStores(r.data));
    api.get('/admin/ratings').then(r => setRatings(r.data));
  };

  useEffect(() => { fetchData(); }, []);

  const askConfirm = action => {
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };

  const sectionStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    mb: 4,
    p: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)'
  };

  const tableHeadStyle = {
    backgroundColor: '#f0f8ff',
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1565c0',
            color: 'white',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
            Shop Rating App
          </Typography>
        </Toolbar>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedSection('users')}>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedSection('stores')}>
              <ListItemText primary="Stores" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedSection('ratings')}>
              <ListItemText primary="Ratings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundImage: 'url("/images/store-background.jpg")',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#3f51b5', fontWeight: 'bold', textShadow: '1px 1px #fff' }}>
          Admin Dashboard
        </Typography>

        {/* USERS TABLE */}
        {selectedSection === 'users' && (
          <Paper sx={sectionStyle}>
            <Typography variant="h5" sx={{ mb: 2, color: '#1565c0', fontWeight: 'bold' }}>Users</Typography>
            <TableContainer>
              <Table>
                <TableHead sx={tableHeadStyle}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(u => (
                    <TableRow key={u.id} hover>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell align="center">
                        <IconButton color="error" onClick={() => askConfirm(() => api.delete(`/admin/users/${u.id}`).then(fetchData))}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* STORES TABLE */}
        {selectedSection === 'stores' && (
          <Paper sx={sectionStyle}>
            <Typography variant="h5" sx={{ mb: 2, color: '#1565c0', fontWeight: 'bold' }}>Stores</Typography>
            <TableContainer>
              <Table>
                <TableHead sx={tableHeadStyle}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Owner</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stores.map(s => (
                    <TableRow key={s.id} hover>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.address}</TableCell>
                      <TableCell>{s.owner_name}</TableCell>
                      <TableCell align="center">
                        <IconButton color="error" onClick={() => askConfirm(() => api.delete(`/admin/stores/${s.id}`).then(fetchData))}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* RATINGS TABLE */}
        {selectedSection === 'ratings' && (
          <Paper sx={sectionStyle}>
            <Typography variant="h5" sx={{ mb: 2, color: '#1565c0', fontWeight: 'bold' }}>Ratings</Typography>
            <TableContainer>
              <Table>
                <TableHead sx={tableHeadStyle}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Store</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratings.map(r => (
                    <TableRow key={r.id} hover>
                      <TableCell>{r.user_name}</TableCell>
                      <TableCell>{r.store_name}</TableCell>
                      <TableCell>{r.rating}</TableCell>
                      <TableCell align="center">
                        <IconButton color="error" onClick={() => askConfirm(() => api.delete(`/admin/ratings/${r.id}`).then(fetchData))}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Confirm Deletion Dialog */}
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>Confirm Deletion?</DialogTitle>
          <DialogContent>
            <DialogContentText>This action cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button color="error" onClick={() => { confirmAction(); setConfirmOpen(false); }}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
