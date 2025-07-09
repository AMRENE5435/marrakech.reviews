// TripAdvisor API Service
class TripAdvisorService {
  constructor() {
    this.baseURL = 'https://api.content.tripadvisor.com/api/v1';
    this.apiKey = import.meta.env.VITE_TRIPADVISOR_API_KEY;
    this.defaultHeaders = {
      'accept': 'application/json'
    };
  }

  async makeRequest(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    // Add API key to params
    params.key = this.apiKey;
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.defaultHeaders
      });

      if (!response.ok) {
        throw new Error(`TripAdvisor API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('TripAdvisor API request failed:', error);
      throw error;
    }
  }

  // Search for locations near Marrakech
  async searchLocations(query = '', category = '', limit = 20) {
    const params = {
      searchQuery: query || 'Marrakech',
      category: category || 'attractions',
      language: 'en',
      limit: limit
    };

    return await this.makeRequest('/location/search', params);
  }

  // Get location details by ID
  async getLocationDetails(locationId, language = 'en') {
    const params = {
      language: language
    };

    return await this.makeRequest(`/location/${locationId}/details`, params);
  }

  // Get location photos
  async getLocationPhotos(locationId, language = 'en') {
    const params = {
      language: language
    };

    return await this.makeRequest(`/location/${locationId}/photos`, params);
  }

  // Get location reviews
  async getLocationReviews(locationId, language = 'en', limit = 10) {
    const params = {
      language: language,
      limit: limit
    };

    return await this.makeRequest(`/location/${locationId}/reviews`, params);
  }

  // Search specifically for restaurants in Marrakech
  async searchRestaurants(query = 'Marrakech restaurants', limit = 20) {
    return await this.searchLocations(query, 'restaurants', limit);
  }

  // Search specifically for hotels in Marrakech
  async searchHotels(query = 'Marrakech hotels', limit = 20) {
    return await this.searchLocations(query, 'hotels', limit);
  }

  // Search specifically for attractions in Marrakech
  async searchAttractions(query = 'Marrakech attractions', limit = 20) {
    return await this.searchLocations(query, 'attractions', limit);
  }

  // Get nearby locations (for Marrakech area)
  async getNearbyLocations(latLong = '31.6295,-7.9811', category = 'attractions', radius = '25', radiusUnit = 'km', limit = 20) {
    const params = {
      latLong: latLong,
      category: category,
      radius: radius,
      radiusUnit: radiusUnit,
      language: 'en',
      limit: limit
    };

    return await this.makeRequest('/location/nearby_search', params);
  }

  // Helper method to get mixed content for homepage
  async getMarrakechHighlights() {
    try {
      const [restaurants, hotels, attractions] = await Promise.all([
        this.searchRestaurants('Marrakech best restaurants', 6),
        this.searchHotels('Marrakech luxury riads hotels', 6),
        this.searchAttractions('Marrakech top attractions', 6)
      ]);

      return {
        restaurants: restaurants.data || [],
        hotels: hotels.data || [],
        attractions: attractions.data || []
      };
    } catch (error) {
      console.error('Failed to fetch Marrakech highlights:', error);
      return {
        restaurants: [],
        hotels: [],
        attractions: []
      };
    }
  }

  // Get a random featured review
  async getFeaturedReview() {
    try {
      // First get some popular locations
      const locations = await this.searchLocations('Marrakech popular places', 'attractions', 10);
      
      if (locations.data && locations.data.length > 0) {
        // Pick a random location
        const randomLocation = locations.data[Math.floor(Math.random() * locations.data.length)];
        
        // Get reviews for this location
        const reviews = await this.getLocationReviews(randomLocation.location_id, 'en', 5);
        
        if (reviews.data && reviews.data.length > 0) {
          const randomReview = reviews.data[Math.floor(Math.random() * reviews.data.length)];
          
          return {
            location: randomLocation,
            review: randomReview
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error('Failed to fetch featured review:', error);
      return null;
    }
  }
}

export const tripAdvisorService = new TripAdvisorService();

