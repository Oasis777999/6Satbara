import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let [formData, setFormData] = useState({
    socity: "",
    minSize: "",
    maxSize: "",
    price: "",
    address: "",
    state: "",
    district: "",
    taluka: "",
    city: "",
    pincode: "",
    facing: "",
    isNegociable: false,
    cornerProperty: false,
    gatedSocity: false,
    openSide: "",
    reraStatus: false,
    reraNumber: "",
    description: "",
    images: [],
  });

  let [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/property/single/${id}`);

        if (res.data) {
          setFormData({
            ...res.data,
            cornerProperty: !!res.data.cornerProperty,
            gatedSocity: !!res.data.gatedSocity,
            reraStatus: !!res.data.reraStatus,
          });
        }
      } catch (err) {
        console.error("Failed to load property:", err);
        alert("Failed to load property data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function convertToBase64Images(e) {
    const files = Array.from(e.target.files);
    const maxSize = 200 * 1024;

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        if (file.size > maxSize) {
          reject(`${file.name} exceeds 200 KB`);
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

  // Remove images from new images array
  const removeFromImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveImage = async (indexToRemove) => {
    const imageToDelete = formData.images[indexToRemove];

    if (!imageToDelete) {
      alert("No image found at this index.");
      return;
    }

    try {
      const res = await api.patch(`/property/delete-image/${id}`, {
        imageToDelete,
      });

      console.log(res);
      

      if (res.data && res.data.data.images) {
        setFormData((prev) => ({
          ...prev,
          images: res.data.images,
        }));
        alert("Image removed successfully");
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to remove image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData = {
      ...formData,
      images: [...formData.images, ...images],
    };

    try {
      await api.put(`/property/update/${id}`, formData);
      alert("Property updated successfully!");
      navigate("/propertylist");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update property");
    }
  };

  if (loading) return <p>Loading property data...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit Property</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {[
            ["socity", "Society"],
            ["minSize", "Min. Size (Sq.Ft.)"],
            ["maxSize", "Max Size (Sq.Ft.)"],
            ["price", "Price (Per Sq.Ft.)"],
            ["address", "Address"],
            ["state", "State"],
            ["district", "District"],
            ["taluka", "Taluka"],
            ["city", "City"],
            ["pincode", "Pincode"],
            ["openSide", "Open Sides"],
            ["description", "Description About Property"],
          ].map(([name, label]) => (
            <div className="col-md-6" key={name}>
              <label className="form-label">{label}</label>
              <input
                type={
                  [
                    "price",
                    "openSide",
                    "minSize",
                    "maxSize",
                    "pincode",
                  ].includes(name)
                    ? "number"
                    : "text"
                }
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="form-control"
                required={name === "socity" || name === "price"}
              />
            </div>
          ))}

          <div className="col-md-6">
            <label className="form-label">Facing</label>
            <select
              className="form-select"
              name="facing"
              value={formData.facing || ""}
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

          <div className="col-md-12">
            <label className="form-label d-block">Property Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={convertToBase64Images}
              className="form-control"
            />
            <p className="text-danger h6">
              Image size must be less than 200 kb
            </p>

            <div className="row mt-4">
              {/* Uploaded Images */}
              <div className="col-md-6">
                <h5>Uploaded Images</h5>
                {formData.images?.length > 0 && (
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {formData.images.map((img, index) => (
                      <div
                        key={index}
                        className="position-relative border rounded shadow-sm me-2 mb-2"
                        style={{ width: 100, height: 100, overflow: "hidden" }}
                      >
                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="position-absolute top-0 end-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center shadow"
                          style={{
                            width: "20px",
                            height: "20px",
                            fontSize: "12px",
                            cursor: "pointer",
                            zIndex: 2,
                          }}
                        >
                          ×
                        </button>

                        {/* Image */}
                        <img
                          src={img}
                          alt={`Uploaded ${index}`}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            borderRadius: "0.25rem",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Newly Added Images */}
              <div className="col-md-6">
                <h5>Newly Added Images</h5>
                <div className="d-flex flex-wrap gap-2">
                  {images?.map((img, index) => (
                    <div
                      key={index}
                      className="position-relative border rounded shadow-sm me-2 mb-2"
                      style={{ width: 100, height: 100, overflow: "hidden" }}
                    >
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => removeFromImage(img._id)}
                        className="position-absolute top-0 end-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center shadow"
                        style={{
                          width: "20px",
                          height: "20px",
                          fontSize: "12px",
                          cursor: "pointer",
                          zIndex: 2,
                        }}
                      >
                        ×
                      </button>

                      {/* Image */}
                      <img
                        src={img}
                        alt={`New ${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success mt-3">
              Update Property
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
