import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/system";
import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";

import axios from "axios";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  zIndex: "1",
  backgroundColor: "#fdfdfd",
});

const EditUserContainer = styled("div")({
  flexGrow: 1,
  marginTop: "60px",
  display: "flex",
  border: "none",
  justifyContent: "center",
  alignItems: "center",
});

const CrudUserBox = styled("div")({
  width: "90%",
  height: "85%",
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
  borderRadius: "10px",
  padding: "0px",
  zIndex: "3",
  backgroundColor: "#66a3ff",
});

const Users = styled("div")({
  padding: "0px 20px 0px 20px",
  color: "#ffffff",
});

const TableContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 20px",
  gap: "5px",
  flexWrap: "wrap",
});

const PureTable = styled("table")({
  textAlign: "center",
});

const TH = styled("th")({
  height: "40px",
  width: "200px",
  textAlign: "center",
  backgroundColor: "#007bff",
  color: "white",
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
});

const TH2 = styled("th")({
  height: "40px",
  width: "50px",
  textAlign: "center",
  backgroundColor: "#007bff",
  color: "gold",
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
});

const TD = styled("td")({
  textAlign: "center",
  height: "50px",
  backgroundColor: "#f9f9f9",
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
  color: "#212427",
  fontWeight: "600",
  padding: "0px 20px",
  zIndex: "4",
});

const DeleteCon = styled("div")({
  border: "2px solid red",
  borderRadius: "50px",
  width: "30px",
  height: "30px",
  color: "red",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const EditCon = styled("div")({
  border: "2px solid gold",
  borderRadius: "50px",
  width: "30px",
  height: "30px",
  color: "gold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const Spacer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
});

const EditUser = () => {
  const [users, setUsers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/user`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const deleteUsers = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/user/${id}`);
      getUsers();
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const navigateUpdate = (id) => {
    history.push(`/user/${id}`);
  };

  return (
    <Wrapper>
      <SideBar />
      <AppBar />
      <EditUserContainer>
        <CrudUserBox>
          <Users>
            <h1>Edit Users</h1>
          </Users>
          <TableContainer>
            <PureTable>
              <thead>
                <tr style={{ paddingBottom: "10px" }}>
                  <TH2>ID</TH2>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <TD>{user.cardId.slice(-4)}</TD>
                  </tr>
                ))}
              </tbody>
            </PureTable>
            <PureTable>
              <thead>
                <tr>
                  <TH>Name (First)</TH>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <TD>{user.username}</TD>
                  </tr>
                ))}
              </tbody>
            </PureTable>
            <PureTable>
              <thead>
                <tr>
                  <TH>Name (Last)</TH>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <TD>{user.lastname}</TD>
                  </tr>
                ))}
              </tbody>
            </PureTable>
            <PureTable>
              <thead>
                <tr>
                  <TH>Role</TH>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <TD>{user.role}</TD>
                  </tr>
                ))}
              </tbody>
            </PureTable>
            <PureTable>
              <thead>
                <tr>
                  <TH>Action</TH>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <TD>
                      <Spacer>
                        <EditCon onClick={() => navigateUpdate(user._id)}>
                          <EditNoteIcon fontSize="small" />
                        </EditCon>
                        <DeleteCon onClick={() => deleteUsers(user._id)}>
                          <DeleteOutlineIcon fontSize="small" />
                        </DeleteCon>
                      </Spacer>
                    </TD>
                  </tr>
                ))}
              </tbody>
            </PureTable>
          </TableContainer>
        </CrudUserBox>
      </EditUserContainer>
    </Wrapper>
  );
};

export default EditUser;
