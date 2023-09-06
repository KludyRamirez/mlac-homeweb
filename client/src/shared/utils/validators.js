export const validateLoginForm = ({ username, password }) => {
  const isUsernameValid = validateUsername(username);
  const isPasswordValid = validatePassword(password);

  return isUsernameValid && isPasswordValid;
};

export const validateRegisterForm = ({
  role,
  password,
  username,
  lastname,
}) => {
  return (
    validateRole(role) &&
    validatePassword(password) &&
    validateUsername(username) &&
    validateLastname(lastname)
  );
};

const validatePassword = (password) => {
  return password.length > 6 && password.length < 24;
};

// const validateMail = (mail) => {
//   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   return emailPattern.test(mail);
// };

const validateUsername = (username) => {
  return username.length > 3 && username.length < 24;
};

const validateLastname = (lastname) => {
  return lastname.length > 3 && lastname.length < 24;
};

const validateRole = (role) => {
  return role !== undefined && role.trim() !== "";
};
