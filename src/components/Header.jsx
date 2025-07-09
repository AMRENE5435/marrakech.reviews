import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Marrakech Reviews</h1>
              <p className="text-xs text-muted-foreground">Discover the Best of Marrakech</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#restaurants" className="text-foreground hover:text-primary transition-colors">
              Restaurants
            </a>
            <a href="#riads" className="text-foreground hover:text-primary transition-colors">
              Riads
            </a>
            <a href="#activities" className="text-foreground hover:text-primary transition-colors">
              Activities
            </a>
            <a href="#blog" className="text-foreground hover:text-primary transition-colors">
              Blog
            </a>
          </nav>

          {/* Search and CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <SearchBar 
              placeholder="Search places..." 
              className="w-64"
            />
            <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Add Review
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search places..."
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
              </div>
              <a href="#restaurants" className="text-foreground hover:text-primary transition-colors py-2">
                Restaurants
              </a>
              <a href="#riads" className="text-foreground hover:text-primary transition-colors py-2">
                Riads
              </a>
              <a href="#activities" className="text-foreground hover:text-primary transition-colors py-2">
                Activities
              </a>
              <a href="#blog" className="text-foreground hover:text-primary transition-colors py-2">
                Blog
              </a>
              <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground mt-3">
                Add Review
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

