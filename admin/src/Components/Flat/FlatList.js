import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Spinner, Container } from "react-bootstrap";

const FlatList = () => {
  const [flats, setFlats] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getFlats = async () => {
    try {
      const result = await api.get("/flat/list"); // Adjust this to your actual endpoint
      setFlats(result.data.data);
    } catch (error) {
      console.error("Failed to fetch flat list:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFlat = async (id) => {
    try {
      const result = await api.delete(`/flat/delete/${id}`);
      if (result.status === 200 || result.status === 204) {
        alert(result.data?.message || "Flat deleted successfully.");
        getFlats();
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error.response?.data?.message || "Failed to delete flat.");
    }
  };

  const toggleVerification = async (flatId, newStatus) => {
    try {
      const res = await api.put(`/flat/update/${flatId}`, {
        verified: newStatus,
      });
      if (res.status === 200) {
        alert("Verification status updated");
        getFlats();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating status");
    }
  };

  useEffect(() => {
    getFlats();
  }, [flats]);

  return (
    <div className="p-4">
      <h2>Flat List</h2>
      <div className="table-responsive mt-3">
        <table className="table border table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Sr.No</th>
              <th>Society</th>
              <th>Apartment</th>
              <th>Flat No</th>
              <th>Carpet Are (in Sq.Ft.)a</th>
              <th>Built Up Area (in Sq.Ft.)</th>
              <th>Bedrooms</th>
              <th>Furnishing</th>
              <th>Price</th>
              <th>City</th>
              <th>Verification</th>
              <th>Owner Name</th>
              <th>Owner Contact</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {flats.map((flat, index) => (
              <tr key={flat._id}>
                <td>{index + 1}</td>
                <td>{flat.socity}</td>
                <td>{flat.apartmentName}</td>
                <td>{flat.flatNumber}</td>
                <td>{flat.carpetArea} </td>
                <td>{flat.builtupArea}</td>
                <td>{flat.bedrooms}</td>
                <td>{flat.furnishing}</td>
                <td>{flat.price} L</td>
                <td>{flat.city}</td>
                <td>
                  <select
                    className={`form-select form-select-sm ${
                      flat.verified ? "text-success" : "text-warning"
                    }`}
                    value={flat.verified ? "Verified" : "Pending"}
                    onChange={(e) =>
                      toggleVerification(
                        flat._id,
                        e.target.value === "Verified"
                      )
                    }
                    style={{
                      width: "auto",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Verified" className="text-success">
                      Verified
                    </option>
                    <option value="Pending" className="text-warning">
                      Pending
                    </option>
                  </select>
                </td>
                <td>{flat.user?.name}</td>
                <td>{flat.user?.phone}</td>
                <td>
                  <button
                    className="btn btn-info text-white m-1"
                    onClick={() => navigate(`/flat/update/${flat._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger text-white m-1"
                    onClick={() => deleteFlat(flat._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success text-white m-1"
                    onClick={() => navigate(`/flat/view/${flat._id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {flats.length === 0 && (
              <tr>
                <td colSpan="13" className="text-center">
                  No flats found.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlatList;
