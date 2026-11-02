import { MotionConfig } from 'framer-motion';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Manifesto from './components/Manifesto.jsx';
import Collection from './components/Collection.jsx';
import Join from './components/Join.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Marquee
          items={['Wearable art', 'Tailored to you', 'Hand-finished', 'Collection 01', 'Made to move']}
        />
        <Manifesto />
        <Collection />
        <Join />
      </main>
      <Footer />
    </MotionConfig>
  );
}
