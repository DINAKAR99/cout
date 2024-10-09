import toast from "react-hot-toast";
import { decrypt, encrypt } from "../../hooks/crypto/EncrDecr";

export const isLoggedIn = () => {
  const data = sessionStorage.getItem("data");
  return data !== null;
};
// ----------------------------------------------------------------
export const doLogin = (response) => {
  if (response.status === 200) {
    const encryptedUserData = encrypt(JSON.stringify(response.data));
    const encryptedUserToken = encrypt(JSON.stringify(response.data.token));
    sessionStorage.setItem("data", encryptedUserData);
    sessionStorage.setItem("authToken", encryptedUserToken);
    sessionStorage.setItem(
      "dataWithoutEncpt",
      JSON.stringify(response.data.token)
    );
    sessionStorage.setItem("userName", response.data.user);
    sessionStorage.setItem(
      "refreshToken",
      response.data.refreshtoken.refreshtoken
    );
    sessionStorage.setItem("isLoggedIn", true);
  }
};
export const doLogout = () => {
  sessionStorage.clear();
  console.log("data removed from session");
};
export const doUpdate = (data) => {
  console.log("data update in session storage");
  sessionStorage.removeItem("data");
  const encryptedUserData = encrypt(JSON.stringify(data));
  sessionStorage.setItem("data", encryptedUserData);
  sessionStorage.setItem("dataWithoutEncpt", JSON.stringify(data)); // remove this line after completion
};
// ----------------------------------------------------------------

export const getCurrentUserDetails = () => {
  if (isLoggedIn()) {
    return JSON.parse(decrypt(sessionStorage.getItem("data")));
  }
};

export const getJwtToken = () => {
  const user = getCurrentUserDetails();
  return user?.token;
};
export const getUserName = () => {
  const user = getCurrentUserDetails();
  return user?.userName;
};

export const handleLogoutAndRedirect = (navigate, error) => {
  if (
    error.response.data.status === 400 ||
    error.response.data.status === 401 ||
    error.response.data.status === 403
  ) {
    doLogout();
    // Redirect to the home page
    navigate("/");
    toast.success("please login again..!!");
  }
};
