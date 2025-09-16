// App.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import CustomerList from "./Components/CustomerList";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";

import PropertyList from "./Components/Property/PropertyList";
import PropertyForm from "./Components/Property/PropertyForm";
import UpdateProperty from "./Components/Property/UpdateProperty";
import PropertyDetails from "./Components/Property/PropertyDetails";

import FlatForm from "./Components/Flat/FlatForm";
import FlatList from "./Components/Flat/FlatList";
import UpdateFlat from "./Components/Flat/UpdateFlat";
import FlatDetails from "./Components/Flat/FlatDetails";
import Inquiry from "./Components/InquiryList";
import InquiryTable from "./Components/InquiryTable";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <BrowserRouter>
      {user ? (
        <div className="container-fluid">
          <div className="row flex-nowrap">
            {/* Sidebar */}
            <div
              className={`bg-light border-end col-md-3 col-lg-2 sidebar ${
                showSidebar ? "d-block" : "d-none d-md-block"
              }`}
              style={{
                position: "fixed",
                zIndex: 1040,
                height: "100vh",
                left: 0,
                top: 0,
              }}
            >
              <Sidebar
                onClose={() => setShowSidebar(false)}
                setUser={setUser}
              />
            </div>

            {/* Main Content */}
            <div
              className="col py-3 offset-md-3 offset-lg-2"
              style={{ minHeight: "100vh" }}
            >
              {/* Toggle Button for mobile */}
              <button
                className="btn btn-outline-secondary d-md-none mb-3"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                ☰ Menu
              </button>

              <Routes>
                <Route path="/propertylist" element={<PropertyList />} />
                <Route path="/flatlist" element={<FlatList />} />
                <Route path="/customerlist" element={<CustomerList />} />
                <Route path="/addproperty" element={<PropertyForm />} />
                <Route path="/addflat" element={<FlatForm />} />
                <Route path="/update/:id" element={<UpdateProperty />} />
                <Route path="/flat/update/:id" element={<UpdateFlat />} />
                <Route path="/view/:id" element={<PropertyDetails />} />
                <Route path="/flat/view/:id" element={<FlatDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/contactlist" element={<InquiryTable />} />
                <Route path="*" element={<Navigate to="/addproperty" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
