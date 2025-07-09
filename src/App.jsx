import Header from './components/Header';
import HeroAnimated from './components/HeroAnimated';
import FeaturedPlacesAPI from './components/FeaturedPlacesAPI';
import CategoriesAPI from './components/CategoriesAPI';
import ReviewOfTheDayAPI from './components/ReviewOfTheDayAPI';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroAnimated />
        <CategoriesAPI />
        <FeaturedPlacesAPI />
        <ReviewOfTheDayAPI />
      </main>
      <Footer />
    </div>
  );
}

export default App;

