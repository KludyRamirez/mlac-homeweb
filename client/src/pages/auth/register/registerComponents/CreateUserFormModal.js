import React from "react";
import { BsChevronBarDown, BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const CreateUserFormModal = ({
  handleChange,
  handleCreateUser,
  handleCloseModal,
  values,
  errors,
}) => {
  const {
    userName,
    firstName,
    surName,
    email,
    password,
    roles,
    role,
    contactNo,
  } = values;

  const {
    userName: userNameError,
    firstName: firstNameError,
    surName: surNameError,
    email: emailError,
    password: passwordError,
    contactNo: contactNoError,
  } = errors;

  return (
    <>
      <form onSubmit={handleCreateUser}>
        <div className="phone:w-[100%] phone:mt-[0px] phone:ml-[0px] phone:transform rotate-[0deg] w-[102%] mt-[-40px] ml-[-9px] transform rotate-[-2deg] w-[100%] px-8 py-6 text-[28px] text-[#c5d1de] font-semibold flex justify-between rounded-tl-[12px] rounded-tr-[12px] bg-gradient-to-br from-[#2d333b] to-[#22272e]">
          <span className="transform rotate-[2deg]">Create New User</span>
          <BsX
            onClick={handleCloseModal}
            className="text-[36px] cursor-pointer"
          />
        </div>
        <div className="p-10">
          <div className="text-[#c5d1de] flex gap-2 pt-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Username</div>
              <input
                required
                name="userName"
                value={userName}
                onChange={handleChange}
                type="text"
                maxLength="24"
                autoComplete="off"
                placeholder="e.g. kluds19"
                className={`border-[1px] border-[#22272e] px-4 py-3 rounded-[8px] w-[100%] bg-[transparent] ${
                  userNameError === ""
                    ? "focus:border-[#c5d1de]"
                    : "border-[red]"
                } focus:outline-none`}
              />
              {userNameError && (
                <p className="text-[#ff3131] ">{userNameError}</p>
              )}
            </div>
          </div>

          <div className="text-[#c5d1de] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">First Name</div>
              <input
                required
                name="firstName"
                value={firstName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Kludy"
                className={`border-[1px] border-[#22272e] px-4 py-3 rounded-[8px] w-[100%] bg-gradient-to-br from-[#2d333b] to-[#22272e] ${
                  firstNameError === "" ? "border-[#c5d1de]" : "border-[red]"
                } focus:outline-none`}
              />
              {firstNameError && (
                <p className="text-[#ff3131] ">{firstNameError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Surname</div>
              <input
                required
                name="surName"
                value={surName}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. Ramirez"
                className={`border-[1px] border-[#22272e] px-4 py-3 rounded-[8px] w-[100%] bg-[transparent] ${
                  surNameError === ""
                    ? "focus:border-[#c5d1de]"
                    : "border-[red]"
                } focus:outline-none`}
              />
              {surNameError && (
                <p className="text-[#ff3131] ">{surNameError}</p>
              )}
            </div>
          </div>

          <div className="text-[#c5d1de] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Email</div>
              <input
                required
                name="email"
                value={email}
                onChange={handleChange}
                type="email"
                maxLength="32"
                autoComplete="off"
                placeholder="e.g. example@gmail.com"
                className={`border-[1px] border-[#22272e] px-4 py-3 rounded-[8px] w-[100%] bg-[transparent] ${
                  emailError === "" ? "focus:border-[#c5d1de]" : "border-[red]"
                } focus:outline-none`}
              />
              {emailError && <p className="text-[#ff3131] ">{emailError}</p>}
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Password</div>
              <input
                required
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
                maxLength="32"
                autoComplete="off"
                placeholder="Enter password"
                className={`border-[1px] border-[#22272e] px-4 py-3 rounded-[8px] w-[100%] bg-gradient-to-br from-[#2d333b] to-[#22272e] ${
                  passwordError === "" ? "border-[#c5d1de]" : "border-[red]"
                } focus:outline-none`}
              />
              {passwordError && (
                <p className="text-[#ff3131] ">{passwordError}</p>
              )}
            </div>
          </div>

          <div className="text-[#c5d1de] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex gap-2 items-center">
                <span className="">Role</span>
                <BsChevronBarDown />
              </div>
              <select
                name="role"
                value={role}
                onChange={handleChange}
                className="appearance-none px-6 py-3 rounded-[10px] bg-[#22272e] focus:outline-none focus:border-[1px] focus:border-[#c5d1de]"
              >
                <option key="" value="">
                  Select Role
                </option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Contact No.</div>
              <input
                required
                name="contactNo"
                value={contactNo?.replace(/[^0-9+]/g, "")}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="e.g. 09123456789"
                maxLength="13"
                className={`px-4 py-3 rounded-[8px] w-[100%] bg-[#22272e] ${
                  contactNoError === ""
                    ? "focus:border-[1px] focus:border-[#c5d1de]"
                    : "border-[1px] border-[red]"
                } focus:outline-none`}
              />
              {contactNoError && (
                <p className="text-[#ff3131] ">{contactNoError}</p>
              )}
            </div>
          </div>

          <div className="w-100 pt-12 flex justify-end items-center">
            {userNameError === "" &&
            firstNameError === "" &&
            surNameError === "" &&
            emailError === "" &&
            passwordError === "" &&
            role !== "" ? (
              <button
                type="submit"
                className="cursor-pointer py-3 px-3 bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[10px]"
              >
                <FaPlus />
                <div>Add User</div>
              </button>
            ) : (
              <button
                disabled
                className="py-3 px-3 border-[1px] border-[#22272e] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Add User</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateUserFormModal;
