import Connect from "./components/Connect/Connect"
import Footer from "./components/Footer/Footer"
import Hero from "./components/Hero/Hero"
import Navbar from "./components/Navbar/Navbar"
import Profile from "./components/Profile/Profile"

function App () {
  return(
    <div>
      <Navbar />
      <Hero />
      <Connect />
      <Profile />
      <Footer /> 
    </div>
  )
}
export default App