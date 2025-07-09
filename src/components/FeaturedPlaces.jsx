import { Button } from '@/components/ui/button'
import { Star, MapPin, ExternalLink, Heart, Clock } from 'lucide-react'

const FeaturedPlaces = () => {
  const places = [
    {
      id: 1,
      name: "La Mamounia",
      category: "Luxury Hotel",
      rating: 4.8,
      reviewCount: 2847,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      description: "Iconic luxury hotel in the heart of Marrakech with stunning gardens and world-class service.",
      badges: ["Verified", "Top Rated"],
      price: "$$$$",
      location: "Medina"
    },
    {
      id: 2,
      name: "Nomad Restaurant",
      category: "Modern Moroccan",
      rating: 4.6,
      reviewCount: 1523,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      description: "Rooftop dining with contemporary Moroccan cuisine and panoramic views of the medina.",
      badges: ["Popular", "Great Views"],
      price: "$$$",
      location: "Medina"
    },
    {
      id: 3,
      name: "Riad Yasmine",
      category: "Traditional Riad",
      rating: 4.7,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      description: "Authentic riad experience with beautiful courtyard and traditional Moroccan hospitality.",
      badges: ["Authentic", "Great Value"],
      price: "$$",
      location: "Medina"
    },
    {
      id: 4,
      name: "Majorelle Garden",
      category: "Garden & Museum",
      rating: 4.5,
      reviewCount: 3421,
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
      description: "Stunning botanical garden with vibrant blue buildings and exotic plants.",
      badges: ["Must Visit", "Instagram Worthy"],
      price: "$",
      location: "Gueliz"
    },
    {
      id: 5,
      name: "Jemaa el-Fnaa",
      category: "Cultural Site",
      rating: 4.4,
      reviewCount: 5672,
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
      description: "The main square and marketplace in Marrakech's medina, bustling with life day and night.",
      badges: ["UNESCO", "Cultural Heritage"],
      price: "Free",
      location: "Medina"
    },
    {
      id: 6,
      name: "Café des Épices",
      category: "Café & Restaurant",
      rating: 4.3,
      reviewCount: 1156,
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop",
      description: "Charming café in the spice market with traditional Moroccan dishes and mint tea.",
      badges: ["Local Favorite", "Authentic"],
      price: "$$",
      location: "Medina"
    }
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Places
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most highly-rated and reviewed places in Marrakech, 
            curated from thousands of authentic reviews.
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {places.map((place) => (
            <div key={place.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-card/90 backdrop-blur-sm text-card-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {place.category}
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
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{place.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{place.location}</span>
                      <span>•</span>
                      <span>{place.price}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{place.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({place.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {place.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {place.badges.map((badge, index) => (
                    <span 
                      key={index}
                      className="bg-accent/10 text-accent-foreground px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="default" size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                    View Reviews
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Places
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPlaces

