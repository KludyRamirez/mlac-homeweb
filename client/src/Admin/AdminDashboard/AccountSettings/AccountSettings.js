import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";
import { createSelector } from "reselect";
import TopBar from "../AppBar/AppBar";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",

  "@media (max-width: 767px)": {
    overflow: "hidden",
    overflowX: "scroll",
    overflowY: "scroll",
    justifyContent: "flex-start",
  },
});

const AccountSettingsCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "transparent",
  width: "100%",
  height: "100%",
  zIndex: "2",
  "@media (max-width: 767px)": {
    padding: "10px",
    marginTop: "10px",
    alignItems: "flex-start",
    overflow: "hidden",
  },
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});

const FormTitle = styled("div")({
  padding: "34px 0px 20px 38px",
  fontSize: "16px",
  fontWeight: "500",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  textShadow: "none",

  "@media (max-width: 767px)": {
    fontSize: "48px",
  },
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const AccountSettings = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const auth = useSelector(authSelector);

  useEffect(() => {
    fetchCurrentUser();
  }, [auth]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/currentUser`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      setCurrentUser(response.data.userDetails);
    } catch (error) {
      console.error("Error fetching current user:", error);
      // Handle error state or notification to the user
    }
  };

  return (
    <Wrapper>
      <TopBar />
      <ResponsiveDrawer />
      <AccountSettingsCon>
        <TitleCon>
          <FormTitle>
            {"<"} Settings <span style={{ fontSize: "12px" }}>/</span>{" "}
          </FormTitle>
          <FormTitle sx={{ paddingLeft: "6px", paddingRight: "0" }}>
            Account
          </FormTitle>
        </TitleCon>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              width: "1200px",
              height: "800px",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "200px",
                border: "1px solid rgba(7, 187, 255, 0.6)",
                borderRadius: "12px",
              }}
            ></div>
            <div
              style={{
                width: "600px",
                height: "600px",
                border: "1px solid rgba(7, 187, 255, 0.6)",
                borderRadius: "12px",
              }}
            ></div>
          </div>
        </div>
      </AccountSettingsCon>
    </Wrapper>
  );
};

export default AccountSettings;
