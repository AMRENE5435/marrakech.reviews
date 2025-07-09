// src/hooks/useTripAdvisorData.js
import { useState, useEffect, useCallback } from 'react';
import { tripAdvisorService } from '../services/tripAdvisorService';

export const useTripAdvisorLocations = (searchQuery, category = null) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocations = useCallback(async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const response = await tripAdvisorService.searchLocations(searchQuery);
      setLocations(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch locations:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return { locations, loading, error, refetch: fetchLocations };
};

export const useTripAdvisorReviews = (locationId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationId) return;

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await tripAdvisorService.getLocationReviews(locationId);
        setReviews(response.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [locationId]);

  return { reviews, loading, error };
};