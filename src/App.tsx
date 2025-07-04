import './App.css'
import Connect from "./components/Connect/Connect"
import Footer from "./components/Footer/Footer"
import Hero from "./components/Hero/Hero"
import Navbar from "./components/Navbar/Navbar"
import Profile from "./components/Profile/Profile"

function App () {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <Hero />
        <Connect />
        <Profile />
        <Footer />
      </div>
      
      <div className="mobile-message">
        <div>
          <h2>🖥️ Desktop Only</h2>
          <p>This portfolio is currently optimized for desktop viewing only.</p>
          <p>Please visit on a larger screen for the best experience.</p>
        </div>
      </div>
    </>
  )
}
export default App