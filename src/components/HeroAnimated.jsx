import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import AnimatedCounter from './AnimatedCounter';
import SearchBar from './SearchBar';

const HeroAnimated = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <AnimatedSection delay={0.2}>
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="h-4 w-4" />
              <span>Live Reviews from TripAdvisor</span>
            </div>
          </AnimatedSection>

          {/* Main Heading */}
          <AnimatedSection delay={0.4}>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover the{' '}
              <span className="text-primary">Best of Marrakech</span>
              <br />
              Through Real Reviews
            </h1>
          </AnimatedSection>

          {/* Subtitle */}
          <AnimatedSection delay={0.6}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore authentic reviews for restaurants, riads, activities, and hidden gems in the Red City. 
              All sourced from TripAdvisor's trusted platform in one beautiful place.
            </p>
          </AnimatedSection>

          {/* Search Bar */}
          <AnimatedSection delay={0.8}>
            <SearchBar placeholder="Search for restaurants, riads, activities..." />
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={1.0}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <motion.div 
                className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center space-x-2 text-primary mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-2xl font-bold">
                    <AnimatedCounter value={500} suffix="+" />
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Places Listed</p>
              </motion.div>
              <motion.div 
                className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center space-x-2 text-accent mb-2">
                  <Star className="h-5 w-5" />
                  <span className="text-2xl font-bold">
                    <AnimatedCounter value={10000} suffix="+" />
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Reviews Aggregated</p>
              </motion.div>
              <motion.div 
                className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center space-x-2 text-secondary mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-2xl font-bold">Daily</span>
                </div>
                <p className="text-sm text-muted-foreground">Updates</p>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default HeroAnimated

