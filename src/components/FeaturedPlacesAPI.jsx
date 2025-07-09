import React from 'react';
import { useMarrakechHighlights } from '../hooks/useTripAdvisor';
import { Button } from '@/components/ui/button';
import { Star, MapPin, ExternalLink, Heart, Clock, Loader2 } from 'lucide-react';
import { 
  formatRating, 
  formatReviewCount, 
  getBestImage, 
  getCategoryDisplayName,
  formatAddress,
  getLocationBadges,
  getTripAdvisorUrl
} from '../utils/dataHelpers';
import AnimatedSection from './AnimatedSection';

const FeaturedPlacesAPI = () => {
  const { highlights, loading, error } = useMarrakechHighlights();

  // Combine all highlights into a single array and take the best ones
  const allPlaces = [
    ...highlights.restaurants.slice(0, 2),
    ...highlights.hotels.slice(0, 2),
    ...highlights.attractions.slice(0, 2)
  ];

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Places
              </h2>
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading amazing places from TripAdvisor...</span>
              </div>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-6">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="flex space-x-2 mb-4">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-20"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-muted rounded flex-1"></div>
                    <div className="h-8 bg-muted rounded w-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Places
              </h2>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-destructive font-medium mb-2">Unable to load places</p>
                <p className="text-sm text-muted-foreground">
                  Please check your TripAdvisor API configuration and try again.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Places
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the most highly-rated places in Marrakech, 
              curated from authentic TripAdvisor reviews.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allPlaces.map((place, index) => {
            const badges = getLocationBadges(place);
            const imageUrl = getBestImage(place.photos);
            const category = getCategoryDisplayName(place.category);
            const address = formatAddress(place.address_obj);
            const tripAdvisorUrl = getTripAdvisorUrl(place.location_id);

            return (
              <AnimatedSection key={place.location_id} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={imageUrl}
                      alt={place.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-card/90 backdrop-blur-sm text-card-foreground px-2 py-1 rounded-full text-xs font-medium">
                        {category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button className="bg-card/90 backdrop-blur-sm p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
                          {place.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="line-clamp-1">{address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-foreground">
                          {formatRating(place.rating)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({formatReviewCount(place.num_reviews)} reviews)
                      </span>
                    </div>

                    {/* Description */}
                    {place.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {place.description}
                      </p>
                    )}

                    {/* Badges */}
                    {badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {badges.slice(0, 2).map((badge, badgeIndex) => (
                          <span 
                            key={badgeIndex}
                            className="bg-accent/10 text-accent-foreground px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => window.open(tripAdvisorUrl, '_blank')}
                      >
                        View on TripAdvisor
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="p-2"
                        onClick={() => window.open(tripAdvisorUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* View All Button */}
        <AnimatedSection>
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8"
              onClick={() => window.open('https://www.tripadvisor.com/Tourism-g293734-Marrakech_Marrakech_Tensift_El_Haouz_Region-Vacations.html', '_blank')}
            >
              View All Places on TripAdvisor
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedPlacesAPI;

