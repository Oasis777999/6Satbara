import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const getProperties = async () => {
    try {
      const result = await api.get("/property/list");
      setProperties(result.data.data);
    } catch (error) {
      console.error("Failed to fetch property list:", error);
    }
  };

  const DeleteProperty = async (id) => {
    try {
      const result = await api.delete(`/property/delete/${id}`);

      if (result.status === 200 || result.status === 204) {
        alert(result.data?.message || "Property deleted successfully.");
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error.response?.data?.message || "Failed to delete property.");
    }
  };

  const toggleVerification = async (userId, newStatus) => {
    try {
      const res = await api.put(`/property/update/${userId}`, {
        verified: newStatus,
      });

      if (res.status === 200) {
        alert("Verification status updated");
        // Refresh list after update
        getProperties(); // You already have this in your code
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating status");
    }
  };

  useEffect(() => {
    getProperties();
  }, [properties]);

  return (
    <div className="p-4">
      <h2>Property List</h2>
      <div className="table-responsive mt-3">
        <table className="table border table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Sr.No</th>  
              <th>Property Type</th>
              <th>Society</th>
              <th>Min. Size (Sq.Ft.)</th>
              <th>Max. Size (Sq.Ft.) (ft)</th>
              <th>Price  Per Sq.Ft.</th>
              <th>City</th>
              <th>Verification Status</th>
              <th>Owner Name</th>
              <th>Owner Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.propertyType}</td>
                <td>{item.socity}</td>
                <td>{item.minSize}</td>
                <td>{item.maxSize}</td>
                <td>{item.price}</td>
                <td>{item.city}</td>
                <td>
                  <select
                    className={`form-select form-select-sm ${
                      item.verified ? "text-success" : "text-warning"
                    }`}
                    value={item.verified ? "Verified" : "Pending"}
                    onChange={(e) =>
                      toggleVerification(
                        item._id,
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
                <td>{item.user?.name} </td>
                <td>{item.user?.phone}</td>

                <td>
                  <button
                    className="btn btn-info text-white m-1"
                    onClick={() => navigate(`/update/${item._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger text-white m-1"
                    onClick={() => DeleteProperty(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success text-white m-1"
                    onClick={() => navigate(`/view/${item._id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyList;
