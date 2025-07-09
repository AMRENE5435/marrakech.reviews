// Utility functions for processing TripAdvisor data

// Format rating to display with proper decimal places
export const formatRating = (rating) => {
  if (!rating) return '0.0';
  return parseFloat(rating).toFixed(1);
};

// Format review count for display
export const formatReviewCount = (count) => {
  if (!count) return '0';
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

// Get price level display
export const getPriceLevel = (priceLevel) => {
  const priceLevels = {
    '$': '$',
    '$$': '$$',
    '$$$': '$$$',
    '$$$$': '$$$$'
  };
  return priceLevels[priceLevel] || '$$';
};

// Extract address from TripAdvisor location object
export const formatAddress = (addressObj) => {
  if (!addressObj) return 'Marrakech, Morocco';
  
  const parts = [];
  if (addressObj.street1) parts.push(addressObj.street1);
  if (addressObj.city) parts.push(addressObj.city);
  if (addressObj.country) parts.push(addressObj.country);
  
  return parts.length > 0 ? parts.join(', ') : 'Marrakech, Morocco';
};

// Get the best available image from TripAdvisor photo object
export const getBestImage = (photos, size = 'large') => {
  if (!photos || !photos.length) {
    return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
  }

  const photo = photos[0];
  if (photo.images && photo.images[size]) {
    return photo.images[size].url;
  }
  
  // Fallback to other sizes
  const fallbackSizes = ['large', 'medium', 'small', 'thumbnail'];
  for (const fallbackSize of fallbackSizes) {
    if (photo.images && photo.images[fallbackSize]) {
      return photo.images[fallbackSize].url;
    }
  }
  
  return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
};

// Get category display name
export const getCategoryDisplayName = (category) => {
  const categoryMap = {
    'restaurants': 'Restaurant',
    'hotels': 'Hotel',
    'attractions': 'Attraction',
    'geos': 'Location',
    'neighborhoods': 'Neighborhood'
  };
  
  if (typeof category === 'string') {
    return categoryMap[category] || category;
  }
  
  if (category && category.name) {
    return category.name;
  }
  
  return 'Place';
};

// Format review date
export const formatReviewDate = (dateString) => {
  if (!dateString) return 'Recently';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    
    return `${Math.ceil(diffDays / 365)} years ago`;
  } catch (error) {
    return 'Recently';
  }
};

// Truncate text to specified length
export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Get star rating array for display
export const getStarRating = (rating) => {
  const numRating = parseFloat(rating) || 0;
  const fullStars = Math.floor(numRating);
  const hasHalfStar = numRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars
  };
};

// Extract location coordinates
export const getCoordinates = (location) => {
  if (location.latitude && location.longitude) {
    return {
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude)
    };
  }
  
  // Default to Marrakech coordinates
  return {
    lat: 31.6295,
    lng: -7.9811
  };
};

// Generate TripAdvisor URL for location
export const getTripAdvisorUrl = (locationId) => {
  if (!locationId) return 'https://www.tripadvisor.com';
  return `https://www.tripadvisor.com/ShowUserReviews-g${locationId}`;
};

// Filter locations by category
export const filterByCategory = (locations, category) => {
  if (!category || !locations) return locations;
  
  return locations.filter(location => {
    if (location.category) {
      if (typeof location.category === 'string') {
        return location.category.toLowerCase().includes(category.toLowerCase());
      }
      if (location.category.name) {
        return location.category.name.toLowerCase().includes(category.toLowerCase());
      }
    }
    return false;
  });
};

// Sort locations by rating
export const sortByRating = (locations, ascending = false) => {
  if (!locations) return [];
  
  return [...locations].sort((a, b) => {
    const ratingA = parseFloat(a.rating) || 0;
    const ratingB = parseFloat(b.rating) || 0;
    
    return ascending ? ratingA - ratingB : ratingB - ratingA;
  });
};

// Sort locations by review count
export const sortByReviewCount = (locations, ascending = false) => {
  if (!locations) return [];
  
  return [...locations].sort((a, b) => {
    const countA = parseInt(a.num_reviews) || 0;
    const countB = parseInt(b.num_reviews) || 0;
    
    return ascending ? countA - countB : countB - countA;
  });
};

// Get location badges based on rating and review count
export const getLocationBadges = (location) => {
  const badges = [];
  const rating = parseFloat(location.rating) || 0;
  const reviewCount = parseInt(location.num_reviews) || 0;
  
  if (rating >= 4.5) badges.push('Excellent');
  else if (rating >= 4.0) badges.push('Very Good');
  else if (rating >= 3.5) badges.push('Good');
  
  if (reviewCount >= 1000) badges.push('Popular');
  else if (reviewCount >= 500) badges.push('Well Reviewed');
  
  if (location.awards && location.awards.length > 0) {
    badges.push('Award Winner');
  }
  
  return badges;
};

