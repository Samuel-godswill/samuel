import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
        <p className="footer-container">
  &copy; {new Date().getFullYear()} Ugbem Samuel Godswill{" "}
  <span className="heart">♥</span> omoòga.
</p>
    </div>
  )
}

export default Footer