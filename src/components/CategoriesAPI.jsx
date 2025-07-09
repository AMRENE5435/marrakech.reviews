import React, { useState } from 'react';
import { useCategoryData } from '../hooks/useTripAdvisor';
import { Button } from '@/components/ui/button';
import { 
  UtensilsCrossed, 
  Building2, 
  Camera, 
  ShoppingBag, 
  Coffee, 
  Sparkles,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { formatReviewCount, getCategoryDisplayName } from '../utils/dataHelpers';
import AnimatedSection from './AnimatedSection';

const categories = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: UtensilsCrossed,
    description: 'From street food to fine dining',
    color: 'bg-red-500',
    searchQuery: 'restaurants'
  },
  {
    id: 'hotels',
    name: 'Riads & Hotels',
    icon: Building2,
    description: 'Traditional riads and luxury hotels',
    color: 'bg-blue-500',
    searchQuery: 'hotels'
  },
  {
    id: 'attractions',
    name: 'Activities',
    icon: Camera,
    description: 'Tours, attractions, and experiences',
    color: 'bg-green-500',
    searchQuery: 'attractions'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingBag,
    description: 'Souks, markets, and boutiques',
    color: 'bg-purple-500',
    searchQuery: 'shopping'
  },
  {
    id: 'cafes',
    name: 'Cafés & Bars',
    icon: Coffee,
    description: 'Coffee shops and nightlife',
    color: 'bg-orange-500',
    searchQuery: 'nightlife'
  },
  {
    id: 'wellness',
    name: 'Wellness & Spas',
    icon: Sparkles,
    description: 'Hammams, spas, and wellness',
    color: 'bg-pink-500',
    searchQuery: 'spas'
  }
];

const CategoryCard = ({ category, count, loading, onClick }) => {
  const Icon = category.icon;
  
  return (
    <div 
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${category.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-right">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <span className="text-2xl font-bold text-foreground">{count}</span>
          )}
          <p className="text-xs text-muted-foreground">places</p>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {category.description}
      </p>
      
      <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
        <span>Explore</span>
        <ArrowRight className="h-4 w-4 ml-1" />
      </div>
    </div>
  );
};

const CategoriesAPI = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Get data for each category
  const restaurantsData = useCategoryData('restaurants');
  const hotelsData = useCategoryData('hotels');
  const attractionsData = useCategoryData('attractions');
  const shoppingData = useCategoryData('shopping');
  const cafesData = useCategoryData('nightlife');
  const wellnessData = useCategoryData('spas');

  const categoryData = {
    restaurants: restaurantsData,
    hotels: hotelsData,
    attractions: attractionsData,
    shopping: shoppingData,
    cafes: cafesData,
    wellness: wellnessData
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Here you could navigate to a category page or open a modal
    // For now, we'll just open TripAdvisor search
    const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(category.searchQuery + ' Marrakech')}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse reviews by category to find exactly what you're looking for in Marrakech.
            </p>
          </div>
        </AnimatedSection>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const data = categoryData[category.id];
            const count = data?.data?.length || 0;
            const loading = data?.loading || false;

            return (
              <AnimatedSection key={category.id} delay={index * 0.1}>
                <CategoryCard
                  category={category}
                  count={formatReviewCount(count)}
                  loading={loading}
                  onClick={() => handleCategoryClick(category)}
                />
              </AnimatedSection>
            );
          })}
        </div>

        {/* Search CTA */}
        <AnimatedSection delay={0.6}>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Use our advanced search to filter by location, rating, price range, and more.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                // Scroll to search bar or focus on it
                const searchInput = document.querySelector('input[placeholder*="Search"]');
                if (searchInput) {
                  searchInput.focus();
                  searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              Advanced Search
            </Button>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection delay={0.8}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Places', value: Object.values(categoryData).reduce((sum, data) => sum + (data?.data?.length || 0), 0) },
              { label: 'Categories', value: categories.length },
              { label: 'Reviews', value: '10K+' },
              { label: 'Photos', value: '50K+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {typeof stat.value === 'number' ? formatReviewCount(stat.value) : stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CategoriesAPI;

