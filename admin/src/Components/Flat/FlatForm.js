import React, { useState } from "react";
import api from "../../api/api";

const FlatForm = () => {
  const [formData, setFormData] = useState({
    socity: "",
    apartmentName: "",
    flatNumber: "",
    floor: "",
    totalFloors: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    furnishing: "",
    carpetArea: "",
    builtupArea: "",
    possession: "",
    facing: "",
    price: "",
    isNegociable: false,
    maintenanceCost: "",
    gatedSocity: false,
    parking: "",
    reraStatus: false,
    reraNumber: "",
    address: "",
    state: "",
    district: "",
    taluka: "",
    city: "",
    pincode: "",
    about: "",
    images: [],
  });

  console.log(formData.possession);
  

  const [user, setUser] = useState({
    name: "",
    phone: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;    

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flatData = {
      ...formData,
      images,
      user: {
        name: user.name,
        phone: user.phone,
      },
    };

    console.log(flatData.breadth);

    try {
      const res = await api.post("/flat/add", flatData);
      console.log(res);

      alert("Flat added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add flat property");
    }
  };

  const convertToBase64Images = (e) => {
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
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Add New Flat Property</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
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

          {/* Flat Details */}
          {[
            ["socity", "Society", "text"],
            ["apartmentName", "Apartment Name", "text"],
            ["flatNumber", "Flat Number", "text"],
            ["floor", "Floor", "number"],
            ["totalFloors", "Total Floors", "number"],
            ["bedrooms", "Bedrooms", "number"],
            ["bathrooms", "Bathrooms", "number"],
            ["balconies", "Balconies", "number"],
            ["carpetArea", "Carpet Area (Sq. Ft)", "number"],
            ["builtupArea", "Built Up Area (Sq. Ft)", "number"],
            ["possession", "Possession Date", "date"],
            ["price", "Price (in Lacs)", "number"],
            ["maintenanceCost", "Maintenance Cost", "number"],
            ["address", "Address", "text"],
            ["state", "State", "text"],
            ["district", "District", "text"],
            ["taluka", "Taluka", "text"],
            ["city", "City", "text"],
            ["pincode", "Pincode", "number"],
            ["about", "About", "text"],
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
                required={["socity", "apartmentName", "price"].includes(name)}
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

          {/* Furnishing */}
          <div className="col-md-6">
            <label className="form-label">Furnishing</label>
            <select
              className="form-select"
              name="furnishing"
              value={formData.furnishing}
              onChange={handleChange}
            >
              <option value="">Select Furnishing</option>
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          {/* Parking */}
          <div className="col-md-6">
            <label className="form-label">Parking</label>
            <select
              className="form-select"
              name="parking"
              value={formData.parking}
              onChange={handleChange}
            >
              <option value="">Select Parking</option>
              <option value="None">None</option>
              <option value="1 Car">1 Car</option>
              <option value="2 Car">2 Car</option>
              <option value="Bike">Bike</option>
            </select>
          </div>

          {/* Boolean Dropdowns */}
          {[
            ["gatedSocity", "Gated Society"],
            ["isNegociable", "Price Negotiable"],
            ["reraStatus", "Rera Status"],
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

          {/* Rera Number */}
          <div className="col-md-6">
            <label className="form-label">Rera Number</label>
            <input
              type="text"
              name="reraNumber"
              className="form-control"
              value={formData.reraNumber}
              onChange={handleChange}
            />
          </div>

          {/* Images */}
          <div className="col-md-6">
            <label className="form-label">Flat Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={convertToBase64Images}
              className="form-control"
            />
            <p className="text-danger font-sm">
              Image size must be less than 200 KB
            </p>
            {images.length > 0 && (
              <div className="mt-3 d-flex flex-wrap gap-2">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Flat ${idx}`}
                    width={100}
                    height={100}
                    className="border rounded shadow-sm"
                    style={{ objectFit: "cover" }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success mt-3 px-4">
              Submit Flat
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlatForm;
