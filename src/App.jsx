import Header from './components/Header'
import HeroAnimated from './components/HeroAnimated'
import Categories from './components/Categories'
import FeaturedPlaces from './components/FeaturedPlaces'
import ReviewOfTheDay from './components/ReviewOfTheDay'
import Footer from './components/Footer'
import AnimatedSection from './components/AnimatedSection'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroAnimated />
        <AnimatedSection>
          <Categories />
        </AnimatedSection>
        <AnimatedSection>
          <FeaturedPlaces />
        </AnimatedSection>
        <AnimatedSection>
          <ReviewOfTheDay />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  )
}

export default App
