import React, { useState, useRef, useEffect } from 'react';
import { useTripAdvisorSearch } from '../hooks/useTripAdvisor';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  X, 
  MapPin, 
  Star, 
  ExternalLink, 
  Loader2,
  Filter,
  TrendingUp
} from 'lucide-react';
import { 
  formatRating, 
  formatReviewCount, 
  getBestImage, 
  getCategoryDisplayName,
  formatAddress,
  getTripAdvisorUrl,
  truncateText
} from '../utils/dataHelpers';

const SearchBar = ({ placeholder = "Search for restaurants, riads, activities...", className = "" }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  
  const { results, loading, error, search, clearResults } = useTripAdvisorSearch();

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'restaurants', label: 'Restaurants' },
    { value: 'hotels', label: 'Hotels & Riads' },
    { value: 'attractions', label: 'Attractions' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'nightlife', label: 'Cafés & Bars' }
  ];

  // Handle search
  const handleSearch = async (searchQuery = query) => {
    if (searchQuery.trim()) {
      await search(searchQuery, selectedCategory);
      setIsOpen(true);
    } else {
      clearResults();
      setIsOpen(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounced search
    if (value.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch(value);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    } else {
      clearResults();
      setIsOpen(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (query.trim()) {
      handleSearch(query);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle result click
  const handleResultClick = (result) => {
    const tripAdvisorUrl = getTripAdvisorUrl(result.location_id);
    window.open(tripAdvisorUrl, '_blank');
    setIsOpen(false);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    clearResults();
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Search Input */}
      <div ref={searchRef} className="relative">
        <div className="flex items-center bg-background border border-border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
          {/* Category Filter */}
          <div className="flex-shrink-0 border-r border-border">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-transparent px-3 py-3 text-sm text-muted-foreground focus:outline-none cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="w-full pl-10 pr-10 py-3 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <Button
            onClick={() => handleSearch()}
            disabled={!query.trim() || loading}
            className="m-1 px-4"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {isOpen && (query.trim() || results.length > 0) && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {loading && (
            <div className="p-4 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Searching TripAdvisor...</p>
            </div>
          )}

          {error && (
            <div className="p-4 text-center">
              <p className="text-sm text-destructive mb-2">Search failed</p>
              <p className="text-xs text-muted-foreground">{error}</p>
            </div>
          )}

          {!loading && !error && results.length === 0 && query.trim() && (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">No results found</p>
              <p className="text-xs text-muted-foreground">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              {/* Results Header */}
              <div className="p-3 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {results.length} places found
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>From TripAdvisor</span>
                  </div>
                </div>
              </div>

              {/* Results List */}
              <div className="max-h-80 overflow-y-auto">
                {results.slice(0, 8).map((result, index) => {
                  const imageUrl = getBestImage(result.photos, 'small');
                  const category = getCategoryDisplayName(result.category);
                  const address = formatAddress(result.address_obj);

                  return (
                    <div
                      key={result.location_id || index}
                      onClick={() => handleResultClick(result)}
                      className="p-3 hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={imageUrl}
                            alt={result.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop';
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-foreground truncate">
                                {result.name}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                  {category}
                                </span>
                                {result.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-muted-foreground">
                                      {formatRating(result.rating)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-1 mt-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground truncate">
                                  {address}
                                </span>
                              </div>
                            </div>
                            <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View All Results */}
              {results.length > 8 && (
                <div className="p-3 border-t border-border bg-muted/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(query + ' Marrakech')}`;
                      window.open(searchUrl, '_blank');
                      setIsOpen(false);
                    }}
                  >
                    View all {results.length} results on TripAdvisor
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

