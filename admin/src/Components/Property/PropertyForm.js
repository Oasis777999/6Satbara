import React, { useState } from "react";
import api from "../../api/api";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    propertyType: "",
    socity: "",
    minSize: "",
    maxSize: "",
    price: "",
    isNegociable: false,
    address: "",
    state: "",
    district: "",
    taluka: "",
    city: "",
    pincode: "",
    mapLocation:"",
    facing: "",
    cornerProperty: false,
    gatedSocity: false,
    openSide: "",
    description: "",
    images: [],
  });

  const [user, setUser] = useState({
    name: "",
    phone: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeUser = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = {
      ...formData,
      images,
      user: {
        name: user.name,
        phone: user.phone,
      },
    };

    console.log(propertyData);

    try {
      const res = await api.post("/property/add", propertyData);
      if (res.status === 201) {
        alert(res.data.message || "Property added successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save property");
    }
  };

  function convertToBase64Images(e) {
    const files = Array.from(e.target.files);
    const maxSize = 1000 * 1024;

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        if (file.size > maxSize) {
          reject(`${file.name} exceeds 200kb`);
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises)
      .then((base64Images) => {
        setImages((prevImages) => [...prevImages, ...base64Images]);
      })
      .catch((error) => {
        alert(error);
        setImages([]);
      });
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Add New Property</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Property Type</label>
              <select
                className="form-select"
                name="propertyType" // <-- Correct: this should be the key in your formData object
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>
          </div>

          {/* User Details */}
          {[
            ["name", "Owner Name", "text"],
            ["phone", "Phone", "number"],
          ].map(([name, label, type]) => (
            <div className="col-md-6" key={name}>
              <label htmlFor={name} className="form-label">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                className="form-control"
                value={user[name]}
                onChange={handleChangeUser}
              />
            </div>
          ))}

          <hr/>

          {/* Text Fields */}
          {[
            ["socity", "Society", "text"],
            ["minSize", "Min. Size (Sq.Ft.)", "number"],
            ["maxSize", "Max. Size (Sq.Ft.)", "number"],
            ["price", "Price (per Sq. Ft.)", "number"],
            ["address", "Address", "text"],
            ["state", "State", "text"],
            ["district", "District", "text"],
            ["taluka", "Taluka", "text"],
            ["city", "City", "text"],
            ["pincode", "Pincode", "number"],
            ["mapLocation", "Google Map Location", "text"],
            ["openSide", "Open Sides", "number"],
            ["description", "Description About Property", "text"],
          ].map(([name, label, type]) => (
            <div className="col-md-6" key={name}>
              <label htmlFor={name} className="form-label">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                className="form-control"
                value={formData[name]}
                onChange={handleChange}
                required={["socity", "price"].includes(name)}
              />
            </div>
          ))}

          {/* Facing Dropdown */}
          <div className="col-md-6">
            <label className="form-label">Facing</label>
            <select
              className="form-select"
              name="facing"
              value={formData.facing}
              onChange={handleChange}
              required
            >
              <option value="">Select Facing</option>
              {[
                "East",
                "West",
                "North",
                "South",
                "North-East",
                "North-West",
                "South-East",
                "South-West",
              ].map((dir) => (
                <option key={dir} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
          </div>

          {/* Boolean Dropdowns */}
          {[
            ["cornerProperty", "Corner Property"],
            ["gatedSocity", "Gated Society"],
            ["isNegociable", "Price Negociable"],
          ].map(([name, label]) => (
            <div className="col-md-4" key={name}>
              <label className="form-label">{label}</label>
              <select
                className="form-select"
                name={name}
                value={formData[name] ? "Yes" : "No"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [name]: e.target.value === "Yes",
                  })
                }
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          ))}

          {/* Images Section */}
          <div className="col-md-6">
            <label className="form-label">Property Images</label>
            <input
              type="file"
              accept="images/*"
              multiple
              onChange={convertToBase64Images}
            />
            {images?.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Photo ${index}`}
                    className="rounded shadow-sm border"
                    height={100}
                    width={100}
                    style={{ objectFit: "cover" }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary mt-3 px-4">
              Submit Property
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
