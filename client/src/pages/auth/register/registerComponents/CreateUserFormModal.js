import React from "react";
import { BsChevronBarDown, BsX } from "react-icons/bs";
import { FaPlus, FaUserSecret } from "react-icons/fa6";

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
        <div className="w-[100%] mt-[-40px] w-[100%] px-8 py-6 font-semibold flex justify-between items-center rounded-tl-[12px] rounded-tr-[12px] bg-gradient-to-r from-[#2d333b] to-[#22272e]">
          <div className="text-[#ffffff] text-[24px] flex gap-4 items-center">
            <span>Add User</span>
            <FaUserSecret />
          </div>
          <BsX
            onClick={handleCloseModal}
            className="text-[#c5d1de] text-[34px] cursor-pointer"
          />
        </div>
        <div className="p-10">
          <div className="flex gap-2 text-[#c5d1de]">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="text-[#c5d1de]">Username</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <input
                  required
                  name="userName"
                  value={userName}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Ramirez"
                  className={`border-[1px] w-[100%] px-4 py-3 bg-transparent rounded-[8px] ${
                    userNameError === ""
                      ? "border-[#22272e] focus:border-[#c5d1de]"
                      : "border-[#ff3131]"
                  } focus:outline-none`}
                />
              </div>
              {userNameError && (
                <p className="text-[#ff3131]">{userNameError}</p>
              )}
            </div>
          </div>

          <div className="text-[#c5d1de] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">First Name</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <input
                  required
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Ramirez"
                  className={`border-[1px] w-[100%] px-4 py-3 bg-transparent rounded-[8px] ${
                    firstNameError === ""
                      ? "border-[#22272e] focus:border-[#c5d1de]"
                      : "border-[#ff3131]"
                  } focus:outline-none`}
                />
              </div>
              {firstNameError && (
                <p className="text-[#ff3131] ">{firstNameError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Surname</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <input
                  required
                  name="surName"
                  value={surName}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Ramirez"
                  className={`border-[1px]  w-[100%] px-4 py-3 bg-transparent rounded-[8px] ${
                    surNameError === ""
                      ? "border-[#22272e] focus:border-[#c5d1de]"
                      : "border-[#ff3131]"
                  } focus:outline-none`}
                />
              </div>
              {surNameError && (
                <p className="text-[#ff3131] ">{surNameError}</p>
              )}
            </div>
          </div>

          <div className="text-[#c5d1de] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Email</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <input
                  required
                  name="email"
                  value={email}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  placeholder="example@domain.com"
                  className={`border-[1px] w-[100%] px-4 py-3 bg-transparent rounded-[8px] ${
                    emailError === ""
                      ? "border-[#22272e] focus:border-[#c5d1de]"
                      : "border-[#ff3131]"
                  } focus:outline-none`}
                />
              </div>
              {emailError && <p className="text-[#ff3131]">{emailError}</p>}
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Password</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <input
                  required
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                  autoComplete="off"
                  placeholder="admin123"
                  className={`border-[1px] w-[100%] px-4 py-3 bg-transparent rounded-[8px] ${
                    passwordError === ""
                      ? "border-[#22272e] focus:border-[#c5d1de]"
                      : "border-[#ff3131]"
                  } focus:outline-none`}
                />
              </div>
              {passwordError && (
                <p className="text-[#ff3131]">{passwordError}</p>
              )}
            </div>
          </div>

          <div className="text-[#c5d1de] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex gap-2 items-center">
                <span className="">Role</span>
                <BsChevronBarDown />
              </div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <select
                  name="role"
                  value={role}
                  onChange={handleChange}
                  className="border-[1px] border-[#22272e] w-[100%] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                >
                  <option value="">Select Role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Contact No.</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <input
                  required
                  name="contactNo"
                  value={contactNo?.replace(/[^0-9+]/g, "")}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  placeholder="admin123"
                  className={`border-[1px] w-[100%] px-4 py-3 bg-transparent rounded-[8px] ${
                    contactNoError === ""
                      ? "border-[#22272e] focus:border-[#c5d1de]"
                      : "border-[#ff3131]"
                  } focus:outline-none`}
                />
              </div>
              {contactNoError && (
                <p className="text-[#ff3131]">{contactNoError}</p>
              )}
            </div>
          </div>

          <div className="w-[100%] pt-11 flex items-center">
            {userNameError === "" &&
            firstNameError === "" &&
            surNameError === "" &&
            emailError === "" &&
            passwordError === "" &&
            role !== "" ? (
              <button
                type="submit"
                className="w-[100%] font-bold cursor-pointer p-3 bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[6px]"
              >
                <FaPlus />
                <div>Add User</div>
              </button>
            ) : (
              <button
                disabled
                className="w-[100%] font-bold cursor-pointer p-3 bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[6px]"
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
