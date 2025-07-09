import React from 'react';
import { useFeaturedReview } from '../hooks/useTripAdvisor';
import { Button } from '@/components/ui/button';
import { Star, Quote, ExternalLink, Calendar, MapPin, Loader2, RefreshCw } from 'lucide-react';
import { 
  formatRating, 
  formatReviewDate, 
  getBestImage, 
  getCategoryDisplayName,
  formatAddress,
  getTripAdvisorUrl,
  truncateText
} from '../utils/dataHelpers';
import AnimatedSection from './AnimatedSection';

const ReviewOfTheDayAPI = () => {
  const { featuredReview, loading, error, refreshFeaturedReview } = useFeaturedReview();

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Calendar className="h-4 w-4" />
                <span>Review of the Day</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Today's Featured Review
              </h2>
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading featured review from TripAdvisor...</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  if (error || !featuredReview) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Calendar className="h-4 w-4" />
                <span>Review of the Day</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Today's Featured Review
              </h2>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-destructive font-medium mb-2">Unable to load featured review</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Please check your TripAdvisor API configuration.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={refreshFeaturedReview}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  const { location, review } = featuredReview;
  const imageUrl = getBestImage(location.photos);
  const category = getCategoryDisplayName(location.category);
  const address = formatAddress(location.address_obj);
  const tripAdvisorUrl = getTripAdvisorUrl(location.location_id);

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calendar className="h-4 w-4" />
              <span>Review of the Day</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Today's Featured Review
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every day we highlight an exceptional review that captures the essence of Marrakech's hospitality.
            </p>
          </div>
        </AnimatedSection>

        {/* Review Card */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 border-b border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{location.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="bg-muted px-2 py-1 rounded-full">{category}</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < Math.floor(parseFloat(review.rating) || 0) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatReviewDate(review.published_date)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={refreshFeaturedReview}
                      className="mt-2 text-xs"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      New Review
                    </Button>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Text Content */}
                  <div className="md:col-span-2">
                    <div className="relative mb-6">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                      {review.title && (
                        <h4 className="text-xl font-semibold text-foreground mb-3 pl-6">
                          {review.title}
                        </h4>
                      )}
                      <p className="text-muted-foreground leading-relaxed pl-6">
                        {truncateText(review.text, 400)}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {review.user?.username?.charAt(0)?.toUpperCase() || 'T'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {review.user?.username || 'TripAdvisor Traveler'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {review.user?.location?.name || 'Verified Traveler'}
                          </p>
                        </div>
                        <span className="bg-accent/10 text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Verified
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>TripAdvisor</span>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={imageUrl}
                        alt={location.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop';
                        }}
                      />
                    </div>
                    {location.photos && location.photos.length > 1 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{location.photos.length - 1} more photos
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      👍 Helpful
                    </Button>
                    <Button variant="outline" size="sm">
                      Share Review
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="default" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => window.open(tripAdvisorUrl, '_blank')}
                    >
                      View All Reviews
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
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Have you visited this place? Share your experience!
            </p>
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => window.open('https://www.tripadvisor.com/UserReviewEdit', '_blank')}
            >
              Write a Review on TripAdvisor
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ReviewOfTheDayAPI;

