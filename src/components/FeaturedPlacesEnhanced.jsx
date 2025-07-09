// src/components/FeaturedPlacesEnhanced.jsx
import React from 'react';
import { useTripAdvisorLocations } from '../hooks/useTripAdvisorData';
import { Button } from '@/components/ui/button';
import { Star, MapPin, ExternalLink, Heart, Clock } from 'lucide-react';

const FeaturedPlacesEnhanced = () => {
  const { locations, loading, error } = useTripAdvisorLocations('Marrakech restaurants hotels');

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Places
            </h2>
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-6">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
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
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Places
            </h2>
            <p className="text-muted-foreground">
              Unable to load featured places at the moment. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Places
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most highly-rated places in Marrakech, 
            curated from authentic TripAdvisor reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {locations.slice(0, 6).map((place) => (
            <div key={place.location_id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={place.photo?.images?.large?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'} 
                  alt={place.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-card/90 backdrop-blur-sm text-card-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {place.category?.name || 'Restaurant'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="bg-card/90 backdrop-blur-sm p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{place.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{place.address_obj?.city || 'Marrakech'}</span>
                      <span>•</span>
                      <span>{place.price_level || '$$'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{place.rating || '4.5'}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({place.num_reviews || '0'} reviews)
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {place.description || 'Discover this amazing place in Marrakech with authentic reviews from TripAdvisor.'}
                </p>

                <div className="flex items-center space-x-2">
                  <Button variant="default" size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                    View on TripAdvisor
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Places on TripAdvisor
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlacesEnhanced;