import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Paper, TextField, Button,
  Typography, MenuItem, Box, InputAdornment
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import api from '../api';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '', email: '', password: '', address: '', role: 'Normal User'
  });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = mode === 'login'
        ? { email: form.email, password: form.password }
        : form;
      const path = mode === 'login' ? '/users/login' : '/users/register';
      const res = await api.post(path, payload);
      if (mode === 'login') {
        localStorage.setItem('token', res.data.token);
        const r = JSON.parse(atob(res.data.token.split('.')[1])).role;
        if (r === 'System Administrator') navigate('/admin');
        else if (r === 'Store Owner') navigate('/owner');
        else navigate('/stores');
      } else {
        alert('Registered! Now login.');
        setMode('login');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong.');
    }
  };

  const roleIcons = {
    'Normal User': <PeopleIcon fontSize="small" />,
    'Store Owner': <StoreIcon fontSize="small" />,
    'System Administrator': <AdminPanelSettingsIcon fontSize="small" />
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side - Visual */}
      <Grid item xs={12} md={6} sx={{
        background: 'linear-gradient(135deg, #2196f3, #21cbf3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        p: 4
      }}>
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Store Rating App
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Rate and discover stores around you.
            Sign in or create an account to get started!
          </Typography>
        </Box>
      </Grid>

      {/* Right Side - Form */}
      <Grid item xs={12} md={6} sx={{
        background: 'url(/images/auth-bg.jpg) no-repeat center',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}>
        <Paper elevation={6} sx={{
          p: 5,
          width: '100%',
          maxWidth: 450,
          borderRadius: 4,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          <Typography variant="h5" align="center" fontWeight={600} sx={{ mb: 3, color: '#1976d2' }}>
            {mode === 'login' ? 'Login to your account' : 'Register new account'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            {mode === 'register' && (
              <>
                <TextField
                  label="Name"
                  required fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>
                  }}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                />
                <TextField
                  label="Address"
                  required fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment>
                  }}
                  onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                />
              </>
            )}
            <TextField
              label="Email"
              type="email"
              required fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>
              }}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            />
            <TextField
              label="Password"
              type="password"
              required fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>
              }}
              onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
            />

            {mode === 'register' && (
              <TextField
                select
                label="Role"
                fullWidth
                value={form.role}
                onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
              >
                {['Normal User', 'Store Owner', 'System Administrator'].map(role => (
                  <MenuItem key={role} value={role}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {roleIcons[role]} {role}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 1,
                fontWeight: 600,
                background: 'linear-gradient(to right, #1976d2, #1e88e5)',
                '&:hover': {
                  background: 'linear-gradient(to right, #1565c0, #0d47a1)',
                }
              }}
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </Button>
          </Box>

          <Box textAlign="center" mt={2}>
            <Button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} sx={{ fontWeight: 500 }}>
              {mode === 'login'
                ? "Don't have an account? Register"
                : 'Already have an account? Login'}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
