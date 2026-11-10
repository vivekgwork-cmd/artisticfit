import SignupForm from './SignupForm.jsx';

export default function Footer() {
  return (
    <footer className="footer" id="notify">
      <div className="wrap footer-top">
        <div className="footer-signup">
          <h2>Be first in line for Collection 01.</h2>
          <p>Early access, studio notes and the drop date — straight to your inbox.</p>
          <SignupForm cta="Notify me" />
        </div>
        <div className="footer-cols">
          <div>
            <h3>Shop</h3>
            <ul>
              <li><a href="#new">New Arrivals</a></li>
              <li><a href="#element-fire">Fire</a></li>
              <li><a href="#element-water">Water</a></li>
              <li><a href="#element-soil">Soil</a></li>
              <li><a href="#element-trees">Trees</a></li>
              <li><a href="#element-air">Air</a></li>
            </ul>
          </div>
          <div>
            <h3>Studio</h3>
            <ul>
              <li><a href="#story">Our story</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Pinterest</a></li>
              <li><a href="mailto:hello@artisticfit.com">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap footer-base">
        <img src="/logo-paper.png" alt="Artistic Fit" width="676" height="203" />
        <span>© {new Date().getFullYear()} Artistic Fit. Wearable art, tailored to you.</span>
      </div>
    </footer>
  );
}
