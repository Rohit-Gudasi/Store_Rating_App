// src/components/StarRating.js
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import api from '../api';

export default function StarRating({ storeId, allowRating }) {
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    if (!storeId) return;

    if (!allowRating) {
      api.get(`/stores/${storeId}/average-rating`)
        .then(res => setAvgRating(res.data.averageRating || 0))
        .catch(() => {});
    } else {
      api.get(`/ratings/my/${storeId}`)
        .then(res => setRating(res.data.rating || 0))
        .catch(() => {});
    }
  }, [allowRating, storeId]);

  const handleClick = async (n) => {
    if (!allowRating) return;
    try {
      await api.post('/ratings', { store_id: storeId, rating: n });
      setRating(n);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit rating.');
    }
  };

  const displayRating = allowRating ? rating : avgRating;

  return (
    <div>
      {[1, 2, 3, 4, 5].map(n => (
        <FaStar
          key={n}
          size={24}
          color={n <= displayRating ? 'gold' : '#ccc'}
          style={{ cursor: allowRating ? 'pointer' : 'default' }}
          onClick={() => handleClick(n)}
        />
      ))}
      {!allowRating && (
        <p style={{ marginTop: 4, fontSize: 14, color: '#777' }}>
          Avg: {avgRating ? avgRating.toFixed(1) : 'No ratings yet'}
        </p>
      )}
    </div>
  );
}
