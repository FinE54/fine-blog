const isDev = process.env.NODE_ENV === "development";

const baseUrl = isDev ? "http://localhost:3000" : "http://localhost:3000";
// const baseUrl = "";
const primaryColor = "#5cb78c";

export { isDev, baseUrl, primaryColor };
