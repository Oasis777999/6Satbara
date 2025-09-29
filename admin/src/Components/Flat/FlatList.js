import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const FlatList = () => {
  const [flats, setFlats] = useState([]);
  const [filterdData, setFilterdData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const getFlats = async () => {
    try {
      const result = await api.get("/flat/list"); // Adjust this to your actual endpoint
      setFlats(result.data.data);
      setFilterdData(result.data.data);
    } catch (error) {
      console.error("Failed to fetch flat list:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = flats.filter((row) =>
      Object.values(row).some((cell) =>
        cell?.toString().toLowerCase().includes(value)
      )
    );

    setFilterdData(filtered);
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
      console.error("Failed to update status:",  error);
      alert("Error updating status");
    }
  };

  const togglePremium = async (flatId, newStatus) => {
    console.log(newStatus);

    try {
      const res = await api.put(`/flat/update/${flatId}`, {
        isPremium: newStatus,
      });
      if (res.status === 200) {
        alert("Premium status updated");
        getFlats();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating status");
    }
  };

  useEffect(() => {
    getFlats();
  }, []);

  return (
    <div className="p-4">
      <div className="row sticky-top bg-white align-items-center py-4">
        <h2>Flat List</h2>
        <div className="col-md-6 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by socity, city, etc..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
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
              <th>Primium Property</th>
              <th>Owner Name</th>
              <th>Owner Contact</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filterdData.map((flat, index) => (
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
                <td>
                  <select
                    className={`form-select form-select-sm ${
                      flat.isPremium ? "text-success" : "text-warning"
                    }`}
                    value={flat.isPremium ? "Yes" : "No"}
                    onChange={(e) =>
                      togglePremium(flat._id, e.target.value === "Yes")
                    }
                    style={{
                      width: "auto",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Yes" className="text-success">
                      Yes
                    </option>
                    <option value="No" className="text-warning">
                      No
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
