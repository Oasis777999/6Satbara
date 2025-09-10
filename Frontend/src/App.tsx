import NavbarC from "./Components/NavbarC";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import ProjectPage from "./Components/ProjectPage";
import Data from "./Components/Data";
import PropertyList from "./Components/Property/PropertyList";
import PropertyDetails from "./Components/Property/PropertyDetails";
import FlatList from "./Components/Flat/FlatList";
import FlatDetails from "./Components/Flat/FlatDetails";
import Services from "./Components/Services";
import FlatForm from "./Components/Flat/FlatForm";
import PropertyForm from "./Components/Property/PropertyForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarC />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contactus" element={<Contact />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/property" element={<Services />} />
          <Route path="/data" element={<Data />}></Route>
          <Route path="/:selectedType" element={<PropertyList />}></Route>
          <Route path="/property/:id" element={<PropertyDetails />}></Route>

          <Route path="/addflat" element={<FlatForm />}></Route>
          <Route path="/addproperty" element={<PropertyForm />}></Route>

          <Route path="/flat" element={<FlatList />}></Route>
          <Route path="/flat/:id" element={<FlatDetails />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
