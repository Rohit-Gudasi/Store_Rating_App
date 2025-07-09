import React, { useEffect, useState } from 'react';
import {
  Typography, Paper, Grid, TextField, Button,
  Snackbar, Alert, Box
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import api from '../api';

export default function OwnerDashboard() {
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const fetchStores = async () => {
    const res = await api.get('/stores');
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).id;
    const myStores = res.data.filter(s => s.user_id === userId);
    const enriched = await Promise.all(myStores.map(async s => {
      const avg = await api.get(`/stores/${s.id}/average-rating`).then(r => r.data.averageRating);
      return { ...s, averageRating: avg ?? 0 };
    }));
    setStores(enriched);
  };

  useEffect(() => { fetchStores(); }, []);

  const createStore = async e => {
    e.preventDefault();
    try {
      await api.post('/stores', form);
      setForm({ name: '', email: '', address: '' });
      setSnack({ open: true, message: 'Store created!', severity: 'success' });
      fetchStores();
    } catch {
      setSnack({ open: true, message: 'Could not create store', severity: 'error' });
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
        Owner Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* New Store Form */}
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 24 }}>
            <Typography variant="h6" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AddBusinessIcon /> New Store
            </Typography>
            <form onSubmit={createStore} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <TextField
                label="Name"
                required
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              />
              <TextField
                label="Email"
                required
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              />
              <TextField
                label="Address"
                required
                value={form.address}
                onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
              />
              <Button type="submit" variant="contained" fullWidth>
                Create Store
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Your Stores */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" style={{ marginBottom: 16 }}>
            Your Stores
          </Typography>
          <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {stores.map(store => (
              <Paper
                key={store.id}
                style={{
                  width: 250,
                  padding: 16,
                  backgroundColor: '#f0f8ff',
                  borderRadius: 8
                }}
              >
                <Typography variant="subtitle1" style={{ fontWeight: 600, color: '#1565c0' }}>
                  <StoreIcon fontSize="small" style={{ marginRight: 4 }} />
                  {store.name}
                </Typography>
                <Typography variant="body2">📍 {store.address}</Typography>
                <Typography variant="body2">📧 {store.email}</Typography>
                <Typography variant="body2">⭐ Avg: {store.averageRating.toFixed(2)}</Typography>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack(prev => ({ ...prev, open: false }))}
      >
        <Alert variant="filled" severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
