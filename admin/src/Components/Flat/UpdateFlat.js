import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api"; // Adjust path to your Axios instance

const UpdateFlat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    socity: "",
    apartmentName: "",
    flatNumber: "",
    floor: "",
    totalFloors: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    furnishing: "Unfurnished",
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
    city: "",
    taluka: "",
    district: "",
    state: "",
    pincode: "",
    about: "",
    images: [],
  });

  const [images, setImages] = useState([]); // New base64 images
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlat();
  }, [id]);

  const fetchFlat = async () => {
    try {
      const res = await api.get(`/flat/single/${id}`);
      if (res.data) {
        setFormData({
          ...res.data,
          isNegociable: !!res.data.isNegociable,
          gatedSocity: !!res.data.gatedSocity,
          reraStatus: !!res.data.reraStatus,
          possession: formatDate(res.data.possession),
        });
      }
    } catch (error) {
      console.error("Error fetching flat:", error);
      alert("Failed to load flat data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    // If already a Date object
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    // If it's a string like "2025-09-08T00:00:00.000Z"
    return date.split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const convertToBase64Images = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 1000 * 1024;

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        if (file.size > maxSize) {
          reject(`${file.name} exceeds 1000 KB`);
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

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeSavedImage = async (index) => {
    const imageToDelete = formData.images[index];

    try {
      const res = await api.patch(`/flat/delete-image/${id}`, {
        imageToDelete,
      });

      setFormData((prev) => ({
        ...prev,
        images: res.data.data.images,
      }));
      alert("Image removed successfully");
      fetchFlat();
    } catch (error) {
      console.error("Image deletion failed:", error);
      alert("Failed to remove image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      images: [...formData.images, ...images],
    };

    try {
      await api.put(`/flat/update/${id}`, finalFormData);
      alert("Flat updated successfully!");
      navigate("/flatlist");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update flat");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Update Flat</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {[
            ["socity", "Society"],
            ["apartmentName", "Apartment Name"],
            ["flatNumber", "Flat Number"],
            ["floor", "Floor"],
            ["totalFloors", "Total Floors"],
            ["bedrooms", "Bedrooms"],
            ["bathrooms", "Bathrooms"],
            ["balconies", "Balconies"],
            ["furnishing", "Furnishing"],
            ["carpetArea", "Carpet Area (Sq.Ft.)"],
            ["builtupArea", "Built Up Area (Sq.Ft.)"],
            ["facing", "Facing"],
            ["price", "Price (Lakhs)"],
            ["maintenanceCost", "Maintenance Cost"],
            ["parking", "Parking"],
            ["reraNumber", "RERA Number"],
            ["address", "Address"],
            ["city", "City"],
            ["taluka", "Taluka"],
            ["district", "District"],
            ["state", "State"],
            ["pincode", "Pincode"],
          ].map(([name, label]) => (
            <div className="col-md-6" key={name}>
              <label className="form-label">{label}</label>
              <input
                type={
                  [
                    "floor",
                    "totalFloors",
                    "bedrooms",
                    "bathroom",
                    "balconies",
                    "carpetArea",
                    "builtupArea",
                    "price",
                    "pincode",
                  ].includes(name)
                    ? "number"
                    : "text"
                }
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          ))}

          {/* About textarea */}
          <div className="col-md-12">
            <label className="form-label">About</label>
            <textarea
              name="about"
              value={formData.about || ""}
              onChange={handleChange}
              rows={3}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Possession Date</label>
            <input
              type="date"
              name="possession"
              value={formData.possession}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Booleans */}
          {[
            ["isNegociable", "Is Price Negotiable?"],
            ["gatedSocity", "Gated Society?"],
            ["reraStatus", "RERA Approved?"],
          ].map(([name, label]) => (
            <div className="col-md-4" key={name}>
              <label className="form-label">{label}</label>
              <select
                name={name}
                value={formData[name] ? "Yes" : "No"}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value === "Yes" })
                }
                className="form-select"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          ))}

          {/* Image Upload */}
          <div className="col-md-12 mt-3">
            <label className="form-label">Flat Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={convertToBase64Images}
              className="form-control"
            />
            <p className="text-danger small">Each image must be under 200 KB</p>

            <div className="row mt-3">
              {/* Saved Images */}
              <div className="col-md-6">
                <h6>Uploaded Images</h6>
                <div className="d-flex flex-wrap gap-2">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="position-relative"
                      style={{ width: 100, height: 100 }}
                    >
                      <img
                        src={img}
                        alt="Saved"
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        onClick={() => removeSavedImage(index)}
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        style={{ borderRadius: "50%" }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Images */}
              <div className="col-md-6">
                <h6>New Images</h6>
                <div className="d-flex flex-wrap gap-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="position-relative"
                      style={{ width: 100, height: 100 }}
                    >
                      <img
                        src={img}
                        alt="New"
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        style={{ borderRadius: "50%" }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary">
              Update Flat
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateFlat;
