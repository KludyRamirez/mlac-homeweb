import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const initialState = {
  lastname: "",
  username: "",
  password: "",
};

const UpdateUserPage = () => {
  const [values, setValues] = useState(initialState);
  const { id } = useParams();
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    if (!auth.userDetails.token) {
      // Handle the case where the token is missing
      console.error("Authentication token not found.");
      return;
    }
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setValues({ ...values, ...res.data });
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleUpdate = async () => {
      if (!auth.userDetails.token) {
        // Handle the case where the token is missing
        console.error("Authentication token not found.");
        return;
      }
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API}/user/${id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${auth.userDetails.token}`,
            },
          }
        );

        // Provide feedback to the user (e.g., show a success message)
        console.log(res.data, "Update successful");

        // You can navigate to a different page or provide a go-back option here
      } catch (error) {
        console.error(error);
        // Provide feedback to the user (e.g., show an error message)
      }
    };

    handleUpdate();
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <div>
        <label>Lastname:</label>
        <input
          type="text"
          name="lastname"
          value={values.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>Update Profile</button>
    </div>
  );
};

export default UpdateUserPage;
