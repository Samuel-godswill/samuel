import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Explore from './pages/Explore';

function App () {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>

        <Footer />
      </div>

      {/* <div className="mobile-message">
        <div>
          <h2>🖥️ Desktop Only</h2>
          <p>This portfolio is currently optimized for desktop viewing only.</p>
          <p>Please visit on a larger screen for the best experience.</p>
        </div>
      </div> */}
    </BrowserRouter>
  );
}

export default App;