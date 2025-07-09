import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Card, CardContent, CardActions,
  Rating, Grid, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Box
} from '@mui/material';
import api from '../api';

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get('/stores').then(res => setStores(res.data));
  }, []);

  const openRating = store => {
    setSelected({ ...store, rating: 0 });
    setOpen(true);
  };

  const submitRating = async () => {
    if (!selected.rating) return alert('Select rating before submitting');
    await api.post('/ratings', { store_id: selected.id, rating: selected.rating });
    alert('Thanks for rating!');
    setOpen(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 6,
        backgroundImage: 'url(/images/store-pattern.jpg)', // Replace with your actual image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 6,
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          color: '#0d47a1',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          textAlign: 'center',
        }}
      >
        Explore & Rate Stores
      </Typography>

      <Grid container spacing={4}>
        {stores.map(s => (
          <Grid item xs={12} sm={6} md={4} key={s.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 4,
                backgroundColor: 'rgba(255,255,255,0.95)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1565c0' }}>
                  {s.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                  {s.address}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => openRating(s)}
                  size="small"
                  variant="contained"
                  sx={{
                    ml: 0,
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  Rate it!
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { borderRadius: 4, p: 2 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#0d47a1' }}>
          Rate {selected?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Rating
              value={selected?.rating || 0}
              precision={1}
              onChange={(e, v) => setSelected(prev => ({ ...prev, rating: v }))}
              size="large"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitRating} sx={{ backgroundColor: '#0d47a1' }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
