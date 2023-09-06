import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUserPage = () => {
  const [formData, setFormData] = useState({
    lastname: "",
    username: "",
    password: "",
  });

  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/user/${id}`,
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Update Profile</h1>
      <div>
        <label>lastname:</label>
        <input
          type="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default UpdateUserPage;
