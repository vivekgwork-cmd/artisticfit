import { Bestsellers, ElementCards, Faq, Hero, ShopByElement, SplitBanner, StudioNotes, WhyUs } from '../components/Sections.jsx';
import TrustBar from '../components/TrustBar.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="wrap"><TrustBar /></div>
      <Bestsellers />
      <SplitBanner
        left="03_water_front.jpg"
        right="04_water_back.jpg"
        caption="Element 02 — Water"
        title={<>The wave,<br />worn on your back.</>}
        ctas={[['Shop Water', '/p/water']]}
      />
      <ShopByElement />
      <WhyUs />
      <SplitBanner
        tone="soil"
        fit="art"
        left="/panels/soil.jpg"
        right="/panels/trees.jpg"
        caption="Elements 03 & 04 — Soil and Trees"
        title={<>Rooted in the earth.<br />Worn on your back.</>}
        ctas={[['Shop Soil', '/p/soil'], ['Shop Trees', '/p/trees']]}
      />
      <ElementCards />
      <StudioNotes />
      <Faq />
    </>
  );
}
