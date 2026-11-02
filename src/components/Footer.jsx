export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot">
        <span>© {new Date().getFullYear()} Artistic Fit. Wearable art, tailored to you.</span>
        <ul className="socials">
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Pinterest</a></li>
          <li><a href="mailto:hello@artisticfit.com">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
