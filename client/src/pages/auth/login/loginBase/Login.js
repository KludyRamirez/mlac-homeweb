import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import osaLogo from "../../../../images/logomlac.png";
import landingPic from "../../../../images/frontpage.jpg";
import LoginInputs from "../loginComponents/LoginInputs";
import { FormTitle } from "../../../../externalComponents/sidebarBase/Sidebar";

import {
  BsFacebook,
  BsInstagram,
  BsMegaphone,
  BsTwitterX,
} from "react-icons/bs";

import { FaRegCopyright } from "react-icons/fa6";

const Login = ({ login, setLoading }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [activeSelect, setActiveSelect] = useState("Login");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const userDetails = {
      userName,
      password,
    };

    try {
      setLoading(true);
      await login(userDetails, navigate);
      setUserName("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      setUserName("");
      setPassword("");
      setLoading(false);
    }
  };

  const handleActiveChange = (option) => {
    setActiveSelect(option);
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full flex flex-col gap-[80px]">
        <div className="w-full fixed px-16 zIndex-3">
          <div className="h-[160px] flex justify-between items-center gap-10 relative">
            <div className="absolute flex gap-6 text-[white] left-[200px] cursor-pointer">
              <Link to="https://facebook.com">
                <BsFacebook className="text-[24px] cursor-pointer" />
              </Link>
              <Link to="https://twitter.com">
                <BsTwitterX className="text-[24px] cursor-pointer" />
              </Link>
              <Link to="https://instagram.com">
                <BsInstagram className="text-[24px] cursor-pointer" />
              </Link>
            </div>
            <div className="absolute flex gap-4 text-[white] left-[650px] cursor-pointer items-center">
              <span className="hover:underline">FAQ</span>
              <span className="hover:underline">Terms and Conditions</span>
              <span className="hover:underline">Privacy Policy</span>
            </div>
            <div className="flex justify-center items-center gap-10">
              <div className="flex items-center gap-6">
                <img src={osaLogo} alt="" className="w-[46px] h-[46px]" />
                <FormTitle
                  sx={{
                    lineHeight: "134px",
                    fontSize: "24px",
                    backgroundImage:
                      "radial-gradient(100% 100% at 100% 0, #ffffff 0, #efefef 100%)",
                  }}
                >
                  MLAC
                </FormTitle>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div
                className="flex items-center gap-2 text-base text-[#355E3B] cursor-pointer px-5 py-2 rounded-[50px] border-[1px] border-[#355E3B] hover:bg-[#355E3B] hover:text-white"
                onClick={() => handleActiveChange("Login")}
              >
                <span>Announcements</span>
                <BsMegaphone />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-screen flex justify-center items-start">
          <div className={`relative h-screen w-[60%]`}>
            <div className="h-screen">
              <img
                src={landingPic}
                alt=""
                className="w-[100%] h-[100%] object-cover transform scale-x-[-1]"
              />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_25%,rgba(0,0,0,0.2))]"></div>
            <div className="absolute inset-0 bg-black opacity-75"></div>
            <div className="absolute top-0 left-0 w-[100%] h-[100%] flex flex-col justify-center zIndex-2 px-12">
              <FormTitle
                sx={{
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #ffffff 0, #efefef 100%)",
                  textShadow: "0px 0px 4px rgba(31, 81, 255, 0.2)",
                  fontSize: "120px",
                  lineHeight: "134px",
                }}
              >
                Slotting
              </FormTitle>
              <FormTitle
                sx={{
                  marginTop: "-15px",
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #1F51FF 0, #ffffff 100%)",
                  fontSize: "120px",
                  lineHeight: "134px",
                }}
              >
                You
              </FormTitle>
              <FormTitle
                sx={{
                  marginTop: "-15px",
                  textShadow: "0px 0px 4px rgba(31, 81, 255, 0.2)",
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #355E3B 0, #1F51FF 100%)",
                  fontSize: "120px",
                  lineHeight: "134px",
                }}
              >
                Flexibly.
              </FormTitle>
            </div>

            <div className="absolute top-[636px] left-[190px] transform rotate-[0deg] zIndex-2">
              <FormTitle
                sx={{
                  marginTop: "-15px",
                  textShadow: "0px 0px 4px rgba(31, 81, 255, 0.2)",
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #ffffff 0, #efefef 100%)",
                  fontSize: "120px",
                  lineHeight: "134px",
                }}
              >
                Securely.
              </FormTitle>
            </div>
            <div className="absolute top-[722px] left-[350px] transform rotate-[0deg] zIndex-2">
              <FormTitle
                sx={{
                  marginTop: "-15px",
                  textShadow: "0px 0px 4px rgba(31, 81, 255, 0.2)",
                  backgroundImage:
                    "radial-gradient(100% 100% at 100% 0, #ffffff 0, #1F51FF 100%)",
                  fontSize: "120px",
                  lineHeight: "134px",
                }}
              >
                Dynamically.
              </FormTitle>
            </div>

            <div className="absolute top-[160px] right-[-16px] w-[30px] h-[30px] transform rotate-[45deg] bg-white"></div>
            <div className="absolute top-[196px] right-[-12px] w-[20px] h-[20px] transform rotate-[45deg] bg-white"></div>
            <div className="absolute top-[886px] right-[-12px] w-[20px] h-[20px] transform rotate-[45deg] bg-white"></div>

            <div className="absolute flex items-center gap-4 bottom-[40px] left-[60px] zIndex-3 text-white">
              <FaRegCopyright className="text-[18px]" />
              <span>Copyright 2024 Kludy Ramirez. All Rights Reserved.</span>
            </div>
          </div>
          <div className="relative flex justify-center items-center w-[40%] h-screen">
            <div className="p-8 gap-8 w-[500px] h-[100%] flex flex-col justify-center rounded-[8px]">
              {activeSelect === "Login" && (
                <>
                  <div className="w-100 flex justify-start items-center text-3xl font-semibold text-[#355E3B] zIndex-3">
                    <span>Sign in</span>
                  </div>
                  <div className="zIndex-3">
                    <LoginInputs
                      userName={userName}
                      setUserName={setUserName}
                      password={password}
                      setPassword={setPassword}
                      handleLogin={handleLogin}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Login);
