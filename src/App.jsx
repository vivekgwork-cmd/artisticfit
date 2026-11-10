import Header, { Announcement } from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { ElementCards, Hero, NewArrivals, ShopByElement, SplitBanner, StudioNotes } from './components/Sections.jsx';

export default function App() {
  return (
    <>
      <Announcement />
      <Header />
      <main>
        <Hero />
        <NewArrivals />
        <SplitBanner
          left="/products/03_water_front.jpg"
          right="/products/04_water_back.jpg"
          caption="Element 02 — Water"
          title={<>The wave,<br />worn on your back.</>}
          cta="See Water"
          href="#element-water"
        />
        <ShopByElement />
        <SplitBanner
          tone="soil"
          fit="art"
          left="/panels/soil.jpg"
          right="/panels/trees.jpg"
          caption="Elements 03 & 04 — Soil and Trees"
          title={<>Rooted in the earth.<br />Worn on your back.</>}
          cta="Get notified"
        />
        <ElementCards />
        <StudioNotes />
      </main>
      <Footer />
    </>
  );
}
