import { Button } from '@/components/ui/button'
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-secondary-foreground/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-secondary-foreground/80 mb-6">
              Get the latest reviews and discover new places in Marrakech. 
              Join our weekly newsletter for curated recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/10 border border-secondary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-secondary-foreground placeholder-secondary-foreground/60"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-accent text-accent-foreground p-2 rounded-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Marrakech Reviews</h4>
                  <p className="text-sm text-secondary-foreground/80">Discover the Best</p>
                </div>
              </div>
              <p className="text-secondary-foreground/80 mb-6 text-sm leading-relaxed">
                Your trusted source for authentic reviews of restaurants, riads, activities, 
                and hidden gems in the Red City of Marrakech.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="bg-secondary-foreground/10 hover:bg-accent hover:text-accent-foreground p-2 rounded-lg transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-secondary-foreground/10 hover:bg-accent hover:text-accent-foreground p-2 rounded-lg transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-secondary-foreground/10 hover:bg-accent hover:text-accent-foreground p-2 rounded-lg transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-secondary-foreground/10 hover:bg-accent hover:text-accent-foreground p-2 rounded-lg transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Explore Column */}
            <div>
              <h5 className="font-semibold mb-4">Explore</h5>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Restaurants</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Riads & Hotels</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Activities</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Shopping</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Cafés & Bars</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Wellness & Spas</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Travel Guides</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Best of 2024</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Local Tips</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Photo Gallery</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Events Calendar</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Weather</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2 text-secondary-foreground/80">
                  <Mail className="h-4 w-4" />
                  <span>hello@marrakechreviews.com</span>
                </li>
                <li className="flex items-center space-x-2 text-secondary-foreground/80">
                  <Phone className="h-4 w-4" />
                  <span>+212 524 123 456</span>
                </li>
                <li className="flex items-start space-x-2 text-secondary-foreground/80">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>Medina, Marrakech<br />Morocco</span>
                </li>
              </ul>
              <div className="mt-6">
                <h6 className="font-medium mb-2">Business Hours</h6>
                <p className="text-xs text-secondary-foreground/80">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday - Sunday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-secondary-foreground/80">
              <p>&copy; 2024 Marrakech Reviews. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-accent transition-colors">Cookie Policy</a>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-secondary-foreground/80">
              <span>Powered by</span>
              <div className="flex space-x-2">
                <span className="bg-secondary-foreground/10 px-2 py-1 rounded text-xs">TripAdvisor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

