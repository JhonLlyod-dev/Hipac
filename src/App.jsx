import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Candidates from "./pages/Candidates";
import ElectionsInfo from "./pages/ElectionInfo";
import Donation from "./pages/Donation";
import Privacy from "./pages/Privacy";
import Articles from "./pages/Article";
import ContentSchema from "./pages/Schema";
import GetInvolved from "./pages/GetInvolved";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/elections" element={<ElectionsInfo />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/:slug" element={<Articles />} />
          <Route path="/schema" element={<ContentSchema />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;