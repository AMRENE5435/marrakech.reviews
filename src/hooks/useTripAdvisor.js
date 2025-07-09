import { useState, useEffect, useCallback } from 'react';
import { tripAdvisorService } from '../services/tripAdvisorService';

// Hook for searching locations
export const useTripAdvisorSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query, category = '') => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await tripAdvisorService.searchLocations(query, category);
      setResults(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, loading, error, search, clearResults };
};

// Hook for getting location details
export const useLocationDetails = (locationId) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationId) return;

    const fetchLocationDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await tripAdvisorService.getLocationDetails(locationId);
        setLocation(response);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch location details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationDetails();
  }, [locationId]);

  return { location, loading, error };
};

// Hook for getting location reviews
export const useLocationReviews = (locationId, limit = 10) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationId) return;

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await tripAdvisorService.getLocationReviews(locationId, 'en', limit);
        setReviews(response.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [locationId, limit]);

  return { reviews, loading, error };
};

// Hook for getting Marrakech highlights (mixed content)
export const useMarrakechHighlights = () => {
  const [highlights, setHighlights] = useState({
    restaurants: [],
    hotels: [],
    attractions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHighlights = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await tripAdvisorService.getMarrakechHighlights();
        setHighlights(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch highlights:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  return { highlights, loading, error };
};

// Hook for getting featured review
export const useFeaturedReview = () => {
  const [featuredReview, setFeaturedReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshFeaturedReview = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await tripAdvisorService.getFeaturedReview();
      setFeaturedReview(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch featured review:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFeaturedReview();
  }, [refreshFeaturedReview]);

  return { featuredReview, loading, error, refreshFeaturedReview };
};

// Hook for category-specific searches
export const useCategoryData = (category) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        switch (category) {
          case 'restaurants':
            response = await tripAdvisorService.searchRestaurants();
            break;
          case 'hotels':
            response = await tripAdvisorService.searchHotels();
            break;
          case 'attractions':
            response = await tripAdvisorService.searchAttractions();
            break;
          default:
            response = await tripAdvisorService.searchLocations(`Marrakech ${category}`);
        }
        setData(response.data || []);
      } catch (err) {
        setError(err.message);
        console.error(`Failed to fetch ${category} data:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryData();
    }
  }, [category]);

  return { data, loading, error };
};

// Hook for nearby locations
export const useNearbyLocations = (category = 'attractions', limit = 20) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNearbyLocations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await tripAdvisorService.getNearbyLocations(
          '31.6295,-7.9811', // Marrakech coordinates
          category,
          '25',
          'km',
          limit
        );
        setLocations(response.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch nearby locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyLocations();
  }, [category, limit]);

  return { locations, loading, error };
};

