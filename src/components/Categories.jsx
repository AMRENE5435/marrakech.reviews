import { Button } from '@/components/ui/button'
import { UtensilsCrossed, Building, Camera, ShoppingBag, Coffee, Palmtree } from 'lucide-react'

const Categories = () => {
  const categories = [
    {
      id: 'restaurants',
      name: 'Restaurants',
      icon: UtensilsCrossed,
      count: '150+',
      description: 'From street food to fine dining',
      color: 'bg-primary/10 text-primary',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop'
    },
    {
      id: 'riads',
      name: 'Riads & Hotels',
      icon: Building,
      count: '80+',
      description: 'Traditional and luxury accommodations',
      color: 'bg-secondary/10 text-secondary',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'
    },
    {
      id: 'activities',
      name: 'Activities',
      icon: Camera,
      count: '120+',
      description: 'Tours, experiences, and adventures',
      color: 'bg-accent/10 text-accent',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop'
    },
    {
      id: 'shopping',
      name: 'Shopping',
      icon: ShoppingBag,
      count: '200+',
      description: 'Souks, boutiques, and markets',
      color: 'bg-orange-100 text-orange-600',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
    },
    {
      id: 'cafes',
      name: 'Cafés & Bars',
      icon: Coffee,
      count: '90+',
      description: 'Coffee shops and nightlife',
      color: 'bg-purple-100 text-purple-600',
      image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&h=200&fit=crop'
    },
    {
      id: 'wellness',
      name: 'Wellness & Spas',
      icon: Palmtree,
      count: '45+',
      description: 'Hammams, spas, and relaxation',
      color: 'bg-green-100 text-green-600',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop'
    }
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse reviews by category to find exactly what you're looking for in Marrakech.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <div 
                key={category.id} 
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Image Header */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <div className={`p-2 rounded-lg ${category.color} bg-opacity-90 backdrop-blur-sm`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                    <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                  >
                    Explore {category.name}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Can't find what you're looking for?
            </h3>
            <p className="text-muted-foreground mb-6">
              Use our advanced search to filter by location, rating, price range, and more.
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Advanced Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Categories

