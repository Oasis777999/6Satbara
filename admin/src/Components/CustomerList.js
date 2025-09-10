import React, { useEffect, useState } from 'react';
import api from '../api/api';

const CustomerList = () => {
  const [users, setUsers] = useState([]);

  const getUserData = async () => {
    try {
      const result = await api.get("/user/list");
      setUsers(result.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="px-3 py-4 px-md-4">
      <h2 className="h4 mb-4">User List</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="thead-dark">
            <tr>
              <th>Sr. No</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td className="text-nowrap">
                  {item.firstName} {item.lastName}
                </td>
                <td className="text-nowrap">{item.email}</td>
                <td className="text-nowrap">{item.phone}</td>
                <td className="text-nowrap">{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
