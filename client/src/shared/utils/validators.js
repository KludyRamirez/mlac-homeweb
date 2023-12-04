export const validateLoginForm = ({ username, password }) => {
  const isUsernameValid = validateUsername(username);
  const isPasswordValid = validatePassword(password);

  return isUsernameValid && isPasswordValid;
};

export const validateRegisterForm = ({
  role,
  password,
  username,
  firstname,
  lastname,
}) => {
  return (
    validateRole(role) &&
    validatePassword(password) &&
    validateUsername(username) &&
    validateLastname(lastname) &&
    validateFirstname(firstname)
  );
};

export const validateWaitListForm = ({
  username,
  firstname,
  lastname,
  mail,
}) => {
  return (
    validateUsername(username) &&
    validateLastname(lastname) &&
    validateFirstname(firstname) &&
    validateMail(mail)
  );
};

const validatePassword = (password) => {
  return password.length > 6 && password.length < 24;
};

export const validateUsername = (username) => {
  return username.length > 3 && username.length < 24;
};

const validateLastname = (lastname) => {
  return lastname.length > 3 && lastname.length < 24;
};

const validateFirstname = (firstname) => {
  return firstname.length > 3 && firstname.length < 24;
};

const validateRole = (role) => {
  return role !== undefined && role.trim() !== "";
};

export const validateMail = (mail) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(mail);
};
