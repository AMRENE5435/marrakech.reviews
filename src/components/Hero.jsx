import { Button } from '@/components/ui/button'
import { Search, MapPin, Star, TrendingUp } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Live Reviews from Google, Airbnb & TripAdvisor</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Discover the{' '}
            <span className="text-primary">Best of Marrakech</span>
            <br />
            Through Real Reviews
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore authentic reviews for restaurants, riads, activities, and hidden gems in the Red City. 
            All aggregated from trusted platforms in one beautiful place.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search for restaurants, riads, activities..."
                className="w-full pl-12 pr-32 py-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow-lg"
              />
              <Button className="absolute right-2 top-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-primary mb-2">
                <MapPin className="h-5 w-5" />
                <span className="text-2xl font-bold">500+</span>
              </div>
              <p className="text-sm text-muted-foreground">Places Listed</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-accent mb-2">
                <Star className="h-5 w-5" />
                <span className="text-2xl font-bold">10K+</span>
              </div>
              <p className="text-sm text-muted-foreground">Reviews Aggregated</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-secondary mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-2xl font-bold">Daily</span>
              </div>
              <p className="text-sm text-muted-foreground">Updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

