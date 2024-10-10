const publicBasePath = () => {
  return process.env.PUBLIC_URL;
};
export const apiBasePath = () => {
  return process.env.REACT_APP_API_URL;
};

export default publicBasePath;
